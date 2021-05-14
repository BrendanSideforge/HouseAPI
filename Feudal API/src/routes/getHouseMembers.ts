import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/:house', async (req, res) => {
    try {
        let params: object = req.params;
        let queryString: string = "SELECT * FROM users WHERE house=$1";
        let queryResults: any = await db.query(queryString, [params['house']]);

        let houseMembers: Array<number> = [];
        
        for (let i = 0; i < queryResults.rows.length; i++) {
            
            let userId: number = queryResults.rows[i]['user_id'];

            houseMembers.push(userId);
        }

        res.send(JSON.stringify({
            members: houseMembers,
            success: true
        }))
    } catch(e) {
        res.send(JSON.stringify({
            success: false,
            error: e
        }))
    }

})

export = router;