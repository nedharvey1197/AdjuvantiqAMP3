# 🚀 AdjuvantIQ Feedback System for AWS Amplify

## Overview

This guide explains how to use the new feedback system that's specifically designed to work with AWS Amplify hosting. The system collects user feedback from your demo pages and stores it locally with export capabilities.

## ✨ What's New

- **AWS Amplify Compatible**: Works seamlessly with your current hosting setup
- **No Backend Required**: Stores data locally in the browser
- **Real-time Collection**: Captures feedback, page views, and user interactions
- **Export Capabilities**: Download data as JSON or CSV
- **Admin Dashboard**: Beautiful interface to view and analyze feedback

## 🔧 How It Works

### 1. **Local Storage**
- Feedback data is stored in the browser's localStorage
- No external services or databases required
- Data persists across browser sessions

### 2. **Automatic Collection**
- **User Feedback**: Button clicks and interactions
- **Page Views**: When users visit demo pages
- **Page Visibility**: Time spent on pages
- **Session Tracking**: Unique user and session identification

### 3. **Data Export**
- Export all feedback as JSON files
- Export as CSV for spreadsheet analysis
- Access data through the admin dashboard

## 📁 Files Added

```
tools/feedback-analytics/
├── amplify-feedback.js          # Main feedback system
├── feedback-to-amplify.js      # Advanced API integration
└── QUICK_INTEGRATION.md        # Integration guide

admin/
└── feedback-dashboard.html     # Admin dashboard

amplify/backend/                 # AWS backend configuration
├── api/feedback/               # API Gateway setup
└── function/feedbackHandler/   # Lambda function
```

## 🚀 Quick Start

### Step 1: Update Your Demo Pages

Replace the old Netlify script with the new Amplify script:

```html
<!-- OLD (Remove this) -->
<script src="../tools/feedback-analytics/feedback-to-netlify.js"></script>

<!-- NEW (Add this) -->
<script src="../tools/feedback-analytics/amplify-feedback.js"></script>
```

### Step 2: Remove Netlify Forms

Remove these hidden forms from all demo pages:

```html
<!-- Remove this entire block -->
<form name="demo-feedback" method="POST" data-netlify="true" netlify-honeypot="bot-field" style="display: none;">
    <input name="bot-field" />
    <input type="hidden" name="form-name" value="demo-feedback" />
</form>
```

### Step 3: Test the System

1. Visit any demo page
2. Click any feedback button
3. Check browser console for confirmation
4. Open admin dashboard to view data

## 📊 Admin Dashboard

Access your feedback dashboard at: `/admin/feedback-dashboard.html`

### Features:
- **Real-time Statistics**: Total feedback, sessions, pages tracked
- **Search & Filter**: Find specific feedback by type, page, or content
- **Data Export**: Download JSON or CSV files
- **Auto-refresh**: Updates every 30 seconds
- **Responsive Design**: Works on all devices

### Dashboard Access:
```
https://your-amplify-domain.com/admin/feedback-dashboard.html
```

## 🔍 Data Collection Details

### What Gets Collected:

1. **Feedback Interactions**
   - Button clicks and responses
   - User selections and preferences
   - Page context and timing

2. **Page Analytics**
   - Page views and navigation
   - Time spent on pages
   - Page visibility changes

3. **User Context**
   - Session identification
   - Device information
   - Browser details

### Data Structure:
```json
{
  "type": "feedback",
  "page": "adaptive-modifications",
  "section": "Real-Time Trial Optimization",
  "step": "Performance Monitoring (3 of 4)",
  "value": "Real-time dashboards",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "sessionId": "session_1705312200000_abc123",
  "userId": "user_1705312200000_def456",
  "timeOnPage": 45,
  "platform": "aws-amplify"
}
```

## 📤 Exporting Data

### Method 1: Admin Dashboard
1. Go to `/admin/feedback-dashboard.html`
2. Use the export buttons (JSON or CSV)
3. Files download automatically

