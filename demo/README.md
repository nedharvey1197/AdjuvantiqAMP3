# AdjuvantIQ Interactive Demo System

## Overview

This demo system provides interactive demonstrations of AdjuvantIQ's AI-assisted clinical trial optimization capabilities. The system includes multiple scenario-based demos with integrated feedback collection.

## File Structure

```
demo/
├── index.html              # Demo hub landing page
├── cardiovascular.html     # 🎯 PRIMARY DEMO: End-to-End Trial Optimization
├── protocol-design.html    # Phase 1: Protocol Design & Optimization
├── site-selection.html     # Phase 2: Site Selection & Portfolio Optimization
├── adaptive-modifications.html # Phase 3: Adaptive Trial Management
├── regulatory-strategy.html # Phase 4: Regulatory Strategy & Submission
├── oncology.html           # Oncology biomarker trial analysis demo
├── feedback-handler.js    # Feedback collection system
└── README.md              # This file
```

## Implementation Options

### Option 1: Subdirectory Integration (CURRENT IMPLEMENTATION)

**URL Structure:**
- Main site: `yourdomain.com/`
- Demo hub: `yourdomain.com/demo/`
- Individual demos: `yourdomain.com/demo/oncology.html`

**Pros:**
- Simple to implement
- No additional AWS configuration needed
- Seamless integration with existing site
- Easy to maintain and update

**Cons:**
- No user authentication
- Limited analytics separation
- Same domain for all content

### Option 2: Subdomain Setup

**URL Structure:**
- Main site: `yourdomain.com/`
- Demo site: `demo.yourdomain.com/`

**Implementation:**
1. Create new Amplify app for demo subdomain
2. Configure custom domain in Amplify
3. Set up separate analytics and feedback collection

**Pros:**
- Separate analytics and tracking
- Can implement different authentication
- Clean separation of concerns
- Independent deployment cycles

**Cons:**
- More complex setup
- Additional AWS costs
- Cross-domain navigation challenges

### Option 3: Authentication-Gated Demo

**Implementation:**
1. Add AWS Cognito authentication
2. Gate demo access behind login
3. Collect user information with feedback

**Pros:**
- User identification for feedback
- Lead generation
- Controlled access
- Better analytics

**Cons:**
- Friction for demo access
- More complex implementation
- Potential barrier to adoption

## Feedback Collection System

### Current Implementation

The `feedback-handler.js` provides:

1. **Session Tracking:**
   - Session ID generation
   - Page load times
   - Scroll depth tracking
   - Time on page

2. **Feedback Collection:**
   - Button click responses
   - Engagement actions
   - Contextual data capture

3. **Data Storage:**
   - Local storage for offline collection
   - Console logging for development
   - Extensible backend integration

### Backend Integration Options

#### Option A: AWS Lambda + API Gateway

```javascript
// Configure in your demo pages
window.FEEDBACK_ENDPOINT = 'https://your-api-gateway-url.amazonaws.com/feedback';
window.SESSION_ENDPOINT = 'https://your-api-gateway-url.amazonaws.com/session';
```

**Lambda Function Example:**
```python
import json
import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('adjuvantiq-feedback')

def lambda_handler(event, context):
    feedback_data = json.loads(event['body'])
    
    # Store in DynamoDB
    table.put_item(Item={
        'sessionId': feedback_data['sessionId'],
        'timestamp': datetime.now().isoformat(),
        'feedback': feedback_data['feedback']
    })
    
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Feedback stored successfully'})
    }
```

#### Option B: AWS Amplify Analytics

```javascript
import { Analytics } from 'aws-amplify';

// Track custom events
Analytics.record({
    name: 'DemoFeedback',
    attributes: {
        sessionId: sessionId,
        feedbackType: type,
        feedbackValue: value
    }
});
```

#### Option C: Simple Email Collection

```javascript
// Send feedback via email (for development/testing)
function sendFeedbackEmail(feedback) {
    const mailto = `mailto:feedback@adjuvantiq.com?subject=Demo Feedback&body=${encodeURIComponent(JSON.stringify(feedback, null, 2))}`;
    window.open(mailto);
}
```

## Deployment Instructions

### Current Setup (Subdirectory)

1. **Files are already in place** in the `demo/` directory
2. **Main site integration** is complete with navigation link
3. **No additional configuration** needed for basic functionality

### Testing the Implementation

1. **Local Testing:**
   ```bash
   # Serve the site locally
   python -m http.server 8000
   # Visit http://localhost:8000/demo/
   ```

2. **Amplify Deployment:**
   - Push changes to your repository
   - Amplify will automatically deploy the demo pages
   - Visit `yourdomain.com/demo/`

### Analytics Setup

1. **Google Analytics:**
   ```html
   <!-- Add to demo pages -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

2. **AWS Amplify Analytics:**
   ```bash
   # Install Amplify CLI
   npm install -g @aws-amplify/cli
   
   # Initialize analytics
   amplify add analytics
   amplify push
   ```

## Content Management

### Adding New Demos

1. **Create new HTML file** in `demo/` directory
2. **Follow existing structure** from `oncology.html`
3. **Add to demo hub** in `demo/index.html`
4. **Include feedback collection** using `feedback-handler.js`

### Updating Content

1. **Edit HTML files** directly
2. **Update JSON content** if using template system
3. **Test locally** before pushing
4. **Deploy via Amplify** automatically

## Security Considerations

### Current Implementation (No Auth)

**Pros:**
- Easy access for prospects
- No friction to demo experience
- Simple deployment

**Cons:**
- No user identification
- Limited lead capture
- Anonymous feedback only

### Recommended Enhancements

1. **Optional Registration:**
   - Allow anonymous access
   - Offer registration for detailed analytics
   - Capture leads without blocking demo

2. **Rate Limiting:**
   - Implement basic rate limiting
   - Prevent spam feedback
   - Monitor for abuse

3. **Data Privacy:**
   - Clear privacy policy
   - GDPR compliance
   - Data retention policies

## Next Steps

### Immediate (Current Implementation)

1. ✅ Demo hub created
2. ✅ Oncology demo implemented
3. ✅ Cardiovascular demo implemented
4. ✅ Workflow demo implemented
5. ✅ Feedback collection system
6. ✅ Main site integration
7. 🔄 Test and refine

### Short Term (Next 2-4 weeks)

1. **Enhance existing demos:**
   - Add more interactive elements
   - Expand feedback collection points
   - Improve mobile responsiveness

2. **Enhance feedback system:**
   - Backend integration
   - Analytics dashboard
   - Lead capture forms

3. **Content optimization:**
   - A/B testing different scenarios
   - User experience improvements
   - Performance optimization

### Long Term (Next 2-3 months)

1. **Advanced features:**
   - User authentication
   - Personalized demos
   - Advanced analytics
   - Integration with CRM

2. **Scalability:**
   - Multi-language support
   - Mobile optimization
   - Performance monitoring
   - CDN integration

## Support and Maintenance

### Regular Tasks

1. **Content Updates:** Monthly review and updates
2. **Analytics Review:** Weekly feedback analysis
3. **Performance Monitoring:** Continuous monitoring
4. **Security Updates:** As needed

### Troubleshooting

1. **Demo not loading:** Check file paths and Amplify deployment
2. **Feedback not collecting:** Check browser console and network
3. **Styling issues:** Verify CSS compatibility
4. **Navigation problems:** Test all links and back buttons

## Contact

For technical support or questions about the demo system:
- Email: tech@adjuvantiq.com
- Documentation: This README and inline code comments
- Repository: Main AdjuvantIQ website repository 