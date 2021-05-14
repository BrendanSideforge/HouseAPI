"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTables = exports.pool = void 0;
const pg = require("pg");
exports.pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'feudalapi',
    password: 'BS103261',
    port: 5432
});
async function createTables() {
    let userDataQuery = `
        CREATE TABLE IF NOT EXISTS users (
            user_id bigint primary key,
            house text,
            points integer,
            joined_at timestamp
        )
    `;
    await exports.pool.query(userDataQuery);
    let houseDataQuery = `
        CREATE TABLE IF NOT EXISTS houses (
            house text primary key,
            points integer
        )
    `;
    await exports.pool.query(houseDataQuery);
    console.log("Postgresql has been loaded.");
}
exports.createTables = createTables;
