const {query} = require('express');
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
router.post('/', (req, res) => {
    const newKoala = req.body;
// message to the db as soon as the new data hits the database
    const queryText = `
        INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
        VALUES ($1, $2, $3, $4, $5);
        `;
    pool.query(queryText,[newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_tranfer, newKoala.notes])
        .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log( 'Error POSTing to db:', error);
        res.sendStatus(500);
    });
});

// PUT


// DELETE

module.exports = router;