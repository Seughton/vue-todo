import express from 'express';
import socketIO from 'socket.io'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import http from 'http';
import cors from 'cors';
import client from './models/database'

// import indexRouter from './routes/index';
// import usersRouter from './routes/users';

const app = express();

const httpServer = http.Server(app);
const io = socketIO(httpServer)
const port = process.env.PORT || 3001; 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors())


// app.use('/', indexRouter);
// app.use('/todos', usersRouter);

// const server = app.listen(port, function () {
//   let port = server.address().port  
//   console.log("Example app listening at", port)
// })

io.on('connection', (socket) => {
  socket.on('SOCKET_ADD_TODO', async(payload) => {    
    await client.query('INSERT INTO todo (title) VALUES ($1)',[payload]);
  })
  socket.on('SOCKET_REMOVE_TODO', async(payload) => {
    await client.query('DELETE FROM todo WHERE id IN ($1)',[payload]);
  })
  socket.on('SOCKET_GET_TODOS_FROM_DB', async(data, cb) => {
    await client.query('SELECT * FROM todo', []).then(data => {
      cb(null, data.rows)        
    })    
  })
  socket.on('SOCKET_UPDATE_TODO', async(payload) => {
    await  client.query(`UPDATE todo SET title = ($1) WHERE id IN ($2)`,[payload.todo, payload.index]);
  })
  socket.on('SOCKET_COMPLETE_TODO', async(payload) => {
    await client.query(`UPDATE todo SET done = ($1) WHERE id IN ($2)`,[payload.isDone, payload.index]);
  })
  console.log('a user connected');
});

httpServer.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = app;
