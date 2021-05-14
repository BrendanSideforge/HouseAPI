"use strict";
const express = require("express");
const database = require("../database");
const router = express.Router();
const db = database.pool;
router.get('/', async (req, res) => {
    let params = req.params;
    let queryString = "SELECT * FROM users";
    let queryResults = await db.query(queryString);
    let objectUsers = [];
    for (let i = 0; i < queryResults.rows.length; i++) {
        let userId = queryResults.rows[i]['user_id'];
        let house = queryResults.rows[i]['house'];
        let points = queryResults.rows[i]['points'];
        let joinedAt = queryResults.rows[i]['joined_at'];
        objectUsers.push({
            userId: userId,
            house: house,
            points: points,
            joined_at: joinedAt
        });
    }
    let sortedScores = objectUsers;
    sortedScores.sort((a, b) => {
        let pointsA = a['points'];
        let pointsB = b['points'];
        return pointsA - pointsB;
    });
    sortedScores.reverse();
    let currentRank = 0;
    for (let i = 0; i < sortedScores.length; i++) {
        currentRank += 1;
        sortedScores[i]['rank'] = currentRank;
    }
    res.send(JSON.stringify({
        sorted: sortedScores
    }));
});
module.exports = router;
