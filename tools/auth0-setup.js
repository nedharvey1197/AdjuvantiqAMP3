#!/usr/bin/env node

/**
 * Auth0 Setup Helper for AdjuvantIQ CMS
 * This script helps validate and configure Auth0 settings
 */

const fs = require('fs');
const path = require('path');

console.log('🔐 Auth0 Setup Helper for AdjuvantIQ CMS\n');

// Check if admin/index.html exists
const adminPath = path.join(__dirname, '../admin/index.html');
if (!fs.existsSync(adminPath)) {
  console.error('❌ admin/index.html not found');
  process.exit(1);
}

// Read the admin file
const adminContent = fs.readFileSync(adminPath, 'utf8');

// Check for placeholders
const hasPlaceholders = adminContent.includes('YOUR_AUTH0_CLIENT_ID') || 
                       adminContent.includes('YOUR_AUTH0_DOMAIN');

if (hasPlaceholders) {
  console.log('⚠️  Configuration needed:');
  console.log('   You need to replace the following placeholders in admin/index.html:');
  console.log('   - YOUR_AUTH0_CLIENT_ID');
  console.log('   - YOUR_AUTH0_DOMAIN');
  console.log('');
  console.log('📋 Steps to complete setup:');
  console.log('1. Go to https://manage.auth0.com');
  console.log('2. Create a new application (Single Page Application)');
  console.log('3. Enable Google and GitHub social connections');
  console.log('4. Copy your Client ID and Domain');
  console.log('5. Update admin/index.html with your credentials');
  console.log('6. Set environment variables in Netlify dashboard');
  console.log('');
  console.log('📖 See AUTH0_SETUP.md for detailed instructions');
} else {
  console.log('✅ Auth0 configuration appears to be set up');
  console.log('   Make sure to test the authentication flow');
}

// Check for environment variables guide
console.log('\n🔑 Environment Variables needed in Netlify:');
console.log('   AUTH0_DOMAIN=your-auth0-domain.auth0.com');
console.log('   AUTH0_CLIENT_ID=your-auth0-client-id');
console.log('   AUTH0_AUDIENCE=https://your-auth0-domain.auth0.com/api/v2/');

// Check if netlify.toml exists
const netlifyPath = path.join(__dirname, '../netlify.toml');
if (fs.existsSync(netlifyPath)) {
  console.log('\n✅ netlify.toml found - CMS should work with Auth0');
} else {
  console.log('\n⚠️  netlify.toml not found - you may need to configure Netlify');
}

console.log('\n🚀 Next steps:');
console.log('1. Follow the setup guide in AUTH0_SETUP.md');
console.log('2. Deploy your changes to GitHub');
console.log('3. Test authentication at yourdomain.com/admin');
console.log('4. Verify CMS access after successful login');

console.log('\n📞 Need help? Check the troubleshooting section in AUTH0_SETUP.md'); 