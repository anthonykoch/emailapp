
exports.seed = async (knex, Promise) => {
  const jim = await knex('users').where('first_name', 'Jim').first()
  const dwight = await knex('users').where('first_name', 'Dwight').first()
  const michael = await knex('users').where('first_name', 'Michael').first()

  // Deletes ALL existing entries
  return knex('groups').del().then(() => {
    // Inserts seed entries
    return knex('groups').insert([
      {
        name: 'Dunder Mifflin',
      },
    ])
  })
  .then(() => knex('group_members').del())
  .then(async () => {
    const group = knex('groups').where('name', 'Dunder Mifflin')

    knex('group_members').insert([
      {
        user_id: jim.id,
        group_id: group.id,
      },
      {
        user_id: dwight.id,
        group_id: group.id,
      },
      {
        user_id: michael.id,
        group_id: group.id,
      },
    ])
  })
}
