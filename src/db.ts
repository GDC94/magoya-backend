import pg from "pg";

export const pool = new pg.Pool({
    user: "postgres",
    password: "1394",
    database: "accounts",
    host: "localhost",
    port: 5432
})

pool.query("SELECT NOW()").then(result => {
    console.log(result);
});