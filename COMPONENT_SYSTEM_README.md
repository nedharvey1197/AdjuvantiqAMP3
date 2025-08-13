# AdjuvantIQ Brand-Integrated Component System

## Overview

This document describes the brand-integrated component centralization system implemented for the AdjuvantIQ website. The system provides a unified approach to managing demo page components through the CMS, ensuring consistent branding and user experience across all demo pages.

## Architecture

### Technology Stack
- **Frontend**: Static HTML/CSS/JavaScript
- **CMS**: Netlify CMS (Git-based)
- **Build Process**: Node.js site generation
- **Component Management**: Centralized through `content/branding.json`

### File Structure
```
AsdjuvanIQ_AMP3/
├── content/
│   └── branding.json (central component definitions)
├── tools/cms-integration/
│   └── site-generator.js (component generation logic)
├── admin/
│   └── config.yml (CMS component fields)
└── demo/ (6 demo pages with centralized components)
    ├── cardiovascular.html
    ├── oncology.html
    ├── protocol-design.html
    ├── site-selection.html
    ├── regulatory-strategy.html
    └── adaptive-modifications.html
```

## Component Types

### 1. AI Reasoning Boxes
Interactive expandable sections that reveal AI reasoning behind demo decisions.

**Features:**
- Expandable/collapsible content
- Brand-compliant styling
- Accessibility support
- Hover effects and animations

**CMS Configuration:**
```json
{
  "reasoning_boxes": {
    "background": "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
    "border": "2px solid #2d7d7d",
    "border_radius": "12px",
    "padding": "2rem",
    "margin": "1.5rem 0",
    "box_shadow": "0 4px 6px rgba(0, 0, 0, 0.1)",
    "transition": "all 0.3s ease",
    "expand_icon": "▼",
    "expand_icon_color": "#2d7d7d",
    "expand_icon_size": "1.2rem"
  }
}
```

### 2. Feedback System
User feedback collection components with visual appeal and data tracking.

**Features:**
- Multiple feedback options
- Visual feedback animations
- Local storage data collection
- Toast notifications

**CMS Configuration:**
```json
{
  "feedback_system": {
    "background": "linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)",
    "border": "2px solid #38b2ac",
    "border_radius": "12px",
    "padding": "2rem",
    "margin": "2rem 0",
    "animation": "pulse 2s infinite",
    "box_shadow": "0 4px 12px rgba(56, 178, 172, 0.2)"
  }
}
```

### 3. Collapsible Sections
Expandable content sections for team members, phases, and detailed information.

**Features:**
- Smooth expand/collapse animations
- Keyboard navigation support
- Screen reader accessibility
- Brand-consistent styling

**CMS Configuration:**
```json
{
  "collapsible_sections": {
    "background": "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
    "border": "1px solid #e2e8f0",
    "border_radius": "8px",
    "padding": "1.5rem",
    "margin": "1rem 0",
    "box_shadow": "0 2px 4px rgba(0, 0, 0, 0.1)",
    "transition": "all 0.3s ease"
  }
}
```

### 4. Micro Feedback
Compact feedback components for quick user input.

**Features:**
- Minimal footprint
- Quick interaction
- Visual feedback
- Data collection

## Brand Integration

### Color Palette
- **Primary Navy**: #2c5282 (Headers, icons, CTAs)
- **Professional Teal**: #2d7d7d (Accent, charts, highlights)
- **Bright White**: #ffffff (Background, contrast)
- **Warm Gray**: #718096 (Text, gridlines)

### Typography
- **Headers**: Source Sans Pro (Regular/Semi-Bold/Bold)
- **Body Text**: Merriweather (Regular/Medium)
- **Captions**: Source Sans Pro (Regular)

### Component Styling
All components automatically inherit brand colors, typography, and styling through CSS custom properties and the centralized branding configuration.

## CMS Management

### Accessing Component Settings
1. Navigate to `/admin` on the website
2. Select "Demo Components" from the sidebar
3. Modify component styling, animations, and accessibility settings
4. Save changes to trigger automatic rebuild

### Available Settings
- **Visual Styling**: Backgrounds, borders, shadows, spacing
- **Animations**: Keyframes, transitions, hover effects
- **Accessibility**: Screen reader labels, focus states
- **Typography**: Font families, weights, sizes, colors

## Build Process

