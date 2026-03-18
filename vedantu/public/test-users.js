// Simple script to add test users directly
// Run this in your browser console on the signup page or create a test component

const testUsers = [
  {
    name: "Test Student One",
    email: "test1@brilliantroots.com",
    phone: "9876543210",
    password: "password123",
    grade: "10"
  },
  {
    name: "Test Student Two", 
    email: "test2@brilliantroots.com",
    phone: "9876543211",
    password: "password123",
    grade: "9"
  },
  {
    name: "Test Student Three",
    email: "test3@brilliantroots.com",
    phone: "9876543212", 
    password: "password123",
    grade: "jee"
  }
];

// Function to create test users
async function createTestUsers() {
  console.log('Creating test users...');
  
  for (const userData of testUsers) {
    try {
      // Import the signup function from your context
      // Or use the auth context directly if on a page
      const result = await window.signupUser(userData);
      
      if (result.success) {
        console.log(`✅ Created user: ${userData.name} (${userData.email})`);
      } else {
        console.error(`❌ Failed to create ${userData.email}: ${result.error}`);
      }
    } catch (error) {
      console.error(`❌ Error creating ${userData.email}:`, error);
    }
  }
}

// Alternative: Manual signup through the UI
console.log('To test manually:');
console.log('1. Go to /signup page');
console.log('2. Use these credentials:');
testUsers.forEach(user => {
  console.log(`   Email: ${user.email}, Password: ${user.password}, Name: ${user.name}, Phone: ${user.phone}, Grade: ${user.grade}`);
});

// Check existing users in localStorage
function checkLocalUsers() {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    console.log('Current user in localStorage:', JSON.parse(storedUser));
  } else {
    console.log('No user in localStorage');
  }
}

// Export for use in console
window.createTestUsers = createTestUsers;
window.checkLocalUsers = checkLocalUsers;
window.testUsers = testUsers;

console.log('Test functions ready! Use createTestUsers() to create test users.');
