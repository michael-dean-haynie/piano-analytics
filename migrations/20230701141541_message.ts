// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('messages', (table) => {
    table.increments('id')
    table.integer('timestampId').references('id').inTable('timestamps')
    table.double('msOffset')
    table.tinyint('statusByte')
    table.tinyint('dataByte1')
    table.tinyint('dataByte2')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('messages')
}
