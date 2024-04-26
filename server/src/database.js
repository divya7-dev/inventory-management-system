import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

var pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getStocks() {
  try {
    const [data] = await pool.query(`
            SELECT * FROM stocks
        `);
    return data;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
