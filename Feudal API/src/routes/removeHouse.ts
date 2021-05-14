import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.post('/:userId', async (req, res) => {
    try {
        let params: object = req.params;
        let json: object = req.body;
        let queryString: string = "SELECT * FROM users WHERE user_id=$1";
        let queryResults: any = await db.query(queryString, [params['userId']]);

        if (queryResults.rows.length == 0) {
            res.send(JSON.stringify({
                error: 'That userID is not found in the database.'
            }));
            return;
        }

        let removeQuery: string = "UPDATE users SET house=$2, joined_at=$3 WHERE user_id=$1";
        await db.query(removeQuery, [params['userId'], null, null]);
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