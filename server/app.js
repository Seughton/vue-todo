
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import http from 'http';
const port = process.env.PORT || 3001; 

// import client from './models/database'
const indexRouter = require('./routes/index');
import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/todos', usersRouter);

const server = app.listen(port, function () {
  let port = server.address().port
  
  console.log("Example app listening at", port)
})

module.exports = app;
