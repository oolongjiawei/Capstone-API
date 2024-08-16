/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('sixty_jiazi', (table) => {
      table.increments('id').primary(); 
      table.string('name').notNullable(); 
      table.string('element').notNullable(); 
      table.string('element_color').notNullable(); 
      table.text('brief'); 
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('sixty_jiazi');
}
  
