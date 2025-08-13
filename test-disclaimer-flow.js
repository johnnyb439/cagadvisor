#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3001';
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const COMPANIES_FILE = path.join(__dirname, 'data', 'companies.json');

// Test data
const timestamp = Date.now();
const candidateData = {
  withoutDisclaimer: {
    name: `Test User No Disclaimer ${timestamp}`,
    username: `testuser_nodisclaim_${timestamp}`,
    email: `test_nodisclaim_${timestamp}@test.com`,
    password: 'TestPass123!',
    clearanceLevel: 'Secret',
    disclaimerAgreed: false
  },
  withDisclaimer: {
    name: `Test User With Disclaimer ${timestamp}`,
    username: `testuser_disclaim_${timestamp}`,
    email: `test_disclaim_${timestamp}@test.com`,
    password: 'TestPass123!',
    clearanceLevel: 'Top Secret',
    disclaimerAgreed: true
  }
};

const companyData = {
  withoutDisclaimer: {
    companyName: `Test Company No Disclaimer ${timestamp}`,
    contactName: 'John Smith',
    email: `company_nodisclaim_${timestamp}@test.com`,
    phone: '555-123-4567',
    password: 'CompanyPass123!',
    companySize: '11-50',
    hiringNeeds: 'Looking for cleared developers',
    disclaimerAgreed: false
  },
  withDisclaimer: {
    companyName: `Test Company With Disclaimer ${timestamp}`,
    contactName: 'Jane Doe',
    email: `company_disclaim_${timestamp}@test.com`,
    phone: '555-987-6543',
    password: 'CompanyPass123!',
    companySize: '51-200',
    hiringNeeds: 'Seeking TS/SCI cleared engineers',
    disclaimerAgreed: true
  }
};

// Helper function to make API calls
async function makeRequest(endpoint, data) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    return {
      status: response.status,
      ok: response.ok,
      data: result
    };
  } catch (error) {
    return {
      status: 0,
      ok: false,
      data: { error: error.message }
    };
  }
}

