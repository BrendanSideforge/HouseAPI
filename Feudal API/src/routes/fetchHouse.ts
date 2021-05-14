import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/:house', async (req, res) => {
    try {
        let params: object = req.params;
        let queryString: string = "SELECT * FROM houses";
        let queryResults: any = await db.query(queryString);

        let housesObject: Array<object> = [];
        
        for (let i = 0; i < queryResults.rows.length; i++) {

            let house: string = queryResults.rows[i]['house'];
            let points: number = queryResults.rows[i]['points'];

            housesObject.push({
                house: house,
                points: points
            });

        }

        let sortedScores: Array<object> = housesObject;
        sortedScores.sort((a, b): number => {
            let pointsA: number = a['points'];
            let pointsB: number = b['points'];
            return pointsA - pointsB;
        });
        sortedScores.reverse();

        let currentRank: number = 0;
        let houseObject: object = {};

        for (let i = 0; i < sortedScores.length; i++) {

            currentRank += 1;
            
            if (+sortedScores[i]['house'] == +params['house']) {
                houseObject = sortedScores[i];
                houseObject['rank'] = currentRank;
                houseObject['found'] = true
            }
        }
        houseObject['success'] = true;
        res.send(JSON.stringify(houseObject));
    } catch(e) {
        res.send(JSON.stringify({
            success: false,
            error: e
        }))
    }

})

export = router;