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
     Allowed Callback URLs: https://adjuvantiq.com/admin
     Allowed Logout URLs: https://adjuvantiq.com/admin
     Allowed Web Origins: https://adjuvantiq.com
     Allowed Origins (CORS): https://adjuvantiq.com
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

### GitHub OAuth Setup

1. **In Auth0 Dashboard**
   - Go to "Authentication" → "Social"
   - Click on "GitHub"

2. **Configure GitHub Connection**
   - Enable the connection
   - Set Client ID and Client Secret from GitHub

## 🔑 Step 3: Environment Variables

In your Netlify dashboard → Site Settings → Environment Variables:

```
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_AUDIENCE=https://your-auth0-domain.auth0.com/api/v2/
```

## 🚀 Step 4: Test Authentication

1. **Deploy Changes**
   ```bash
   git add .
   git commit -m "Restore Auth0 configuration"
   git push origin main
   ```

2. **Test Authentication**
   - Visit `https://adjuvantiq.com/admin`
   - Try logging in with Google and GitHub
   - Verify you can access the CMS

## 🔒 Security Notes

- Auth0 credentials are stored securely in environment variables
- No secrets are exposed in the code
- Runtime injection via Netlify function 