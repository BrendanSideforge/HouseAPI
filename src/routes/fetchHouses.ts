import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/', async (req, res) => {

    let params: object = req.params;
    let queryString: string = "SELECT * FROM houses";
    let queryResults: any = await db.query(queryString, [params['house']]);

    let houseObjects: Array<object> = [];

    for (let i = 0; i < queryResults.rows.length; i++) {
        const memberString: string = "SELECT * FROM users WHERE house=$1";
        let memberResults: any = await db.query(memberString, [queryResults.rows[i]['house']]);

        const houseMembers: number = memberResults.rows.length;
        
        houseObjects.push({
            house: queryResults.rows[i]['house'],
            totalMembers: houseMembers
        });
    }

    res.send(JSON.stringify({'houses': houseObjects}))

})

export = router;