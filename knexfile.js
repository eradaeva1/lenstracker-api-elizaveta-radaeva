// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql2", // ✅ Should be "mysql2", NOT "sqlite3"
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