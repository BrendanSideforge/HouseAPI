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

    res.send(JSON.stringify({
        house: queryResults.rows[0]['house'],
        points: queryResults.rows[0]['points'],
    }))

})

export = router;