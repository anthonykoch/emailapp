
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', t => {
    t.increments('id')
    t.string('email')
    t.string('password')
    t.string('first_name')
    t.string('last_name')
    t.timestamps()
  })
    .then(() => {
      return knex.schema.alterTable('users', t => {
        t.unique('email')
      })
    })
    .then(() => {
      return knex.schema.createTable('messages', t => {
        t.increments('id')

        t.string('content')

        t.integer('sender_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')

        t.timestamp('sent_date').defaultTo(knex.fn.now())

        t.timestamps()
      })
    })
    .then(() => {
      return knex.schema.createTable('message_recipients', t => {
        t.integer('recipient_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')

        t.integer('message_id')
          .notNullable()
          .references('id')
          .inTable('messages')
          .onDelete('CASCADE')

        t.timestamps()
      })
    })
    .then(() => {
      return knex.schema.createTable('meetings', t => {
        t.increments('id')
        t.string('name')
        t.integer('creator_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
        t.boolean('canceled')
        t.timestamp('start_date')
        t.timestamp('end_date')
        t.timestamps()
      })
    })
    .then(() => {
      return knex.schema.createTable('meeting_attendees', t => {
        // It would probably be better to have an enum type
        t.boolean('pending')
        t.boolean('attending')
        t.integer('attendee_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')

        t.integer('meeting_id')
          .notNullable()
          .references('id')
          .inTable('meetings')
          .onDelete('CASCADE')

        t.timestamps()
      })
    })
    .then(() => {
      return knex.schema.createTable('polls', t => {
        t.increments('id')
        t.string('name')

        t.integer('creator_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('cascade')

        t.timestamps()
      })
    })
    .then(() => {
      return knex.schema.createTable('poll_options', t => {
        t.increments('id')
        t.string('name')
        t.integer('poll_id')
          .notNullable()
          .references('id')
          .inTable('polls')
          .onDelete('CASCADE')
        t.timestamps()
      })
    })
    .then(() => {
      return knex.schema.createTable('poll_votes', t => {
        t.integer('poll_id')
          .notNullable()
          .references('id')
          .inTable('polls')
          .onDelete('CASCADE')

        t.integer('option_id')
          .notNullable()
          .references('id')
          .inTable('poll_options')
          .onDelete('CASCADE')

        t.integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')

        t.timestamps()
      })
    })
    .then(() => {
      return knex.schema.createTable('groups', t => {
        t.increments('id')
        t.string('name')
      })
    })
    .then(() => {
      return knex.schema.createTable('group_members', t => {
        t.integer('user_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')

        t.integer('group_id')
          .notNullable()
          .references('id')
          .inTable('groups')
          .onDelete('CASCADE')
      })
    })
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.raw('DROP TABLE IF EXISTS messages CASCADE'),
    knex.raw('DROP TABLE IF EXISTS message_recipients CASCADE'),
    knex.raw('DROP TABLE IF EXISTS users CASCADE'),
    knex.raw('DROP TABLE IF EXISTS polls CASCADE'),
    knex.raw('DROP TABLE IF EXISTS poll_votes CASCADE'),
    knex.raw('DROP TABLE IF EXISTS poll_options CASCADE'),
    knex.raw('DROP TABLE IF EXISTS meetings CASCADE'),
    knex.raw('DROP TABLE IF EXISTS meeting_attendees CASCADE'),
    knex.raw('DROP TABLE IF EXISTS groups CASCADE'),
    knex.raw('DROP TABLE IF EXISTS group_members CASCADE'),
  ])
}
