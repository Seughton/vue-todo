import express from 'express';
import client from '../models/database'
const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

/* GET users listing. */
router.get('/', async (req, res) => {
  const todos = await client.query('SELECT * FROM todo', [])
  res.send(todos.rows);
})

module.exports = router;
