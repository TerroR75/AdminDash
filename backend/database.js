import mysql from "mysql2";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
});


// dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
// export const db = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   { host: process.env.DB_HOST, dialect: 'mysql' }
// );

/*async function testConnection() {
  const result = await pool.query("SHOW DATABASES");
  console.log(result);
}

testConnection();*/ // Test with command: node database.js
