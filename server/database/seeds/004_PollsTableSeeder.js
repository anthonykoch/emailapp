
exports.seed = async (knex, Promise) => {
  const jim = await knex('users').where('first_name', 'Jim').first()
  const michael = await knex('users').where('first_name', 'Michael').first()

  // Deletes ALL existing entries
  return knex('polls').del()
    .then(() => {
      return knex('polls').insert([
        {
          creator_id: jim.id,
          name: 'Things dwight likes',
        },
      ])
    })
    .then(() => knex('poll_options').del())
    .then(async () => {
      const poll = await knex('polls').where('creator_id', jim.id).first()

      return knex('poll_options').del().insert([
        {
          name: 'Bears',
          poll_id: poll.id,
        },
        {
          name: 'Beets',
          poll_id: poll.id,
        },
        {
          name: 'Battlestar Galactica',
          poll_id: poll.id,
        },
      ])
    })
    .then(() => knex('poll_votes').del())
    .then(async () => {
      const poll = await knex('polls').where('creator_id', jim.id).first()
      const pollOptions = await knex('poll_options').where('poll_id', poll.id).limit('3')

      return knex('poll_votes').del().insert([
        {
          poll_id: poll.id,
          option_id: pollOptions[1].id,
          user_id: jim.id,
        },
        {
          poll_id: poll.id,
          option_id: pollOptions[0].id,
          user_id: michael.id,
        },
      ])
    })
}
