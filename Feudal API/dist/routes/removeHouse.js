"use strict";
const express = require("express");
const database = require("../database");
const router = express.Router();
const db = database.pool;
router.post('/:userId', async (req, res) => {
    let params = req.params;
    let json = req.headers;
    let queryString = "SELECT * FROM users WHERE user_id=$1";
    let queryResults = await db.query(queryString, [+params['userId']]);
    if (queryResults.rows.length == 0) {
        res.send(JSON.stringify({
            error: 'That userID is not found in the database.'
        }));
        return;
    }
    let removeQuery = "UPDATE users SET house=$2, joined_at=$3 WHERE user_id=$1";
    await db.query(removeQuery, [+params['userId'], null, null]);
    res.send(JSON.stringify({
        'success': true
    }));
});
module.exports = router;
