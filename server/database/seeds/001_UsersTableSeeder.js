
const hash = require('@feathersjs/authentication-local/lib/utils/hash')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => hash('password'))
    .then((password) => {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'Jim',
          last_name: 'Halpert',
          username: 'swisshalps',
          email: 'jim@mifflin.com',
          password: password,
        },
        {
          first_name: 'Dwight',
          last_name: 'Schrute',
          username: 'shrewd',
          email: 'dwight@mifflin.com',
          password: password,
        },
        {
          first_name: 'Michael',
          last_name: 'Scott',
          username: 'michael',
          email: 'michael@mifflin.com',
          password: password,
        },
      ])
    })
}
