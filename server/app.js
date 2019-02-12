import express from 'express';
import socketIO from 'socket.io'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import http from 'http';
import cors from 'cors';
import client from './models/database'

const app = express();

const httpServer = http.Server(app);
const io = socketIO(httpServer)
const port = process.env.PORT || 3001; 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors())


io.on('connection', (socket) => {
  socket.on('SOCKET_ADD_TODO', async (data, cb) =>  {    
    const result = await client.query('INSERT INTO todo (title) VALUES ($1) RETURNING id;', [data]);
    cb({id: result.rows[0].id})
  })
  socket.on('SOCKET_REMOVE_TODO', async(payload) => {
    await client.query('DELETE FROM todo WHERE id IN ($1)',[payload]);
  })
  socket.on('SOCKET_GET_TODOS_FROM_DB', async(data, cb) => {     
    const result = await client.query('SELECT * FROM todo', [])    
    cb(result.rows)
  })
  socket.on('SOCKET_UPDATE_TODO', async (data, cb) => {    
    const result = await client.query(`UPDATE todo SET title = ($1) WHERE id = ($2) RETURNING id;`,[data.todo, data.id]);    
    cb({id: result.rows[0].id, todo: data.todo})
  })
  socket.on('SOCKET_COMPLETE_TODO', async(payload) => {    
    await client.query(`UPDATE todo SET done = ($1) WHERE id = ($2)`,[payload.isDone, payload.id]);
  })
  console.log('a user connected');
});

httpServer.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = app;
