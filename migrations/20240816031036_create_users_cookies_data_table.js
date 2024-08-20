// 创建一个 migration 文件，比如：npx knex migrate:make create_users_cookies_data_table

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('users_cookies_data', (table) => {
        table.increments('id').primary(); 
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('cookie_id').unsigned().notNullable().references('id').inTable('fortune_cookies').onDelete('CASCADE'); // connect to the fortune_cookies table
        table.string('cookie_message').notNullable(); // save Fortune Cookies
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')); 
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('users_cookies_data');
}
