
exports.seed = async (knex) => {
    // CICD
    // Deletes ALL existing entries
    knex('article','category','user','role').del()
  
    // Inserts seed entries
    await knex('role').insert([
      { id: 1, name: 'admin' },
      {id:2, name: 'moderator'},
      {id:3, name: 'member'}
    ])
    await knex('user')
      .insert([
        {
          id: 1,
          name: '',
          name: 'AdminBranch'
        }
      ])
    await knex('role').insert([
      { id: 1, name: "Admin" }
    ])
    await knex('user').insert([
      {
        id: 1,
        full_name: 'Admin SuperAdmin',
        login: 'admin@gmail.com',
        role_id: 1,
        password: "secret123"
      },
      {
        id: 1,
        full_name: 'Moderator',
        login: 'moderator@gmail.com',
        role_id: 2,
        password: "secret123"
      },
      {
        id: 1,
        full_name: 'Member',
        login: 'member@gmail.com',
        role_id: 3,
        password: "secret123"
      },
    ])
    await knex('category').insert([
        {
            id: 1,
            name: 'Category Name',
            description: 'Some description'
        }
    ])
    await knex ('article') .insert([
        {
            id:1,
            name:"Article Name",
            content: "some content here",
            updated_at: "11.11.12",
            user_id: 1,
            category_id:1

        }
    ])
  }