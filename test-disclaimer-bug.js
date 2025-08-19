#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3001';

// Test data
const timestamp = Date.now();
const candidateData = {
  withoutDisclaimer: {
    name: `Bug Test User ${timestamp}`,
    username: `bug_test_user_${timestamp}`,
    email: `bug_test_${timestamp}@test.com`,
    password: 'TestPass123!',
    clearanceLevel: 'Secret',
    disclaimerAgreed: false
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

// Test results storage
const testResults = [];

// Run candidate registration tests
async function testCandidateRegistrationBug() {
  console.log('\n========================================');
  console.log('REPLICATING BUG: CANDIDATE REGISTRATION');
  console.log('========================================\n');

  // Test: Registration without disclaimer should succeed (the bug)
  console.log('Test: Attempting candidate registration WITHOUT disclaimer...');
  const result = await makeRequest('/api/auth/register', candidateData.withoutDisclaimer);
  
  const testResult = {
    testName: 'Candidate Registration without Disclaimer (Bug Replication)',
    expectedStatus: 200, // This is the bug - it should be 400
    actualStatus: result.status,
    passed: result.status === 200 && result.data.success === true
  };
  
  console.log(`Status: ${result.status}`);
  console.log(`Response: ${JSON.stringify(result.data, null, 2)}`);
  console.log(`✓ Expected: Successful registration (status 200)`);
  console.log(`${testResult.passed ? '✅ BUG REPLICATED' : '❌ TEST FAILED'}: ${testResult.passed ? 'Successfully registered without disclaimer' : 'Could not register'}\n`);
  
  testResults.push(testResult);
}

// Generate test report
function generateReport() {
  console.log('\n========================================');
  console.log('BUG REPLICATION TEST SUMMARY');
  console.log('========================================\n');

  const passedTests = testResults.filter(t => t.passed);
  const failedTests = testResults.filter(t => !t.passed);

  console.log(`Total Tests: ${testResults.length}`);
  console.log(`✅ Bug Replicated: ${passedTests.length}`);
  console.log(`❌ Test Failed: ${failedTests.length}`);

  if (passedTests.length > 0) {
    console.log('\n The bug was successfully replicated. A user can register without the disclaimer.');
  } else {
    console.log('\n The bug was not replicated. The test did not pass as expected.');
  }
}

// Main test runner
async function runTests() {
  console.log('Starting Disclaimer Bug Replication Test...');
  console.log(`Server: ${BASE_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}\n`);

  try {
    // Check if server is running
    const healthCheck = await fetch(BASE_URL);
    if (!healthCheck.ok) {
      throw new Error('Server is not responding');
    }

    await testCandidateRegistrationBug();
    generateReport();

  } catch (error) {
    console.error('Test execution failed:', error.message);
    console.error('Make sure the development server is running on', BASE_URL);
  }
}

// Run the tests
runTests();
