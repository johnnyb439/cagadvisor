const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Test password hashing and verification
async function testAuth() {
  console.log('=== Authentication Test Script ===\n');
  
  // Read current users
  const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  const parsed = JSON.parse(data);
  const users = Array.isArray(parsed) ? parsed : (parsed.users || []);
  
  console.log(`Found ${users.length} users in database\n`);
  
  // Create admin account for tone.dubai@icloud.com
  const adminPassword = 'Admin@2025!';
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
  
  // Check if admin already exists
  const adminExists = users.some(u => u.email === 'tone.dubai@icloud.com');
  
  if (!adminExists) {
    const adminUser = {
      id: `user_admin_${Date.now()}`,
      email: 'tone.dubai@icloud.com',
      username: 'admin',
      password: hashedAdminPassword,
      name: 'Admin User',
      clearanceLevel: 'Top Secret',
      isAdmin: true,
      createdAt: new Date().toISOString()
    };
    
    users.push(adminUser);
    console.log('✅ Admin account created:');
    console.log('   Email: tone.dubai@icloud.com');
    console.log('   Password: Admin@2025!');
    console.log('   Username: admin\n');
  } else {
    // Update existing admin account password
    const adminIndex = users.findIndex(u => u.email === 'tone.dubai@icloud.com');
    users[adminIndex].password = hashedAdminPassword;
    users[adminIndex].isAdmin = true;
    console.log('✅ Admin account updated:');
    console.log('   Email: tone.dubai@icloud.com');
    console.log('   Password: Admin@2025!');
    console.log('   (Password has been reset)\n');
  }
  
  // Save users back in the correct format (plain array as it currently is)
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
  
  // Test password verification for each user
  console.log('Testing password verification:\n');
  
  // Test admin login
  const testPassword = 'Admin@2025!';
  const adminUser = users.find(u => u.email === 'tone.dubai@icloud.com');
  if (adminUser) {
    const isValid = await bcrypt.compare(testPassword, adminUser.password);
    console.log(`Admin login test: ${isValid ? '✅ PASS' : '❌ FAIL'}`);
  }
  
  // Display all users (without passwords)
  console.log('\n=== All Users in Database ===');
  users.forEach(user => {
    console.log(`- ${user.email} (${user.name}) - Created: ${user.createdAt}`);
  });
  
  console.log('\n=== Test Complete ===');
  console.log('You can now login with:');
  console.log('Email: tone.dubai@icloud.com');
  console.log('Password: Admin@2025!');
}

testAuth().catch(console.error);