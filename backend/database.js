import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

/*async function testConnection() {
  const result = await pool.query("SHOW DATABASES");
  console.log(result);
}

testConnection();*/ // Test with command: node database.js
