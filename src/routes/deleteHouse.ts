import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/:house', async (req, res) => {

    const params: object = req.params;
    const queryString: string = "SELECT * FROM houses WHERE house=$1";
    let queryResults: any = await db.query(queryString, [params['house']]);

    if (queryResults.rows.length == 0) {
        res.send(JSON.stringify({
            success: false,
            reason: 'There is not a house with this name.'
        }))
    }

    const deleteQuery: string = "DELETE FROM houses WHERE house=$1";
    await db.query(deleteQuery, [params['house']]);

    res.send(JSON.stringify({
        'success': true
    }))

})

export = router;