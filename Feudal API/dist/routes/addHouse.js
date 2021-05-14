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
        await db.query(insertQuery, [+params['userId'], json['house'], 0, new Date()]);
        res.send(JSON.stringify({
            user_id: +params['userId'],
            house: json['house'],
            points: 0,
            joined_at: new Date()
        }));
        return;
    }
    let updateQuery = "UPDATE users SET house=$2, joined_at=$3 WHERE user_id=$1";
    await db.query(updateQuery, [+params['userId'], json['house'], new Date()]);
    res.send(JSON.stringify({
        user_id: +params['userId'],
        house: json['house'],
        points: queryResults.rows[0]['points'],
        joined_at: new Date()
    }));
});
module.exports = router;
