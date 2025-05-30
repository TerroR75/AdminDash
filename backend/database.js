import mysql from "mysql2";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// Sequelize connection
export const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
});

/*async function testConnection() {
  const result = await pool.query("SHOW DATABASES");
  console.log(result);
}

testConnection();*/ // Test with command: node database.js
