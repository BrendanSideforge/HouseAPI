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
        await db.query(insertQuery, [params['house'], +json['points']]);
        res.send(JSON.stringify({
            house: params['house'],
            points: +json['points']
        }));
        return;
    }

    let updateQuery: string = "UPDATE houses SET points=$2 WHERE house=$1";
    await db.query(updateQuery, [params['house'], +json['points']]);
    res.send(JSON.stringify({
        house: params['house'],
        points: +json['points']
    }));

})

export = router;