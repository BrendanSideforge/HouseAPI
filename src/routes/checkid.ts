import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/:userId', async (req, res) => {

    let params: object = req.params;
    let queryString: string = "SELECT * FROM users WHERE user_id=$1";
    let queryResults: any = await db.query(queryString, [+params['userId']]);

    if(queryResults.rows == 0) {
        res.send(JSON.stringify({found: false}));
    }

    res.send(JSON.stringify({found: true}));

})

export = router;