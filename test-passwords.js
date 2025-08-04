const bcrypt = require('bcryptjs');

// Test if the stored hashes match the expected passwords
async function testPasswords() {
  const users = [
    {
      email: 'demo@cagadvisor.com',
      password: 'demo123',
      hash: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u'
    },
    {
      email: 'admin@cagadvisor.com',
      password: 'admin123',
      hash: '$2a$10$YPy8dPATPRPCp7mvQhtLz.nAPUZ/QjbD7DQpUe/QZhh4Dy5g1pYlG'
    }
  ];

  console.log('Testing password hashes...\n');
  
  for (const user of users) {
    const isValid = await bcrypt.compare(user.password, user.hash);
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${user.password}`);
    console.log(`Hash valid: ${isValid ? '✅ YES' : '❌ NO'}`);
    
    if (!isValid) {
      // Generate correct hash
      const correctHash = await bcrypt.hash(user.password, 10);
      console.log(`Correct hash should be: ${correctHash}`);
    }
    console.log('---');
  }
}

testPasswords();