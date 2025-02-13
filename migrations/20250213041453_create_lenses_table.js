/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("lenses", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.string("lens_name", 100);
    table.integer("replacement_schedule").notNullable(); // Days before replacement
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("lenses");
};
