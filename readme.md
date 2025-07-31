# AdjuvantIQ Website

**The Operating System for Trial Cognition** - Official website for AdjuvantIQ's agentic AI platform for clinical trial design and execution.

## 🚀 Live Website
- **Production:** https://adjuvantiq.com
- **Staging:** https://dev.adjuvantiq.com (AWS Amplify branch)

## 📋 Project Overview

Professional marketing website showcasing AdjuvantIQ's AI-powered clinical trial platform. Built to convert biotech sponsors into pilot program participants through compelling storytelling and streamlined lead capture.

### Key Features
- ✅ **Responsive Design** - Perfect on mobile, tablet, and desktop
- ✅ **High-Converting Form** - Pilot program signup with smart validation
- ✅ **Professional Animations** - Smooth scrolling and fade-in effects
- ✅ **SEO Optimized** - Meta tags, semantic HTML, fast loading
- ✅ **Analytics Ready** - Google Analytics integration
- ✅ **Form Handling** - AWS Amplify built-in form processing

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Hosting:** AWS Amplify
- **Forms:** Amplify native form handling
- **Domain:** Route 53 DNS management
- **SSL:** AWS Certificate Manager
- **CDN:** CloudFront (via Amplify)

## 📁 Project Structure

```
adjuvantiq-website/
├── index.html          # Main website file
├── amplify.yml          # AWS Amplify build configuration
├── README.md           # This file
└── .gitignore          # Git ignore patterns
```

## 🚀 Quick Start

### Prerequisites
- Git installed
- GitHub account
- AWS account with Amplify access

### Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/adjuvantiq-website.git
cd adjuvantiq-website

# Open in browser
open index.html
# or use a local server
python -m http.server 8000
# Navigate to http://localhost:8000
```

### Deployment

#### Option 1: AWS Amplify (Recommended)
1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial website deployment"
   git push origin main
   ```

2. **Connect to Amplify:**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Connect GitHub repository
   - Select `main` branch
   - Deploy automatically

3. **Configure Custom Domain:**
   - In Amplify console → "Domain management"
   - Add domain: `adjuvantiq.com`
   - Configure DNS in Route 53

#### Option 2: Direct Upload
Upload `index.html` to any web hosting service (Netlify, Vercel, etc.)

## 📊 Form Handling

### Built-in Amplify Forms
The contact form uses Amplify's native form handling:

```html
<form name="pilot-signup" method="POST" data-netlify="true">
```

### Accessing Form Submissions
1. **Amplify Console:** App Settings → Forms
2. **Email Notifications:** Enable in Forms settings
3. **CSV Export:** Download submissions for CRM import
4. **Webhooks:** Configure for real-time processing

### Form Fields Captured
- Full Name (required)
- Email Address (required)
- Company (required)
- Job Title
- Primary Interest (pilot/demo/investment/partnership)
- Timeline for Clinical Trials
- Clinical Development Challenges (textarea)

## 🎨 Design System

### Color Palette
```css
--primary-blue: #00d4ff
--secondary-blue: #0099cc
--dark-blue: #0a1128
--accent-orange: #f39c12
--success-green: #2ecc71
--warning-red: #e74c3c
```

### Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:** 700 weight
- **Body:** 400 weight
- **Captions:** 300 weight

### Responsive Breakpoints
```css
/* Mobile First */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }
```

## 📈 Analytics & Tracking

### Google Analytics Setup
```html
<!-- Add to <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Key Events to Track
- `pilot_signup` - Form submissions
- `demo_request` - Demo button clicks
- `email_click` - Email link clicks
- `scroll_depth` - Page engagement

## 🔧 Configuration Files

### amplify.yml
```yaml
version: 1
frontend:
  phases:
    build:
      commands:
        - echo "Building static site"
  artifacts:
    baseDirectory: /
    files:
      - '**/*'
