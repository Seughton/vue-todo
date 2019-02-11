import express from 'express'
const router = express.Router();
const pg = require('pg');
const path = require('path');
import client from '../models/database'

router.post('/addTodo', async (req, res, next) => {       
  await client.query('INSERT INTO todo (title) VALUES ($1)',[req.body.todo]);
});

router.delete('/deleteTodo', async (req, res, next) => { 
  await client.query('DELETE FROM todo WHERE id IN ($1)',[req.body.index]);
});

router.put('/updateTodo', async (req, res, next) => { 
  await client.query(`UPDATE todo SET title = ($1) WHERE id IN ($2)`,[req.body.data.todo, req.body.data.index]);
})

router.put('/doneTodo', async (req, res, next) => { 
  console.log(req.body.data.isDone)
  await client.query(`UPDATE todo SET done = ($1) WHERE id IN ($2)`,[req.body.data.isDone, req.body.data.index]);
})

module.exports = router;