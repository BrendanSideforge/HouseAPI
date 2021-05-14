"use strict";
const express = require("express");
const database = require("../database");
const router = express.Router();
const db = database.pool;
router.get('/:house', async (req, res) => {
    let params = req.params;
    let queryString = "SELECT * FROM houses WHERE house=$1";
    let queryResults = await db.query(queryString, [params['house']]);
    if (queryResults.rows.length == 0) {
        res.send(JSON.stringify({
            error: 'That house is not found in the database.'
        }));
    }
    res.send(JSON.stringify({
        points: queryResults.rows[0]['points'],
    }));
});
module.exports = router;
