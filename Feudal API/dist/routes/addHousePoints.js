"use strict";
const express = require("express");
const database = require("../database");
const router = express.Router();
const db = database.pool;
router.post('/:house', async (req, res) => {
    let params = req.params;
    let json = req.headers;
    let queryString = "SELECT * FROM houses WHERE house=$1";
    let queryResults = await db.query(queryString, [params['house']]);
    if (queryResults.rows.length == 0) {
        let insertQuery = `
            INSERT INTO houses (
                house,
                points
            ) VALUES (
                $1, $2
            )
        `;
        await db.query(insertQuery, [params['house'], +json['points']]);
        res.send(JSON.stringify({
            house: params['house'],
            points: +json['points']
        }));
        return;
    }
    let updateQuery = "UPDATE houses SET points=$2 WHERE house=$1";
    await db.query(updateQuery, [params['house'], queryResults.rows[0]['points'] + +json['points']]);
    res.send(JSON.stringify({
        house: params['house'],
        points: queryResults.rows[0]['points'] + +json['points']
    }));
});
module.exports = router;
