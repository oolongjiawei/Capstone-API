/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('fortune_data_jiazi', (table) => {
      table.increments('id').primary(); 
      table.string('jiazi').notNullable().unique(); 
      table.text('description').notNullable(); 
      table.timestamps(true, true); 
    });
  }

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('fortune_data_jiazi');
  }
