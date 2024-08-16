/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import sixtyJiazi from '../data/sixty_jiazi.json'assert { type: 'json' };

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('sixty_jiazi').del();

  // Inserts seed entries
  await knex('sixty_jiazi').insert(sixtyJiazi);
}

