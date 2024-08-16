/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('users_bazi_data', (table) => {
        table.increments('id').primary(); 
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE'); 
        table.integer('birth_year').notNullable();
        table.integer('birth_month').notNullable();
        table.integer('birth_day').notNullable();
        table.time('birth_time').notNullable();
        table.string('bazi_year').notNullable(); 
        table.string('bazi_month').notNullable(); 
        table.string('bazi_day').notNullable(); 
        table.string('bazi_time').notNullable(); 

        table.string('symbol_year').notNullable(); 
        table.string('symbol_month').notNullable(); 
        table.string('symbol_day').notNullable(); 
        table.string('symbol_time').notNullable(); 
        table.string('element').notNullable(); 
        table.string('element_color').notNullable(); 
        table.text('brief').notNullable(); 
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')); 
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('users_bazi_data');
}
