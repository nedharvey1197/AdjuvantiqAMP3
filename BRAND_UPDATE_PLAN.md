# AdjuvantIQ Brand Update Plan

## Overview
This document outlines the comprehensive plan to update the entire AdjuvantIQ website to align with the new brand guidelines (V1.0). The update focuses on implementing the approved color palette, typography, and design elements across all pages and components.

## Brand Guidelines Summary

### ✅ **Approved Brand Elements:**
- **Primary Colors**: Navy (#2c5282) and Teal (#2d7d7d)
- **Typography**: Source Sans Pro (headers) and Merriweather (body)
- **Voice**: Authoritative but approachable, technical precision with accessible language
- **Archetype**: The Sage (wisdom, knowledge, trusted advisor)

### ❌ **Current Issues Identified:**
1. Demo pages using old color schemes and Inter font
2. Section styling using non-brand colors (red, cyan, green)
3. Inconsistent button and form styling
4. Missing brand-compliant iconography
5. Data visualizations not using brand colors

## Update Progress

### ✅ **COMPLETED - Phase 1: Main Page Updates**

#### **CSS Variables & Core Styling**
- [x] Implemented brand color variables (navy, teal, warm-gray)
- [x] Updated typography to Source Sans Pro + Merriweather
- [x] Standardized color usage across components

#### **Section Updates**
- [x] **Problem Section**: Updated from red (#ff6b6b) to teal
- [x] **Solution Section**: Updated from cyan (#00d4ff) to teal
- [x] **Platform Section**: Updated from green (#2ecc71) to teal
- [x] **Strategy Section**: Updated stack visual colors
- [x] **Team Section**: Updated photo backgrounds to brand gradient
- [x] **CTA Section**: Updated from orange (#f39c12) to brand colors
- [x] **Divider Elements**: Updated from red to teal

#### **Component Updates**
- [x] Button styles standardized with brand colors
- [x] Form styling updated with brand palette
- [x] Card hover effects using brand colors
- [x] Progress bars and interactive elements updated

### ✅ **COMPLETED - Phase 2: Demo Pages (Partial)**

#### **Demo Hub Page**
- [x] Updated typography to brand fonts
- [x] Implemented brand color palette
- [x] Updated button and link styling
- [x] Updated card headers and credibility section

#### **Individual Demo Pages (Started)**
- [x] **Protocol Design Page**: Updated with brand styling
- [ ] **Site Selection Page**: Needs update
- [ ] **Cardiovascular Page**: Needs update
- [ ] **Oncology Page**: Needs update
- [ ] **Regulatory Strategy Page**: Needs update
- [ ] **Workflow Page**: Needs update

### ❌ **PENDING - Phase 3: Content & Assets**

#### **Content Updates**
- [ ] Review and update content to match brand voice
- [ ] Update JSON content files for consistency
- [ ] Implement brand-compliant messaging

#### **Asset Updates**
- [ ] Implement brand iconography set
- [ ] Update data visualizations with brand colors
- [ ] Optimize images for brand consistency
- [ ] Update favicon and logo usage

### ❌ **PENDING - Phase 4: Final Polish**

#### **Testing & Optimization**
- [ ] Cross-browser compatibility testing
- [ ] Mobile responsiveness verification
- [ ] Performance optimization
- [ ] SEO updates for brand consistency

## Immediate Next Steps

### **Priority 1: Complete Demo Pages (1-2 hours)**
```bash
# Update remaining demo pages with brand styling
demo/site-selection.html
demo/cardiovascular.html
demo/oncology.html
demo/regulatory-strategy.html
demo/workflow.html
```

### **Priority 2: Content Review (2-3 hours)**
- Review all content files in `/content/` directory
- Update messaging to align with brand voice
- Ensure consistency across all pages

### **Priority 3: Asset Implementation (1-2 hours)**
- Implement brand iconography
- Update data visualizations
- Optimize images and graphics

## Technical Implementation Notes

### **CSS Variables Used:**
```css
:root {
    --navy: #2c5282;
    --teal: #2d7d7d;
    --white: #ffffff;
    --warm-gray: #718096;
    --light-gray: rgba(113, 128, 150, 0.1);
}
```

### **Typography Implementation:**
```css
h1, h2, h3, h4, h5, h6 {
    font-family: 'Source Sans Pro', sans-serif;
    color: var(--navy);
}

body {
    font-family: 'Merriweather', serif;
}
```

### **Gradient Patterns:**
```css
/* Primary gradient */
background: linear-gradient(135deg, var(--navy) 0%, var(--teal) 100%);

/* Button gradient */
background: linear-gradient(135deg, var(--teal), var(--navy));
```

## Quality Assurance Checklist

### **Visual Consistency**
- [ ] All pages use brand color palette
- [ ] Typography consistent across site
- [ ] Button styles standardized
- [ ] Hover effects use brand colors
- [ ] Form styling aligned with brand

### **Content Alignment**
- [ ] Voice matches brand guidelines
- [ ] Messaging is authoritative but approachable
- [ ] Technical precision with accessible language
- [ ] Consistent terminology usage

### **Technical Standards**
- [ ] CSS variables properly implemented
- [ ] Responsive design maintained
- [ ] Performance optimized
- [ ] Cross-browser compatibility

## Estimated Completion Time

- **Phase 1**: ✅ COMPLETED (2 hours)
- **Phase 2**: 80% COMPLETE (1 hour remaining)
- **Phase 3**: PENDING (3-4 hours)
- **Phase 4**: PENDING (2-3 hours)

**Total Remaining Time**: 6-8 hours

## Success Metrics

1. **Visual Consistency**: 100% brand color compliance
2. **Typography**: 100% brand font usage
3. **Content Voice**: Aligned with brand guidelines
4. **User Experience**: Maintained or improved
5. **Performance**: No degradation in load times

---

*Last Updated: [Current Date]*
*Status: Phase 1 Complete, Phase 2 In Progress* 