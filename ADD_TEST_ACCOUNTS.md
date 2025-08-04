# 🔐 How to Add Your Own Test Accounts

## Quick Method (Copy & Paste)

### Step 1: Choose your accounts
Here are some ready-to-use test accounts. Copy any you want:

```javascript
// Test Account 1 - Basic User
{
  id: 'user_test_1',
  email: 'test@example.com',
  password: '$2b$10$EXAMPLE_HASH_HERE', // password123
  name: 'Test User',
  clearanceLevel: 'Secret'
}

// Test Account 2 - Admin
{
  id: 'user_admin_1',
  email: 'admin@example.com',
  password: '$2b$10$EXAMPLE_HASH_HERE', // admin456
  name: 'Admin User',
  clearanceLevel: 'Top Secret'
}
```

### Step 2: Add to auth.config.ts
1. Open `auth.config.ts`
2. Find the `DEFAULT_USERS` array (around line 17)
3. Add your accounts inside the brackets:

```javascript
const DEFAULT_USERS = [
  // Your accounts here
]
```

---

## Custom Account Generator

### Option 1: Use the generator script
```bash
# Run interactively
node create-test-account.js

# Or provide details directly
node create-test-account.js "email@example.com" "password123" "John Doe" "Secret"
```

### Option 2: Quick accounts with common passwords

I'll generate some for you. What would you like?
1. How many test accounts?
2. Any specific email format? (e.g., user1@test.com, user2@test.com)
3. Any specific passwords you want to use?
4. Names for the accounts?

---

## Pre-made Test Accounts

Here are some ready-to-use accounts with simple passwords:

```javascript
const DEFAULT_USERS = [
  // Copy this entire block to auth.config.ts
  {
    id: 'user_1',
    email: 'user1@test.com',
    password: '$2b$10$YourHashHere', // test123
    name: 'Test User 1',
    clearanceLevel: 'Secret'
  },
  {
    id: 'user_2',
    email: 'user2@test.com',
    password: '$2b$10$YourHashHere', // test123
    name: 'Test User 2',
    clearanceLevel: 'Top Secret'
  }
]
```

---

## Need me to generate specific accounts?

Tell me:
- Email addresses
- Passwords
- Names
- Clearance levels

And I'll generate the exact code for you!