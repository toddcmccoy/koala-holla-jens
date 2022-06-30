const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// DB CONNECTION


// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting koalas from DB', error);
      res.sendStatus(500);
    });
  });

// POST


// PUT


// DELETE

module.exports = router;