"use strict";
const express = require("express");
const database = require("../database");
const router = express.Router();
const db = database.pool;
router.get('/:userId', async (req, res) => {
    let params = req.params;
    let queryString = "SELECT * FROM users WHERE user_id=$1";
    let queryResults = await db.query(queryString, [+params['userId']]);
    if (queryResults.rows.length == 0) {
        res.send(JSON.stringify({
            error: 'That userID is not found in the database.'
        }));
    }
    res.send(JSON.stringify({
        points: queryResults.rows[0]['points'],
    }));
});
module.exports = router;
