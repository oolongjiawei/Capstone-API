/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import fortuneCookies from '../data/fortune_cookies.json' assert { type: 'json' };
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('fortune_cookies').del();

  // Inserts seed entries
  await knex('fortune_cookies').insert(fortuneCookies);
}
