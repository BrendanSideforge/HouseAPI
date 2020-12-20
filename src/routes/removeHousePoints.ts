import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.post('/:house', async (req, res) => {

    let params: object = req.params;
    let json: object = req.body;

    let queryString: string = "SELECT * FROM houses WHERE house=$1";
    let queryResults: any = await db.query(queryString, [params['house']]);

    if (queryResults.rows.length == 0) {
        let insertQuery: string = `
            INSERT INTO houses (
                house,
                points
            ) VALUES (
                $1, $2
            )
        `;
        await db.query(insertQuery, [params['house'], 0]);
        res.send(JSON.stringify({
            house: params['house'],
            points: 0
        }));
        return;
    }

    let updateQuery: string = "UPDATE houses SET points=$2 WHERE house=$1";
    await db.query(updateQuery, [params['house'], queryResults.rows[0]['points'] - +json['points']]);
    res.send(JSON.stringify({
        house: params['house'],
        points: queryResults.rows[0]['points'] - +json['points']
    }));

})

export = router;