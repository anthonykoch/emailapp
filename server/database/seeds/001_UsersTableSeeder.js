
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del().then(() => {
    // Inserts seed entries
    return knex('users').insert([
      {
        first_name: 'Jim',
        last_name: 'Halpert',
        email: 'jim@mifflin.com',
        password: 'hey',
      },
      {
        first_name: 'Dwight',
        last_name: 'Schrute',
        email: 'dwight@mifflin.com',
        password: 'beets',
      },
      {
        first_name: 'Michael',
        last_name: 'Scott',
        email: 'michael@mifflin.com',
        password: 'shoes',
      },
    ])
  })
}
