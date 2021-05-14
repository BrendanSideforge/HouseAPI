import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/', async (req, res) => {
    try {
        let params: object = req.params;
        let queryString: string = "SELECT * FROM users";
        let queryResults: any = await db.query(queryString);

        let users: Array<object> = [];

        for (let i = 0; i < queryResults.rows.length; i++) {
            users.push({
                u: queryResults.rows[i].user_id,
                h: queryResults.rows[i].house,
            })
        }

        res.send(JSON.stringify({'users': users, success: true}))
    } catch(e) {
        res.send(JSON.stringify({
            success: false,
            error: e
        }))
    }

})

export = router;