```

### .gitignore
```
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment variables
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
```

## 🎯 Business Metrics

### Target Conversion Rates
- **Traffic → Pilot Signup:** 3-5%
- **Form Completion Rate:** 80%+
- **Mobile Conversion:** 2-4%
- **Page Load Time:** <2 seconds

### Lead Quality Scoring
- **Hot Lead:** Immediate timeline + known company
- **Warm Lead:** 3-6 month timeline + biotech/pharma
- **Cold Lead:** Planning phase + unknown company

## 🛡️ Security & Performance

### Security Headers
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### Performance Optimizations
- ✅ **Minified CSS/JS** - Inline for fastest loading
- ✅ **Optimized Images** - WebP format with fallbacks
- ✅ **Lazy Loading** - Intersection Observer for animations
- ✅ **Preload Fonts** - Google Fonts optimization
- ✅ **CDN Delivery** - Global edge locations via Amplify

## 📞 Support & Maintenance

### Content Updates
- **Forms:** Modify in `index.html` and redeploy
- **Copy Changes:** Edit HTML directly
- **Styling:** Update CSS in `<style>` section
- **Analytics:** Add tracking in `<script>` section

### Monitoring
- **Uptime:** AWS Amplify health dashboard
- **Performance:** Google PageSpeed Insights
- **Forms:** Amplify console submissions
- **Analytics:** Google Analytics dashboard

### Emergency Contacts
- **Technical Issues:** Ned Harvey (ned@adjuvantiq.com)
- **Content Updates:** Doug Henston (doug@adjuvantiq.com)
- **Form Problems:** pilot@adjuvantiq.com

## 🔄 Deployment Pipeline

### Branch Strategy
```
main        → Production (adjuvantiq.com)
staging     → Staging (dev.adjuvantiq.com)
feature/*   → Preview deployments
```

### Deployment Process
1. **Develop locally** with live preview
2. **Push to feature branch** for testing
3. **Merge to staging** for stakeholder review
4. **Merge to main** for production deployment
5. **Automatic deployment** via Amplify

## 📋 Roadmap

### Phase 1: Launch (Week 1)
- [x] Core website development
- [x] Form integration
- [x] AWS Amplify deployment
- [x] Custom domain setup
- [ ] Google Analytics integration
- [ ] Email notification testing

### Phase 2: Optimization (Month 1)
- [ ] A/B testing framework
- [ ] Advanced form analytics
- [ ] CRM integration (HubSpot/Salesforce)
- [ ] Auto-response email sequences
- [ ] Landing page variations

### Phase 3: Enhancement (Month 2-3)
- [ ] Blog/content section
- [ ] Customer testimonials
- [ ] Interactive demo booking
- [ ] Webinar registration
- [ ] Investor portal

## 🤝 Contributing

### Making Changes
1. Create feature branch from `main`
2. Make changes locally
3. Test thoroughly
4. Submit pull request
5. Review and merge

### Code Style
- **HTML:** Semantic markup, proper indentation
- **CSS:** BEM methodology, mobile-first
- **JavaScript:** ES6+, vanilla JS preferred
- **Comments:** Explain complex logic

## 📚 Resources

### Documentation
- [AWS Amplify Docs](https://docs.amplify.aws/)
- [HTML5 Semantic Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Google Analytics Setup](https://support.google.com/analytics/answer/9304153)

### Design Inspiration
- [Mission Transcend](https://missiontranscend.ai/) - Design reference
- [Stripe](https://stripe.com/) - Professional SaaS design
- [Linear](https://linear.app/) - Modern B2B aesthetics

---

## 📄 License

© 2024 AdjuvantIQ. All rights reserved.

**Confidential and Proprietary** - This website and its content are the intellectual property of AdjuvantIQ and contain confidential business information.

---

## 📞 Contact

**AdjuvantIQ**
- 🌐 Website: https://adjuvantiq.com
- 📧 General: info@adjuvantiq.com
- 🚀 Pilot Program: pilot@adjuvantiq.com
- 💰 Investment: invest@adjuvantiq.com
- 📞 Phone: +1 303-885-7143

**Development Team**
- Ned Harvey - Head of Product (ned@adjuvantiq.com)
- Doug Henston - CEO (doug@adjuvantiq.com)

---

*"Unlocking Billions in Lost Drug Development Value – One Trial at a Time"*