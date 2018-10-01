
exports.seed = async (knex, Promise) => {
  const jim = await knex('users').where('first_name', 'Jim').first()
  const dwight = await knex('users').where('first_name', 'Dwight').first()
  const michael = await knex('users').where('first_name', 'Michael').first()

  // Deletes ALL existing entries
  return knex('meetings').del()
    .then(() => {
      return knex('meetings').insert([
        {
          creator_id: michael.id,
          name: 'Sensitivity Training',
          canceled: false,
          start_date: new Date(),
          end_date: new Date(),
        },
      ])
    })
    .then(() => knex('meeting_attendees').del())
    .then(async () => {
      const meeting = await knex('meetings').where('creator_id', michael.id).first()

      return knex('meeting_attendees').del().insert([
        {
          pending: false,
          attending: false,
          attendee_id: jim.id,
          meeting_id: meeting.id,
        },
        {
          pending: false,
          attending: true,
          attendee_id: dwight.id,
          meeting_id: meeting.id,
        },
      ])
    })
}
