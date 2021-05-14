import * as pg from 'pg';
export declare const pool: pg.Pool;
export declare function createTables(): Promise<void>;