// Read JSON file
function readJsonFile(filepath) {
  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filepath}:`, error.message);
    return [];
  }
}

// Test results storage
const testResults = {
  candidateTests: [],
  companyTests: []
};

// Run candidate registration tests
async function testCandidateRegistration() {
  console.log('\n========================================');
  console.log('PART 1: CANDIDATE REGISTRATION TESTS');
  console.log('========================================\n');

  // Test 1: Registration without disclaimer
  console.log('Test 1: Attempting candidate registration WITHOUT disclaimer...');
  const result1 = await makeRequest('/api/simple-auth/register', candidateData.withoutDisclaimer);
  
  const test1Result = {
    testName: 'Candidate Registration without Disclaimer',
    expectedStatus: 400,
    actualStatus: result1.status,
    expectedError: 'self-report disclaimer',
    actualError: result1.data.error || '',
    passed: result1.status === 400 && result1.data.error && result1.data.error.toLowerCase().includes('disclaimer')
  };
  
  console.log(`Status: ${result1.status}`);
  console.log(`Response: ${JSON.stringify(result1.data, null, 2)}`);
  console.log(`✓ Expected: Error about disclaimer agreement`);
  console.log(`${test1Result.passed ? '✅ PASSED' : '❌ FAILED'}: ${test1Result.passed ? 'Correctly rejected' : 'Should have been rejected'}\n`);
  
  testResults.candidateTests.push(test1Result);

  // Test 2: Registration with disclaimer
  console.log('Test 2: Attempting candidate registration WITH disclaimer...');
  const result2 = await makeRequest('/api/simple-auth/register', candidateData.withDisclaimer);
  
  const test2Result = {
    testName: 'Candidate Registration with Disclaimer',
    expectedStatus: 200,
    actualStatus: result2.status,
    userId: result2.data.user?.id,
    passed: result2.ok && result2.data.success === true
  };
  
  console.log(`Status: ${result2.status}`);
  console.log(`Response: ${JSON.stringify(result2.data, null, 2)}`);
  console.log(`${test2Result.passed ? '✅ PASSED' : '❌ FAILED'}: ${test2Result.passed ? 'Successfully registered' : 'Registration should have succeeded'}\n`);
  
  testResults.candidateTests.push(test2Result);

  // Test 3: Verify audit trail
  if (test2Result.passed && test2Result.userId) {
    console.log('Test 3: Verifying candidate audit trail in users.json...');
    const users = readJsonFile(USERS_FILE);
    const newUser = users.find(u => u.id === test2Result.userId);
    
    const test3Result = {
      testName: 'Candidate Audit Trail Verification',
      userFound: !!newUser,
      disclaimerAgreed: newUser?.disclaimerAgreed,
      disclaimerAgreedAt: newUser?.disclaimerAgreedAt,
      passed: !!newUser && newUser.disclaimerAgreed === true && !!newUser.disclaimerAgreedAt
    };
    
    if (newUser) {
      console.log('User entry found:');
      console.log(JSON.stringify(newUser, null, 2));
      console.log(`\n✓ disclaimerAgreed: ${newUser.disclaimerAgreed}`);
      console.log(`✓ disclaimerAgreedAt: ${newUser.disclaimerAgreedAt}`);
    } else {
      console.log('❌ User not found in users.json');
    }
    
    console.log(`${test3Result.passed ? '✅ PASSED' : '❌ FAILED'}: Audit trail ${test3Result.passed ? 'correctly recorded' : 'not properly recorded'}\n`);
    
    testResults.candidateTests.push(test3Result);
  }
}

// Run company registration tests
async function testCompanyRegistration() {
  console.log('\n========================================');
  console.log('PART 2: COMPANY REGISTRATION TESTS');
  console.log('========================================\n');

  // Test 4: Registration without disclaimer
  console.log('Test 4: Attempting company registration WITHOUT disclaimer...');
  const result4 = await makeRequest('/api/auth/register/company', companyData.withoutDisclaimer);
  
  const test4Result = {
    testName: 'Company Registration without Disclaimer',
    expectedStatus: 400,
    actualStatus: result4.status,
    expectedError: 'disclaimer',
    actualError: result4.data.error || '',
    passed: result4.status === 400 && result4.data.error && result4.data.error.toLowerCase().includes('disclaimer')
  };
  
  console.log(`Status: ${result4.status}`);
  console.log(`Response: ${JSON.stringify(result4.data, null, 2)}`);
  console.log(`✓ Expected: Error about disclaimer acknowledgment`);
  console.log(`${test4Result.passed ? '✅ PASSED' : '❌ FAILED'}: ${test4Result.passed ? 'Correctly rejected' : 'Should have been rejected'}\n`);
  
  testResults.companyTests.push(test4Result);

  // Test 5: Registration with disclaimer
  console.log('Test 5: Attempting company registration WITH disclaimer...');
  const result5 = await makeRequest('/api/auth/register/company', companyData.withDisclaimer);
  
  const test5Result = {
    testName: 'Company Registration with Disclaimer',
    expectedStatus: 200,
    actualStatus: result5.status,
    companyId: result5.data.company?.id,
    passed: result5.ok && result5.data.success === true
  };
  
  console.log(`Status: ${result5.status}`);
  console.log(`Response: ${JSON.stringify(result5.data, null, 2)}`);
  console.log(`${test5Result.passed ? '✅ PASSED' : '❌ FAILED'}: ${test5Result.passed ? 'Successfully registered' : 'Registration should have succeeded'}\n`);
  
  testResults.companyTests.push(test5Result);

  // Test 6: Verify audit trail
  if (test5Result.passed && test5Result.companyId) {
    console.log('Test 6: Verifying company audit trail in companies.json...');
    const companies = readJsonFile(COMPANIES_FILE);
    const newCompany = companies.find(c => c.id === test5Result.companyId);
    
    const test6Result = {
      testName: 'Company Audit Trail Verification',
      companyFound: !!newCompany,
      disclaimerAgreed: newCompany?.disclaimerAgreed,
      disclaimerAgreedAt: newCompany?.disclaimerAgreedAt,
      passed: !!newCompany && newCompany.disclaimerAgreed === true && !!newCompany.disclaimerAgreedAt
    };
    
    if (newCompany) {
      console.log('Company entry found:');
      console.log(JSON.stringify(newCompany, null, 2));
      console.log(`\n✓ disclaimerAgreed: ${newCompany.disclaimerAgreed}`);
      console.log(`✓ disclaimerAgreedAt: ${newCompany.disclaimerAgreedAt}`);
    } else {
      console.log('❌ Company not found in companies.json');
    }
    
    console.log(`${test6Result.passed ? '✅ PASSED' : '❌ FAILED'}: Audit trail ${test6Result.passed ? 'correctly recorded' : 'not properly recorded'}\n`);
    
    testResults.companyTests.push(test6Result);
  }
}

// Generate test report
function generateReport() {
  console.log('\n========================================');
  console.log('TEST SUMMARY REPORT');
  console.log('========================================\n');

  const allTests = [...testResults.candidateTests, ...testResults.companyTests];
  const passedTests = allTests.filter(t => t.passed);
  const failedTests = allTests.filter(t => !t.passed);

  console.log(`Total Tests: ${allTests.length}`);
  console.log(`✅ Passed: ${passedTests.length}`);
  console.log(`❌ Failed: ${failedTests.length}`);
  console.log(`Success Rate: ${((passedTests.length / allTests.length) * 100).toFixed(1)}%\n`);

  if (failedTests.length > 0) {
    console.log('Failed Tests:');
    failedTests.forEach(test => {
      console.log(`  ❌ ${test.testName}`);
    });
    console.log('');
  }

  console.log('Detailed Results:');
  console.log('-----------------');
  allTests.forEach(test => {
    console.log(`${test.passed ? '✅' : '❌'} ${test.testName}`);
  });

  // Save report to file
  const reportPath = path.join(__dirname, `test-report-${timestamp}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  console.log(`\nDetailed report saved to: ${reportPath}`);
}

// Main test runner
async function runTests() {
  console.log('Starting Disclaimer Flow Tests...');
  console.log(`Server: ${BASE_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}\n`);

  try {
    // Check if server is running
    const healthCheck = await fetch(BASE_URL);
    if (!healthCheck.ok) {
      throw new Error('Server is not responding');
    }

    await testCandidateRegistration();
    await testCompanyRegistration();
    generateReport();

  } catch (error) {
    console.error('Test execution failed:', error.message);
    console.error('Make sure the development server is running on', BASE_URL);
  }
}

// Run the tests
runTests();