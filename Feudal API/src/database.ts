import * as pg from 'pg';

export const pool: pg.Pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'feudalapi',
    password: 'BS103261',
    port: 5432
});

export async function createTables() {
    // await pool.query("DROP TABLE users");
    try {
        let userDataQuery: string = `
            CREATE TABLE IF NOT EXISTS users (
                user_id text primary key,
                house text,
                points integer,
                joined_at timestamp
            )
        `
        await pool.query(userDataQuery);
        
        let houseDataQuery: string = `
            CREATE TABLE IF NOT EXISTS houses (
                house text primary key,
                points integer
            )
        `
        await pool.query(houseDataQuery);
        // console.log(await pool.query("SELECT * FROM users"));
        console.log("Postgresql has been loaded.");
        // console.log(pool);
    } catch(e) {
        console.log(e);
    }
}