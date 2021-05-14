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
            let insertQuery: string = `
                INSERT INTO users (
                    user_id,
                    house,
                    points,
                    joined_at
                ) VALUES (
                    $1, $2, $3, $4
                )
            `;
            await db.query(insertQuery, [params['userId'], null, +json['points'], null]);
            res.send(JSON.stringify({
                user_id: params['userId'],
                house: null,
                points: +json['points'],
                joined_at: null,
                success: true
            }));
            return;
        }

        let updateQuery: string = "UPDATE users SET points=$2 WHERE user_id=$1";
        await db.query(updateQuery, [params['userId'], +json['points'] > 0 ? queryResults.rows[0]['points'] + +json['points'] : 0]);
        res.send(JSON.stringify({
            user_id: params['userId'],
            house: null,
            points: +json['points'] > 0 ? queryResults.rows[0]['points'] + +json['points'] : 0,
            joined_at: null,
            success: true
        }));
    } catch(e) {
        res.send(JSON.stringify({
            success: false,
            error: e
        }))
    }

})

export = router;