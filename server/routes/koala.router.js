const express = require('express');
const koalaRouter = express.Router();

const pool = require('../modules/pool');

// DB CONNECTION


// GET


// POST
let koalaList = [];
router.post('/', (req, res) => {
    const newKoala = req.body;
// message to the db as soon as the new data hits the database
    const queryText = `
        INSERT INTO "koalas" ("name", "gender", "age", "ready_to_tranfer", "notes")
        VALUES ($1, $2, $3, $4, $5);
        `;
    pool.query(queryText,[newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_tranfer, newKoala.notes])
        .then((result) => {
        koalaList.push(req.body);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log( 'Error POSTing to db:', error);
        res.sendStatus(500);
    });
});

// PUT


// DELETE

module.exports = koalaRouter;