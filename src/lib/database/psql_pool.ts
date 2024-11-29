import { Pool } from "pg";

const PSQLClientPool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT),
  max: Number(process.env.PG_MAX_CONNECTIONS),
  ssl: process.env.PG_SSL === "true",
  idleTimeoutMillis: Number(process.env.PG_TIME_LIMIT),
  connectionTimeoutMillis: Number(process.env.PG_CONNECTION_LIMIT),
});

export default PSQLClientPool;
