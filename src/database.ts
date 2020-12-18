import * as pg from 'pg';

export const pool: pg.Pool = new pg.Pool({
    user: 'dbusername',
    host: 'localhost',
    database: 'dbname',
    password: 'dbpassword',
    port: 5432
});

export async function createTables() {
    
    let userDataQuery: string = `
        CREATE TABLE IF NOT EXISTS users (
            user_id bigint primary key,
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

    console.log("Postgresql has been loaded.")
}