import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/', async (req, res) => {
    try {
        let params: object = req.params;
        let queryString: string = "SELECT * FROM houses";
        let queryResults: any = await db.query(queryString);

        let houseObjects: Array<object> = [];

        for (let i = 0; i < queryResults.rows.length; i++) {
            const memberString: string = "SELECT * FROM users WHERE house=$1";
            let memberResults: any = await db.query(memberString, [queryResults.rows[i]['house']]);

            const houseMembers: number = memberResults.rows.length;
            
            houseObjects.push({
                house: queryResults.rows[i]['house'],
                totalMembers: houseMembers,
                points: queryResults.rows[i]['points']
            });
        }

        let sortedHouses: Array<object> = houseObjects;
        sortedHouses.sort((a, b): number => {
            let pointsA: number = a['points'];
            let pointsB: number = b['points'];
            return pointsA - pointsB;
        });
        sortedHouses.reverse();

        let currentRank: number = 0;

        for (let i = 0; i < sortedHouses.length; i++) {

            currentRank += 1;
            sortedHouses[i]['rank'] = currentRank;
        }

        res.send(JSON.stringify({'houses': houseObjects, success: true}))
    } catch(e) {
        res.send(JSON.stringify({
            success: false,
            error: e
        }))
    }

})

export = router;