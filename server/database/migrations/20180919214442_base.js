
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', t => {
    t.increments('id')
    t.string('email').notNullable()
    t.string('username').notNullable()
    t.string('shortname').notNullable()
    t.string('password').notNullable()
    t.string('first_name').notNullable()
    t.string('last_name').notNullable()
    t.timestamps()
  })
    .then(() => {
      return knex.schema.alterTable('users', t => {
        t.unique('email')
        t.unique('username')
      })
    })
    .then(() => {
      return knex.schema.createTable('messages', t => {
        t.increments('id')
        t.string('content').notNullable()
        t.string('subject')
        t.boolean('read')

        t.integer('sender_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')

        t.timestamp('sent_date').defaultTo(knex.fn.now())

        t.timestamps()
      })
    })
    // TODO
    // .then(() => {
    //   return knex.schema.createTable('roles', t => {
    //     t.increments('id')

    //   })
    // })
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
        t.string('name').notNullable()
        t.integer('creator_id')
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
        t.boolean('canceled').notNullable()
        t.timestamp('start_date')
        t.timestamp('end_date')
        t.timestamps()
      })
    })
    .then(() => {
      return knex.schema.createTable('meeting_attendees', t => {
        // It would probably be better to have an enum type
        t.boolean('pending').notNullable()
        t.boolean('attending').notNullable()
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
        t.string('name').notNullable()

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
        t.string('name').notNullable()
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
        t.string('name').notNullable()
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
