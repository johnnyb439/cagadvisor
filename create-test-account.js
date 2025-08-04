const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔐 Create Test Account for CAG Website\n');
console.log('This will generate the code to add a new test account.\n');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createAccount() {
  try {
    // Get account details
    const email = await question('Email address: ');
    const password = await question('Password: ');
    const name = await question('Full name: ');
    
    console.log('\nClearance Level Options:');
    console.log('1. Secret');
    console.log('2. Top Secret');
    console.log('3. Top Secret/SCI');
    const clearanceChoice = await question('Choose clearance level (1-3): ');
    
    const clearanceLevels = {
      '1': 'Secret',
      '2': 'Top Secret',
      '3': 'Top Secret/SCI'
    };
    
    const clearanceLevel = clearanceLevels[clearanceChoice] || 'Secret';
    
    // Generate password hash
    console.log('\nGenerating secure password hash...');
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Generate unique ID
    const userId = `user_${Date.now()}`;
    
    // Generate the account object
    const accountObject = `  {
    id: '${userId}',
    email: '${email}',
    password: '${passwordHash}', // ${password}
    name: '${name}',
    clearanceLevel: '${clearanceLevel}'
  }`;
    
    console.log('\n✅ Account created successfully!\n');
    console.log('Add this to DEFAULT_USERS array in auth.config.ts:');
    console.log('----------------------------------------');
    console.log(accountObject);
    console.log('----------------------------------------');
    
    console.log('\nAccount Summary:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Name: ${name}`);
    console.log(`Clearance: ${clearanceLevel}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
}

// If running with command line arguments, use them directly
if (process.argv.length >= 5) {
  const [,, email, password, name, clearance = 'Secret'] = process.argv;
  
  (async () => {
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `user_${Date.now()}`;
    
    const accountObject = `  {
    id: '${userId}',
    email: '${email}',
    password: '${passwordHash}', // ${password}
    name: '${name}',
    clearanceLevel: '${clearance}'
  }`;
    
    console.log('Add this to DEFAULT_USERS array in auth.config.ts:');
    console.log(accountObject);
    process.exit(0);
  })();
} else {
  createAccount();
}