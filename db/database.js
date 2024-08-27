import mariadb from "mariadb";
import { DB_HOST, DB_PORT, DB_DATABASE, DB_PASSWORD, DB_USER } from "../config.js";


const pool = mariadb.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

export default pool;
