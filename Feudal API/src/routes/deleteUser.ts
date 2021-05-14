import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/:userId', async (req, res) => {
    try {
        let params: object = req.params;
        let queryString: string = "SELECT * FROM users WHERE user_id=$1";
        let queryResults: any = await db.query(queryString, [params['userId']]);

        if (queryResults.rows.length == 0) {
            res.send(JSON.stringify({error: 'User not found in the database.'}))
        }

        const deleteQuery: string = "DELETE FROM users WHERE user_id=$1";
        await db.query(deleteQuery, [params['userId']]);

        res.send(JSON.stringify({success: true}))
    } catch(e) {
        res.send(JSON.stringify({
            success: false,
            error: e
        }))
    }
})

export = router;