### Automatic Generation
1. CMS changes → GitHub commits
2. GitHub pushes → AWS Amplify triggers build
3. `npm run generate-site` → `site-generator.js` runs
4. Component CSS and JavaScript generated from CMS data
5. All demo pages updated with new component styling
6. Live site deployed

### Manual Generation
```bash
cd tools/cms-integration
node site-generator.js generate
```

## JavaScript Architecture

### DemoComponentManager Class
Centralized component management with the following capabilities:

```javascript
class DemoComponentManager {
  constructor(brandingData) {
    this.branding = brandingData;
    this.initComponents();
  }
  
  initComponents() {
    this.initReasoningBoxes();
    this.initFeedbackSystem();
    this.initCollapsibleSections();
    this.initAccessibility();
  }
  
  // Component-specific initialization methods
  // Event handling and interaction logic
  // Accessibility features
}
```

### Global Functions
Backward compatibility functions for existing demo pages:
- `toggleReasoning(element)`
- `toggleCollapsible(element)`
- `giveFeedback(button, feedbackType)`
- `showToast(message)`

## Accessibility Features

### Screen Reader Support
- ARIA labels for all interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Focus management

### Focus States
- Visible focus indicators
- Consistent focus styling
- Keyboard-only navigation support

### WCAG Compliance
- Color contrast ratios
- Text sizing and spacing
- Interactive element sizing
- Error handling and feedback

## Data Collection

### Feedback Tracking
- User feedback stored in localStorage
- Anonymous data collection
- Timestamp and page tracking
- User agent information

### Analytics Integration
- Component interaction tracking
- User engagement metrics
- Performance monitoring
- Error logging

## Customization

### Adding New Components
1. Define component structure in `content/branding.json`
2. Add CMS fields in `admin/config.yml`
3. Implement generation logic in `site-generator.js`
4. Add JavaScript functionality to `DemoComponentManager`

### Component Templates
```html
<!-- AI Reasoning Box -->
<div class="reasoning-box" onclick="toggleReasoning(this)" role="button" tabindex="0">
  <div class="reasoning-header">
    <span>🔧 <strong>AI REASONING</strong>: [Title]</span>
    <span class="expand-icon">▼</span>
  </div>
  <div class="reasoning-content">
    [Content]
  </div>
</div>

<!-- Feedback Section -->
<div class="feedback-section" role="region">
  <h3 class="feedback-title">[Title]</h3>
  <div class="feedback-buttons">
    [Buttons]
  </div>
</div>

<!-- Collapsible Section -->
<div class="collapsible-section" role="region">
  <div class="collapsible-header" onclick="toggleCollapsible(this)" role="button" tabindex="0">
    <span>[Title]</span>
    <button class="expand-toggle" aria-label="Expand section">+</button>
  </div>
  <div class="collapsible-content">
    [Content]
  </div>
</div>
```

## Performance Considerations

### CSS Optimization
- Generated CSS is minified
- Unused styles are not included
- Critical CSS is inlined
- Non-critical CSS is loaded asynchronously

### JavaScript Optimization
- Component manager is loaded once
- Event delegation for dynamic content
- Lazy loading for non-critical features
- Memory leak prevention

### Build Optimization
- Incremental builds for component changes
- Asset optimization and compression
- Cache busting for updated components
- CDN integration for static assets

## Troubleshooting

### Common Issues
1. **Components not updating**: Check CMS configuration and rebuild
2. **Styling inconsistencies**: Verify brand color values in CMS
3. **JavaScript errors**: Check browser console for component manager errors
4. **Accessibility issues**: Validate ARIA labels and keyboard navigation

### Debug Mode
Enable debug logging by setting `window.DEBUG_COMPONENTS = true` in browser console.

### Component Inspector
Use browser dev tools to inspect component structure and styling:
- CSS custom properties for dynamic values
- Generated class names for component identification
- Event listeners for interaction debugging

## Future Enhancements

### Planned Features
- Component versioning and rollback
- A/B testing for component variations
- Advanced animation controls
- Component performance metrics
- Multi-language support
- Dark mode theming

### Integration Opportunities
- Analytics platform integration
- User behavior tracking
- Personalization engine
- Content recommendation system
- Advanced feedback analysis

## Support

For questions or issues with the component system:
1. Check this documentation
2. Review CMS configuration
3. Inspect browser console for errors
4. Contact the development team

---

*This component system ensures consistent branding and user experience across all AdjuvantIQ demo pages while providing flexible CMS management capabilities.*
