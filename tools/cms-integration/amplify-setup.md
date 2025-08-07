# AWS Amplify CMS Integration

This guide explains how to use the Netlify CMS with AWS Amplify hosting.

## Setup for AWS Amplify

### 1. Remove Netlify-specific Files
```bash
# Remove Netlify configuration (not needed for Amplify)
rm netlify.toml
```

### 2. Amplify Build Configuration
The `amplify.yaml` file is already configured to:
- Install Node.js dependencies
- Run demo generation during build
- Deploy all files to Amplify

### 3. CMS Access Setup

#### Option A: Use Netlify CMS with Amplify (Recommended)
1. **Deploy to Netlify first** (for CMS access)
2. **Set up Git Gateway** in Netlify
3. **Use Netlify CMS** to create/edit content
4. **Push changes** to GitHub
5. **Amplify auto-deploys** from GitHub

#### Option B: Direct Git Access
1. **Clone your repo locally**
2. **Edit content files** directly in `content/demos/` and `content/demo-phases/`
3. **Push to GitHub**
4. **Amplify auto-deploys**

### 4. Amplify Console Configuration

In your Amplify Console:

1. **Build settings**:
   - Build image: `Ubuntu 18.04`
   - Node.js version: `18.x`

2. **Environment variables** (if needed):
   ```
   NODE_ENV=production
   ```

3. **Build commands** (already in amplify.yaml):
   ```yaml
   preBuild:
     commands:
       - npm install
   build:
     commands:
       - npm run generate-demos
   ```

## Workflow with Amplify

### Content Creation Workflow:
1. **Create content** via Netlify CMS (on Netlify) or direct Git editing
2. **Save to GitHub** - content stored as JSON files
3. **Amplify detects changes** and triggers build
4. **Build process**:
   - Installs dependencies
   - Runs `npm run generate-demos`
   - Generates HTML from JSON content
   - Deploys to Amplify
5. **Live site updates** automatically

### Benefits of This Approach:
- **Best of both worlds**: Netlify's excellent CMS + Amplify's hosting
- **Automatic builds**: Every content change triggers a new deployment
- **Version control**: All content changes tracked in Git
- **Scalable**: Easy to add new demos and phases
- **Team collaboration**: Multiple people can edit content

## Alternative: Pure Amplify Solution

If you prefer to stay entirely within AWS:

### Option 1: Amplify Admin UI
- Use Amplify's built-in admin interface
- More limited than Netlify CMS
- Requires custom development for demo management

### Option 2: Custom CMS with Amplify Backend
```javascript
// Example: Using Amplify API for content management
import { API } from 'aws-amplify';

// Create demo content
const createDemo = async (demoData) => {
  return await API.post('demoAPI', '/demos', {
    body: demoData
  });
};

// Get demo content
const getDemos = async () => {
  return await API.get('demoAPI', '/demos');
};
```

### Option 3: AWS AppSync + DynamoDB
- GraphQL API for content management
- Real-time updates
- More complex setup but highly scalable

## Recommended Approach

**Use Netlify CMS + Amplify Hosting** because:

1. **Netlify CMS is superior** for content management
2. **Amplify hosting is excellent** for static sites
3. **Git-based workflow** works seamlessly
4. **No vendor lock-in** - content is just JSON files
5. **Easy migration** if needed

## Migration Steps

If you're currently on Netlify and want to move to Amplify:

1. **Keep your Netlify site** for CMS access
2. **Connect Amplify** to your GitHub repo
3. **Configure amplify.yaml** (already done)
4. **Test the build process**
5. **Update DNS** to point to Amplify
6. **Keep Netlify** just for CMS access

## Troubleshooting

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check file paths in demo generator

### CMS Access Issues
- Ensure Git Gateway is enabled in Netlify
- Check GitHub permissions
- Verify admin/config.yml is correct

### Content Not Updating
- Check if content is marked as "published"
- Verify JSON file structure
- Check build logs in Amplify Console 