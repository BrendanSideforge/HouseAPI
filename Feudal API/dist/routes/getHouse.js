"use strict";
const express = require("express");
const database = require("../database");
const router = express.Router();
const db = database.pool;
router.get('/:house', async (req, res) => {
    let params = req.params;
    let queryString = "SELECT * FROM houses WHERE house=$1";
    let queryResults = await db.query(queryString, [params['house']]);
    let memberQuery = "SELECT * FROM users WHERE house=$1";
    let memberResults = await db.query(memberQuery, [params['house']]);
    if (queryResults.rows.length == 0) {
        res.send(JSON.stringify({
            error: 'That house is not found in the database.'
        }));
    }
    let objectUsers = [];
    for (let i = 0; i < memberResults.rows.length; i++) {
        let userId = memberResults.rows[i]['user_id'];
        let house = memberResults.rows[i]['house'];
        let points = memberResults.rows[i]['points'];
        let joinedAt = memberResults.rows[i]['joined_at'];
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
    let sortedUserIds = [];
    for (let i = 0; i < sortedScores.length; i++) {
        sortedUserIds.push(sortedScores[i]['userId']);
    }
    res.send(JSON.stringify({
        house: queryResults.rows[0]['house'],
        points: queryResults.rows[0]['points'],
        users: sortedUserIds
    }));
});
module.exports = router;
