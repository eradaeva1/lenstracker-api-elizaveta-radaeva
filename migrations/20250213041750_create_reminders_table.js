/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("reminders", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.integer("lens_id").unsigned().notNullable();
    table.datetime("reminder_time").notNullable();
    table.text("message");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.foreign("lens_id").references("lenses.id").onDelete("CASCADE");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("reminders");
};
