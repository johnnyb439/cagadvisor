const bcrypt = require('bcryptjs');

// Test with the new hashes
async function verifyPasswords() {
  const tests = [
    {
      email: 'demo@cagadvisor.com',
      password: 'demo123',
      hash: '$2b$10$QRESah7q31cZZgyNWBji4e.6zUWKRtrQmTSdRHClZq4LOVwkSdt1.'
    },
    {
      email: 'admin@cagadvisor.com',
      password: 'admin123',
      hash: '$2b$10$Z.kjKiqTnebDBGtaqNRJX.AaXzMzOE8DJYKGOR4xb0BZYzYsuibOS'
    }
  ];

  console.log('Verifying passwords with new hashes...\n');
  
  for (const test of tests) {
    const isValid = await bcrypt.compare(test.password, test.hash);
    console.log(`${test.email}: ${test.password}`);
    console.log(`Result: ${isValid ? '✅ VALID' : '❌ INVALID'}`);
    console.log('---');
  }
  
  // Generate fresh valid hashes
  console.log('\nGenerating fresh, guaranteed valid hashes:');
  console.log('demo123:', await bcrypt.hash('demo123', 10));
  console.log('admin123:', await bcrypt.hash('admin123', 10));
}

verifyPasswords();