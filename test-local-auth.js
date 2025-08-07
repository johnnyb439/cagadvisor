const fs = require('fs');
const path = require('path');

console.log('=== LOCAL AUTH TEST ===\n');

// Read users.json
const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

console.log('📊 Users in database:\n');
users.forEach(user => {
  console.log(`✅ ${user.email}`);
  console.log(`   Username: ${user.username}`);
  console.log(`   Password: ${user.password}`);
  console.log(`   Name: ${user.name}`);
  console.log(`   Admin: ${user.isAdmin ? 'Yes' : 'No'}`);
  console.log('');
});

console.log('=== LOGIN CREDENTIALS ===\n');
console.log('Admin Account:');
console.log('  Email: tone.dubai@icloud.com');
console.log('  Password: Admin@2025!');
console.log('');
console.log('Test Account:');
console.log('  Email: test@test.com');
console.log('  Password: test123');
console.log('');
console.log('Demo Account:');
console.log('  Email: demo@demo.com');
console.log('  Password: demo');
console.log('\n✅ Auth system is now using plain text passwords for local testing.');
console.log('✅ No external dependencies required.');