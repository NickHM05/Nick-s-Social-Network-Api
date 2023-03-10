const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing Users
  await User.deleteMany({});

  let users = [
    {
      username: 'PsUser',
      email: 'username@email.com',
    },
    {
      username: 'PstUser',
      email: 'Rusername@email.com',
    }
  ];

  let thoughts = [
    {
      username: 'PsUser',
      thoughtText: 'Hi i am a new user',
    },
    {
      username: 'PstUser',
      thoughtText: 'Hi i am also a new user',
    }
  ];
  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
