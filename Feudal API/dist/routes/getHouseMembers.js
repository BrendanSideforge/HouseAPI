"use strict";
const express = require("express");
const database = require("../database");
const router = express.Router();
const db = database.pool;
router.get('/:house', async (req, res) => {
    let params = req.params;
    let queryString = "SELECT * FROM users WHERE house=$1";
    let queryResults = await db.query(queryString, [params['house']]);
    let houseMembers = [];
    for (let i = 0; i < queryResults.rows.length; i++) {
        let userId = queryResults.rows[i]['user_id'];
        houseMembers.push(+userId);
    }
    res.send(JSON.stringify({
        members: houseMembers
    }));
});
module.exports = router;
