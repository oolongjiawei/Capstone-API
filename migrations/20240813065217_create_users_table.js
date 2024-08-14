/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
  .createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  })
  .createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("content").notNullable();
    table.integer("likes").notNullable().defaultTo(0);
    table
      .integer("user_id")
      .unsigned()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export function down(knex) {
  return knex.schema.dropTable("posts").dropTable("users");
}
