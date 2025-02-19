export async function up(knex) {
    return knex.schema.alterTable("lenses", (table) => {
      table.string("lens_power").notNullable().defaultTo("0.00"); // Lens prescription power
      table.enum("eye_side", ["left", "right"]).notNullable().defaultTo("right"); // Left or right eye
    });
  }
  
  export async function down(knex) {
    return knex.schema.alterTable("lenses", (table) => {
      table.dropColumn("lens_power");
      table.dropColumn("eye_side");
    });
  }