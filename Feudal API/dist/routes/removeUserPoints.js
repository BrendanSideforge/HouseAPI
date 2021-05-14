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
        let insertQuery = `
            INSERT INTO users (
                user_id,
                house,
                points,
                joined_at
            ) VALUES (
                $1, $2, $3, $4
            )
        `;
        await db.query(insertQuery, [+params['userId'], null, 0, null]);
        res.send(JSON.stringify({
            user_id: +params['userId'],
            house: null,
            points: 0,
            joined_at: null
        }));
        return;
    }
    let updateQuery = "UPDATE users SET points=$2 WHERE user_id=$1";
    await db.query(updateQuery, [+params['userId'], queryResults.rows[0]['points'] - +json['points']]);
    res.send(JSON.stringify({
        user_id: +params['userId'],
        house: null,
        points: queryResults.rows[0]['points'] - +json['points'],
        joined_at: null
    }));
});
module.exports = router;
