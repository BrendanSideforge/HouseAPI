import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/:house', async (req, res) => {

    let params: object = req.params;
    let queryString: string = "SELECT * FROM houses WHERE house=$1";
    let queryResults: any = await db.query(queryString, [params['house']]);

    if (queryResults.rows.length == 0) {
        res.send(JSON.stringify({
            error: 'That house is not found in the database.'
        }));
    }

    let memberQuery: string = "SELECT * FROM users WHERE house=$1";
    let memberResults: any = await db.query(memberQuery, [params['house']]);

    let objectUsers: Array<object> = [];
    
    for (let i = 0; i < memberResults.rows.length; i++) {
        
        let userId: number = memberResults.rows[i]['user_id'];
        let house: string = memberResults.rows[i]['house'];
        let points: number = memberResults.rows[i]['points'];
        let joinedAt: Date = memberResults.rows[i]['joined_at'];

        objectUsers.push({
            userId: userId,
            house: house,
            points: points,
            joined_at: joinedAt
        });

    }

    let sortedScores: Array<object> = objectUsers;
    sortedScores.sort((a, b): number => {
        let pointsA: number = a['points'];
        let pointsB: number = b['points'];
        return pointsA - pointsB;
    });
    sortedScores.reverse();

    let currentRank: number = 0;

    for (let i = 0; i < sortedScores.length; i++) {

        currentRank += 1;
        sortedScores[i]['rank'] = currentRank;
    }

    res.send(JSON.stringify({
        house: queryResults.rows[0]['house'],
        points: queryResults.rows[0]['points'],
        users: sortedScores
    }))

})

export = router;