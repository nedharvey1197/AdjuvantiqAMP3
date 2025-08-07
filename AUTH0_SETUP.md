# Auth0 Setup Guide for AdjuvantIQ CMS

This guide will help you set up Auth0 with Google and GitHub authentication for your Netlify CMS.

## 🔧 Step 1: Create Auth0 Application

1. **Go to Auth0 Dashboard**
   - Visit [https://manage.auth0.com](https://manage.auth0.com)
   - Sign up or log in to your Auth0 account

2. **Create New Application**
   - Click "Applications" → "Create Application"
   - Name: `AdjuvantIQ CMS`
   - Type: `Single Page Application`
   - Click "Create"

3. **Configure Application Settings**
   - Go to your new application settings
   - Update the following URLs:
     ```
     Allowed Callback URLs: https://yourdomain.com/admin
     Allowed Logout URLs: https://yourdomain.com/admin
     Allowed Web Origins: https://yourdomain.com
     Allowed Origins (CORS): https://yourdomain.com
     ```

## 🔗 Step 2: Enable Social Connections

### Google OAuth2 Setup

1. **In Auth0 Dashboard**
   - Go to "Authentication" → "Social"
   - Click on "Google"

2. **Configure Google Connection**
   - Enable the connection
   - Set Client ID and Client Secret from Google Console
   - Save the configuration

3. **Google Console Setup** (if you don't have credentials)
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Set authorized redirect URIs: `https://your-auth0-domain.auth0.com/login/callback`

### GitHub OAuth Setup

1. **In Auth0 Dashboard**
   - Go to "Authentication" → "Social"
   - Click on "GitHub"

2. **Configure GitHub Connection**
   - Enable the connection
   - Set Client ID and Client Secret from GitHub

3. **GitHub App Setup** (if you don't have credentials)
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Set Authorization callback URL: `https://your-auth0-domain.auth0.com/login/callback`

## 👥 Step 3: Configure User Management

1. **Create Users** (Optional)
   - Go to "User Management" → "Users"
   - Click "Create User"
   - Add team members who should access the CMS

2. **Set Up Rules** (Optional)
   - Go to "Auth Pipeline" → "Rules"
   - Create rules to automatically assign roles or permissions

## 🔑 Step 4: Update Environment Variables

In your Netlify dashboard → Site Settings → Environment Variables:

```
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_AUDIENCE=https://your-auth0-domain.auth0.com/api/v2/
```

## 📝 Step 5: Update Admin Configuration

Replace the placeholders in `admin/index.html`:

```javascript
const lock = new Auth0Lock(
  'YOUR_AUTH0_CLIENT_ID', // Replace with your actual Client ID
  'YOUR_AUTH0_DOMAIN',    // Replace with your actual Domain
  // ... rest of configuration
);
```

## 🚀 Step 6: Deploy and Test

1. **Deploy Changes**
   ```bash
   git add .
   git commit -m "Add Auth0 authentication"
   git push origin main
   ```

2. **Test Authentication**
   - Visit `https://yourdomain.com/admin`
   - Try logging in with Google and GitHub
   - Verify you can access the CMS

## 🔒 Step 7: Security Considerations

1. **Restrict Access**
   - In Auth0, go to "User Management" → "Roles"
   - Create a "CMS Editor" role
   - Assign this role to authorized users only

2. **Monitor Usage**
   - Use Auth0 logs to monitor login attempts
   - Set up alerts for suspicious activity

## 🛠️ Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**
   - Check that your domain is correctly set in Auth0
   - Ensure HTTPS is used for production

2. **"Connection not found"**
   - Verify Google/GitHub connections are enabled in Auth0
   - Check that OAuth credentials are correct

3. **CMS not loading after login**
   - Check browser console for JavaScript errors
   - Verify Auth0 configuration in admin/index.html

### Debug Mode:
Add this to your admin/index.html for debugging:
```javascript
lock.on('unrecoverable_error', function(error) {
  console.error('Auth0 error:', error);
});
```

## 📞 Support

If you encounter issues:
1. Check Auth0 logs in the dashboard
2. Review browser console for errors
3. Verify all environment variables are set correctly
4. Contact Auth0 support if needed

## 🔄 Migration from Netlify Identity

Since Netlify Identity is deprecated:
1. Export your existing users (if any)
2. Create corresponding users in Auth0
3. Update your authentication flow
4. Test thoroughly before removing old configuration 