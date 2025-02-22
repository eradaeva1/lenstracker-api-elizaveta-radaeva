import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db = knex.default({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

export default db;

// import mysql from "mysql2";

// // Create a MySQL database connection
// const db = mysql.createPool({
//   host: "localhost",
//   user: "your_db_user",
//   password: "your_db_password",
//   database: "your_database_name",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// export default db;