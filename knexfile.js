
import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    client: "mysql2", // Use mysql2 instead of mysql
    connection: {
      host: "localhost",
      user: "root",
      password: "rootroot", // Update with your actual MySQL password
      database: "lenstracker",
      charset: "utf8"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  }
};
