const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

async function checkEnv() {
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found!');
    console.log('👉 Please create a .env.local file in the root directory.');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });

  const keyId = envVars['NEXT_PUBLIC_RAZORPAY_KEY_ID'];
  const keySecret = envVars['RAZORPAY_KEY_SECRET'];

  if (!keyId) {
    console.error('❌ NEXT_PUBLIC_RAZORPAY_KEY_ID is missing.');
  } else if (keyId.startsWith('rzp_test')) {
    console.log('✅ Razorpay Key ID found (Test Mode):', keyId);
  } else if (keyId.startsWith('rzp_live')) {
    console.log('✅ Razorpay Key ID found (Live Mode):', keyId);
  } else {
    console.warn('⚠️ Razorpay Key ID found but format looks unusual:', keyId);
  }

  if (!keySecret) {
    console.error('❌ RAZORPAY_KEY_SECRET is missing.');
  } else {
    console.log('✅ Razorpay Key Secret found.');
  }

  if (keyId && keySecret) {
    console.log('\n🎉 Razorpay environment variables appear to be set correctly!');
  } else {
    console.log('\nPlease add your keys to .env.local in the following format:');
    console.log('NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...');
    console.log('RAZORPAY_KEY_SECRET=...');
  }
}

checkEnv();
