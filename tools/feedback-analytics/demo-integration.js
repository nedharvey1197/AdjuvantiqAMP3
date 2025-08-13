/**
 * Demo Integration Script for AdjuvantIQ Feedback System
 * 
 * This script automatically integrates existing demo pages with the new
 * session-based feedback tracking system. Simply include this script
 * after the session-tracker.js to enable automatic feedback collection.
 */

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeIntegration);
    } else {
        initializeIntegration();
    }
    
    function initializeIntegration() {
        console.log('AdjuvantIQ Feedback Integration: Initializing...');
        
        // Connect existing feedback buttons to session tracker
        connectFeedbackButtons();
        
        // Track existing interactive elements
        trackInteractiveElements();
        
        // Add analytics dashboard link if not present
        addAnalyticsLink();
        
        console.log('AdjuvantIQ Feedback Integration: Complete');
    }
    
    /**
     * Connect existing feedback buttons to the session tracker
     */
    function connectFeedbackButtons() {
        const feedbackButtons = document.querySelectorAll('.feedback-button');
        
        if (feedbackButtons.length === 0) {
            console.log('No feedback buttons found on this page');
            return;
        }
        
        console.log(`Found ${feedbackButtons.length} feedback buttons`);
        
        feedbackButtons.forEach((button, index) => {
            // Remove any existing onclick handlers
            button.removeAttribute('onclick');
            
            // Add data-feedback-type if not present
            if (!button.dataset.feedbackType) {
                button.dataset.feedbackType = `feedback-${index + 1}`;
            }
            
            // Add click event listener
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const feedbackType = this.dataset.feedbackType;
                const buttonText = this.textContent.trim();
                
                // Track feedback using session tracker
                if (window.sessionTracker) {
                    window.sessionTracker.trackMicroFeedback(feedbackType, {
                        elementText: buttonText,
                        elementClass: this.className,
                        pageSection: getPageSection(this),
                        page: window.location.pathname
                    });
                }
                
                // Show visual feedback
                showFeedbackConfirmation(this, buttonText);
                
                // Log to console for debugging
                console.log('Feedback collected:', {
                    type: feedbackType,
                    text: buttonText,
                    page: window.location.pathname,
                    timestamp: new Date().toISOString()
                });
            });
        });
    }
    
    /**
     * Track existing interactive elements
     */
    function trackInteractiveElements() {
        if (!window.sessionTracker) {
            return;
        }
        
        // Track reasoning box interactions
        const reasoningBoxes = document.querySelectorAll('.reasoning-box, .collapsible-section');
        reasoningBoxes.forEach(box => {
            if (box.addEventListener) {
                box.addEventListener('click', function() {
                    window.sessionTracker.trackInteraction('content_expand', {
                        element: this.textContent.trim().substring(0, 50),
                        type: this.className,
                        pageSection: getPageSection(this)
                    });
                });
            }
        });
        
        // Track CTA button clicks
        const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary, .btn-secondary');
        ctaButtons.forEach(button => {
            if (button.addEventListener) {
                button.addEventListener('click', function() {
                    window.sessionTracker.trackInteraction('button_click', {
                        element: this.textContent.trim(),
                        class: this.className,
                        href: this.href || null,
                        pageSection: getPageSection(this)
                    });
                });
            }
        });
    }
    
    /**
     * Add analytics dashboard link if not present
     */
    function addAnalyticsLink() {
        // Check if analytics link already exists
        if (document.querySelector('.analytics-dashboard-link')) {
            return;
        }
        
        // Create analytics link
        const analyticsLink = document.createElement('div');
        analyticsLink.className = 'analytics-dashboard-link';
        analyticsLink.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            background: rgba(44, 82, 130, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-family: 'Source Sans Pro', sans-serif;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        analyticsLink.innerHTML = '📊 Analytics';
        analyticsLink.title = 'View Feedback Analytics Dashboard';
        
        // Add hover effect
        analyticsLink.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(44, 82, 130, 1)';
            this.style.transform = 'scale(1.05)';
        });
        
        analyticsLink.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(44, 82, 130, 0.9)';
            this.style.transform = 'scale(1)';
        });
        
        // Add click handler
        analyticsLink.addEventListener('click', function() {
            const dashboardUrl = '../tools/feedback-analytics/analytics-dashboard.html';
            window.open(dashboardUrl, '_blank');
        });
        
        // Add to page
        document.body.appendChild(analyticsLink);
    }
    
    /**
     * Show feedback confirmation
     */
    function showFeedbackConfirmation(button, feedbackText) {
        // Create confirmation element
        const confirmation = document.createElement('div');
        confirmation.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        confirmation.textContent = `✓ ${feedbackText} recorded`;
        document.body.appendChild(confirmation);
        
        // Show confirmation
        setTimeout(() => {
            confirmation.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide after 3 seconds
        setTimeout(() => {
            confirmation.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (confirmation.parentNode) {
                    confirmation.parentNode.removeChild(confirmation);
                }
            }, 300);
        }, 3000);
        
        // Visual feedback on button
        const originalText = button.textContent;
        const originalBackground = button.style.background;
        
        button.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
        button.textContent = '✓ Thank you!';
        button.disabled = true;
        
        // Reset button after delay
        setTimeout(() => {
            button.style.background = originalBackground;
            button.textContent = originalText;
            button.disabled = false;
        }, 3000);
    }
    
    /**
     * Determine which section of the page an element is in
     */
    function getPageSection(element) {
        const sections = ['hero', 'problem', 'solution', 'strategy', 'platform', 'team', 'pilot'];
        
        for (const section of sections) {
            if (element.closest(`#${section}, .${section}`)) {
                return section;
            }
        }
        
        // Try to find section from nearby headings
        const nearbyHeading = element.closest('div').querySelector('h1, h2, h3, h4, h5, h6');
        if (nearbyHeading) {
            return nearbyHeading.textContent.trim().toLowerCase().replace(/\s+/g, '-');
        }
        
        return 'unknown';
    }
    
    /**
     * Check if session tracker is available
     */
    function checkSessionTracker() {
        if (!window.sessionTracker) {
            console.warn('AdjuvantIQ Feedback Integration: Session tracker not found. Make sure session-tracker.js is loaded first.');
            return false;
        }
        return true;
    }
    
    // Expose integration functions globally for manual use
    window.AdjuvantIQFeedback = {
        connectFeedbackButtons,
        trackInteractiveElements,
        addAnalyticsLink,
        checkSessionTracker
    };
    
})();
