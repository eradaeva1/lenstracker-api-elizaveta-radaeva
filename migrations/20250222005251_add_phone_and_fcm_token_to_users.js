export async function up(knex) {
    return knex.schema.alterTable("users", (table) => {
      table.string("phone").nullable(); // User's phone number for SMS reminders
      table.string("fcm_token").nullable(); // Firebase token for push notifications
    });
  }
  
  export async function down(knex) {
    return knex.schema.alterTable("users", (table) => {
      table.dropColumn("phone");
      table.dropColumn("fcm_token");
    });
  }
  