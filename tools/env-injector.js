#!/usr/bin/env node

/**
 * Environment Variable Injector for Auth0
 * This script replaces placeholders in admin/index.html with actual environment variables
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

const adminPath = path.join(__dirname, '../admin/index.html');

if (!fs.existsSync(adminPath)) {
  console.error('❌ admin/index.html not found');
  process.exit(1);
}

// Read the admin file
let content = fs.readFileSync(adminPath, 'utf8');

// Replace placeholders with environment variables
const replacements = {
  'YOUR_AUTH0_CLIENT_ID': process.env.AUTH0_CLIENT_ID || 'YOUR_AUTH0_CLIENT_ID',
  'YOUR_AUTH0_DOMAIN': process.env.AUTH0_DOMAIN || 'YOUR_AUTH0_DOMAIN'
};

let hasChanges = false;

Object.entries(replacements).forEach(([placeholder, value]) => {
  if (content.includes(placeholder)) {
    content = content.replace(new RegExp(placeholder, 'g'), value);
    hasChanges = true;
    console.log(`✅ Replaced ${placeholder} with environment variable`);
  }
});

if (hasChanges) {
  // Write the updated content back
  fs.writeFileSync(adminPath, content, 'utf8');
  console.log('✅ Environment variables injected successfully');
} else {
  console.log('ℹ️  No placeholders found to replace');
}

console.log('\n🔑 Environment variables used:');
console.log(`   AUTH0_CLIENT_ID: ${process.env.AUTH0_CLIENT_ID ? '✅ Set' : '❌ Not set'}`);
console.log(`   AUTH0_DOMAIN: ${process.env.AUTH0_DOMAIN ? '✅ Set' : '❌ Not set'}`); 