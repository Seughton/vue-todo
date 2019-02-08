import express from 'express'
const router = express.Router();
const pg = require('pg');
const path = require('path');
import client from '../models/database'

// router.get('/', (req, res, next) => {
//   res.sendFile(path.join(
//     __dirname, '..', '..', 'client', 'views', 'index.html'));
// });

// router.get('/api/v1/todos', (req, res, next) => {
//   const results = [];
//   // Get a Postgres client from the connection pool
//   pg.connect(connectionString, (err, client, done) => {
//     // Handle connection errors
//     if(err) {
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     // SQL Query > Select Data
//     const query = client.query('SELECT * FROM items ORDER BY id ASC;');
//     // Stream results back one row at a time
//     query.on('row', (row) => {
//       results.push(row);
//     });
//     // After all data is returned, close connection and return results
//     query.on('end', () => {
//       done();
//       return res.json(results);
//     });
//   });
// });

router.post('/addTodo', async (req, res, next) => {
    const addTodo = await client.query('INSERT INTO todo (title) VALUES ($1)',['someasdtetx']);
});

router.delete('/deleteTodo', async (req, res, next) => {
  const deleteTodo = await client.query('DELETE FROM todo WHERE id IN ($1)',['2']);
});

router.put('/updateTodo', async (req, res, next) => {
  const updateTodo = await client.query(`UPDATE todo SET title = 'blablabla' WHERE id IN ($1)`,['11']);
})

 


// router.put('/api/v1/todos/:todo_id', (req, res, next) => {
//   const results = [];
//   // Grab data from the URL parameters
//   const id = req.params.todo_id;
//   // Grab data from http request
//   const data = {text: req.body.text, complete: req.body.complete};
//   // Get a Postgres client from the connection pool
//   pg.connect(connectionString, (err, client, done) => {
//     // Handle connection errors
//     if(err) {
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     // SQL Query > Update Data
//     client.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
//     [data.text, data.complete, id]);
//     // SQL Query > Select Data
//     const query = client.query("SELECT * FROM items ORDER BY id ASC");
//     // Stream results back one row at a time
//     query.on('row', (row) => {
//       results.push(row);
//     });
//     // After all data is returned, close connection and return results
//     query.on('end', function() {
//       done();
//       return res.json(results);
//     });
//   });
// });

// router.delete('/api/v1/todos/:todo_id', (req, res, next) => {
//   const results = [];
//   // Grab data from the URL parameters
//   const id = req.params.todo_id;
//   // Get a Postgres client from the connection pool
//   pg.connect(connectionString, (err, client, done) => {
//     // Handle connection errors
//     if(err) {
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     // SQL Query > Delete Data
//     client.query('DELETE FROM items WHERE id=($1)', [id]);
//     // SQL Query > Select Data
//     var query = client.query('SELECT * FROM items ORDER BY id ASC');
//     // Stream results back one row at a time
//     query.on('row', (row) => {
//       results.push(row);
//     });
//     // After all data is returned, close connection and return results
//     query.on('end', () => {
//       done();
//       return res.json(results);
//     });
//   });
// });

module.exports = router;