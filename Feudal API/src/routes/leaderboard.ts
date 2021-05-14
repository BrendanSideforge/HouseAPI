import * as express from "express";
import * as database from "../database";
import * as pg from "pg";
import { Console } from "console";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/:index', async (req, res) => {
    try {
        let params: object = req.params;
        let queryString: string = "SELECT * FROM users";
        let queryResults: any = await db.query(queryString);

        let objectUsers: Array<object> = [];
        
        for (let i = 0; i < queryResults.rows.length; i++) {
            
            let userId: number = queryResults.rows[i]['user_id'];
            let house: string = queryResults.rows[i]['house'];
            let points: number = queryResults.rows[i]['points'];

            objectUsers.push({
                u: userId,
                h: house,
                p: points
            });

        }

        let sortedScores: Array<object> = objectUsers;
        sortedScores.sort((a, b): number => {
            let pointsA: number = a['p'];
            let pointsB: number = b['p'];
            return pointsA - pointsB;
        });
        sortedScores.reverse();

        let currentRank: number = 0;
        
        for (let i = 0; i < sortedScores.length; i++) {

            currentRank += 1;
            sortedScores[i]['r'] = currentRank;
        }
        

        if (params['index'] !== "all") {
            const firstIndex: number = +params['index'].split("_")[0];
            const secondIndex: number = +params['index'].split("_")[1];

            let indexedRanks: Array<object> = [];
            let ranksFound: number = 0;

            for (let i = 0 ; i < sortedScores.length; i++) {
                
                if (ranksFound == secondIndex+1-firstIndex) {
                    break;
                }

                const score: object = sortedScores[i];

                if (score['r'] >= firstIndex && score['r'] <= secondIndex+1) {
                    indexedRanks.push(score);
                    ranksFound += 1;
                }
            }

            res.send(JSON.stringify({
                sorted: indexedRanks,
                success: true
            }));
        }

        res.send(JSON.stringify({
            sorted: sortedScores,
            success: true
        }));
    } catch(e) {
        res.send(JSON.stringify({
            success: false,
            error: e
        }));
    }

})

export = router;