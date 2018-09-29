
exports.up = (knex, Promise) => {
  return knex.schema.createTable('messages', t => {
    t.increments()
    t.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('messages')
}
