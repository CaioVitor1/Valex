import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;

/*
const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false
  }
})
*/


const connection = new Pool({
  user: process.env.POSTGRESS_USER,
  host: process.env.POSTGRESS_HOST,
  port: Number(process.env.POSTGRESS_PORT),
  database: process.env.POSTGRESS_DATABASE,
  password: process.env.POSTGRESS_PASSWORD
})


export default connection;
