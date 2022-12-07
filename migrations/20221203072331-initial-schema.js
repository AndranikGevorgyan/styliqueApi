exports.up = (knex) => {
  return knex.schema
    .createTable('role', (table) => {
      table.increments('id').primary()
      table.string('name');
    })
    .createTable('user', (table) => {
      table.increments('id').primary()
      table.string('full_name')
      table.string('username')
      table.string('password')
      table.integer('role_id')
        .unsigned()
        .references('id')
        .inTable('role')
        .index()
    })
    .createTable('category', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('description')
    })
    .createTable('article', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('content')
      table.string('updated_at')
      table.text('image')
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('user')
        .index()
      table.integer('category_id')
        .unsigned()
        .references('id')
        .inTable('category')
        .index()
    })
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('article')
    .dropTableIfExists('category')
    .dropTableIfExists('user')
    .dropTableIfExists('role')
};

exports._meta = {
  "version": 1
};
