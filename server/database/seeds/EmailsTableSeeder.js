
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('emails').del()
    .then(() => {
      // Inserts seed entries
      return knex('emails').insert([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ])
    })
}