### Method 2: Browser Console
```javascript
// Export as JSON
exportFeedback();

// Export as CSV
exportFeedbackCSV();

// Get all feedback data
retrieveAllFeedback();

// Get statistics
getFeedbackStats();
```

### Method 3: Programmatic Access
```javascript
// Access the feedback system
const feedback = window.adjuvantiqFeedback;

// Get all data
const allData = feedback.getAllFeedback();

// Get statistics
const stats = feedback.getFeedbackStats();
```

## 🛠️ Advanced Configuration

### Custom Endpoints (Optional)

If you want to send data to external services, modify the endpoints in `amplify-feedback.js`:

```javascript
const endpoints = [
    '/api/feedback',                    // Your custom API
    'https://your-api.com/feedback',    // External service
    '/.netlify/functions/feedback'      // Netlify (if you add it later)
];
```

### AWS Lambda Integration (Optional)

For advanced users who want server-side storage:

1. Deploy the Lambda function in `amplify/backend/function/feedbackHandler/`
2. Set up API Gateway endpoint
3. Configure DynamoDB table
4. Update endpoint configuration

## 🔒 Privacy & Security

### Data Storage:
- **Local Only**: Data stays in user's browser
- **No External Transmission**: Unless custom endpoints configured
- **User Consent**: Transparent data collection

### Data Retention:
- **Local Storage**: Up to 200 feedback items per user
- **Session Storage**: Backup storage for reliability
- **Manual Export**: Users can export their own data

## 🚨 Troubleshooting

### Common Issues:

1. **No Feedback Data**
   - Check browser console for errors
   - Ensure script is loaded correctly
   - Verify feedback buttons have `onclick="giveFeedback(this, 'type')"`

2. **Script Not Loading**
   - Check file path in script tag
   - Verify file exists in correct location
   - Check browser console for 404 errors

3. **Data Not Persisting**
   - Check localStorage is enabled
   - Verify browser supports localStorage
   - Check for storage quota exceeded

### Debug Mode:
```javascript
// Enable debug logging
localStorage.setItem('adjuvantiq_debug', 'true');

// Check system status
console.log(window.adjuvantiqFeedback);
```

## 📈 Analytics & Insights

### What You Can Track:

1. **User Engagement**
   - Most popular feedback types
   - Page completion rates
   - Time spent on different sections

2. **Content Performance**
   - Which demo pages get most interaction
   - Common user questions or concerns
   - Areas needing improvement

3. **User Behavior**
   - Session duration patterns
   - Navigation flows
   - Device and browser usage

## 🔄 Migration from Netlify

### What to Remove:
- `data-netlify="true"` attributes
- Hidden Netlify forms
- `feedback-to-netlify.js` script references

### What to Keep:
- All feedback buttons and functionality
- Existing CSS and styling
- Page structure and content

### What's New:
- `amplify-feedback.js` script
- Local data storage
- Admin dashboard access
- Export capabilities

## 🎯 Next Steps

1. **Update All Demo Pages**: Replace scripts and remove forms
2. **Test the System**: Visit pages and click feedback buttons
3. **Access Dashboard**: View collected data at `/admin/feedback-dashboard.html`
4. **Export Data**: Download feedback for analysis
5. **Customize**: Modify endpoints or add custom functionality

## 📞 Support

If you encounter any issues:

1. Check browser console for error messages
2. Verify all files are in correct locations
3. Test with a simple feedback button
4. Check localStorage is working in your browser

## 🎉 Benefits

- **No External Dependencies**: Works completely offline
- **Instant Setup**: No configuration or API keys needed
- **Full Control**: All data stays within your system
- **Rich Analytics**: Comprehensive user interaction tracking
- **Easy Export**: Simple data extraction for analysis
- **AWS Amplify Ready**: Optimized for your hosting platform

---

**Ready to collect feedback?** Update your demo pages and start gathering insights from your users! 🚀
