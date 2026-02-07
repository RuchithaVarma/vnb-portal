import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'NEXT_PUBLIC_RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET'
];

console.log('🔍 Checking environment variables...');

const missing = REQUIRED_ENV_VARS.filter(env => !process.env[env]);

if (missing.length > 0) {
  console.error('\n❌ Missing environment variables:');
  missing.forEach(m => console.error(`   - ${m}`));
  console.log('\n💡 Please check your .env.local file. If it doesn\'t exist, create one based on the template provided.');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are present.\n');
}
