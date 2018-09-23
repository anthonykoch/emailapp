
exports.up = (knex, Promise) => {
  return knex.schema.createTable('emails', t => {
    t.increments()
    t.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('emails')
}
