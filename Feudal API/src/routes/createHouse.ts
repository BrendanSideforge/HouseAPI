import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/:house', async (req, res) => {
    console.log(db);
    try {
        const params: object = req.params;
        const queryString: string = "SELECT * FROM houses WHERE house=$1";
        let queryResults: any = await db.query(queryString, [params['house']]);

        if (queryResults.rows.length >= 1) {
            res.send(JSON.stringify({
                success: false,
                reason: 'There is already a house with that name.'
            }))
        }

        const createQuery: string = "INSERT INTO houses (house, points) VALUES ($1, $2);";
        await db.query(createQuery, [params['house'], 0])

        res.send(JSON.stringify({
            'success': true
        }))
    } catch(e) {
        res.send(JSON.stringify({
            success: false,
            error: e
        }))
    }

})

export = router;