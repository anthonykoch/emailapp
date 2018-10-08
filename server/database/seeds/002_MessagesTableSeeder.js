
exports.seed = async (knex, Promise) => {
  const jim = await knex('users').where('first_name', 'Jim').first()
  const dwight = await knex('users').where('first_name', 'Dwight').first()
  const michael = await knex('users').where('first_name', 'Michael').first()

  // Deletes ALL existing entries
  return knex('messages').del()
    .then(() => {
      return knex('messages').insert([
        {
          sender_id: michael.id,
          content: `I didn't say it, I declared it`,
          subject: `Bankruptcy`,
          read: false,
        },
        {
          sender_id: jim.id,
          content: `Fact, bears eat beets. Bears. Beets. Battlestar Galactica`,
          subject: `What kind of bear is best?`,
          read: false,
        },
        {
          sender_id: jim.id,
          content: `Oh yeah, sorry Dwight, I forwarded your phone calls to my cell.`,
          subject: `Reply: Forwarded calls`,
          read: false,
        },
        {
          sender_id: dwight.id,
          subject: `My interests`,
          content: `Identify theft is not a joke Jim! Millions of families suffer every year!`,
          read: false,
        },
      ])
    })
    .then(() => knex('message_recipients').del())
    .then(async () => {
      const dwightMessage = await knex('messages').where('sender_id', dwight.id).first()
      const jimMessage = await knex('messages').where('sender_id', jim.id).first()
      const michaelMessage = await knex('messages').where('sender_id', michael.id).first()

      return knex('message_recipients').insert([
        {
          message_id: jimMessage.id,
          recipient_id: dwight.id,
        },
        {
          message_id: dwightMessage.id,
          recipient_id: jim.id,
        },
        {
          message_id: michaelMessage.id,
          recipient_id: jim.id,
        },
        {
          message_id: michaelMessage.id,
          recipient_id: dwight.id,
        },
      ])
    })
}
