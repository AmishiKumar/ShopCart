// Error Checking Script
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking for errors...\n');

// Check backend .env file
const envPath = path.join(__dirname, 'backend', '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ backend/.env exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('JWT_SECRET=your-super-secret')) {
    console.log('⚠️  WARNING: JWT_SECRET has default value - should be changed for production');
  }
  if (envContent.includes('MONGO_URI=mongodb://localhost')) {
    console.log('ℹ️  INFO: Using local MongoDB - make sure MongoDB is running');
  }
} else {
  console.log('❌ ERROR: backend/.env file not found!');
}

// Check if node_modules exist
const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');
const frontendNodeModules = path.join(__dirname, 'frontend', 'node_modules');

if (fs.existsSync(backendNodeModules)) {
  console.log('✅ backend/node_modules exists');
} else {
  console.log('❌ ERROR: backend/node_modules not found - run: cd backend && npm install');
}

if (fs.existsSync(frontendNodeModules)) {
  console.log('✅ frontend/node_modules exists');
} else {
  console.log('❌ ERROR: frontend/node_modules not found - run: cd frontend && npm install');
}

// Check key files
const keyFiles = [
  'backend/server.js',
  'backend/config/db.js',
  'frontend/src/App.jsx',
  'frontend/src/index.js'
];

console.log('\n📁 Checking key files:');
keyFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
  }
});

console.log('\n✨ Error check complete!');

