export const up = async function (knex) {
    await knex.schema.alterTable('reminders', function (table) {
      table.enum('type', ['removal', 'replacement']).notNullable().defaultTo('replacement');
      table.enum('status', ['pending', 'completed']).defaultTo('pending');
    });
  };
  
  export const down = async function (knex) {
    await knex.schema.alterTable('reminders', function (table) {
      table.dropColumn('type');
      table.dropColumn('status');
    });
  };