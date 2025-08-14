/**
 * AdjuvantIQ Feedback Analytics System for AWS Amplify
 * Collects user feedback and sends it to a configurable endpoint
 * Compatible with AWS Amplify, Netlify, or any other hosting platform
 */

class AmplifyFeedbackSystem {
    constructor() {
        this.endpoint = this.getFeedbackEndpoint();
        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
        this.initializeSystem();
    }

    /**
     * Get the feedback endpoint based on hosting environment
     */
    getFeedbackEndpoint() {
        // Check if we're on AWS Amplify
        if (window.location.hostname.includes('amplifyapp.com') || 
            window.location.hostname.includes('amplify.aws')) {
            return '/api/feedback'; // AWS Amplify API endpoint
        }
        
        // Check if we're on Netlify
        if (window.location.hostname.includes('netlify.app') || 
            window.location.hostname.includes('netlify.com')) {
            return '/.netlify/functions/feedback'; // Netlify function
        }
        
        // Default to a generic endpoint
        return '/api/feedback';
    }

    /**
     * Generate a unique session ID for tracking
     */
    generateSessionId() {
        let sessionId = localStorage.getItem('adjuvantiq_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('adjuvantiq_session_id', sessionId);
        }
        return sessionId;
    }

    /**
     * Get or generate a user ID
     */
    getUserId() {
        let userId = localStorage.getItem('adjuvantiq_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('adjuvantiq_user_id', userId);
        }
        return userId;
    }

    /**
     * Initialize the feedback system
     */
    initializeSystem() {
        console.log('🚀 AdjuvantIQ Feedback System Initialized');
        console.log('📍 Endpoint:', this.endpoint);
        console.log('🆔 Session ID:', this.sessionId);
        console.log('👤 User ID:', this.userId);
        
        // Set up global feedback function
        window.giveFeedback = this.handleFeedback.bind(this);
        
        // Track page view
        this.trackPageView();
    }

    /**
     * Handle feedback button clicks
     */
    handleFeedback(button, feedbackType) {
        // Visual feedback
        this.showButtonFeedback(button);
        
        // Collect feedback data
        const feedbackData = this.collectFeedbackData(feedbackType, button);
        
        // Send to backend
        this.sendFeedback(feedbackData);
        
        // Store locally as backup
        this.storeFeedbackLocally(feedbackData);
        
        // Show success message
        this.showToast('Thank you for your feedback!');
    }

    /**
     * Show visual feedback on button
     */
    showButtonFeedback(button) {
        const originalText = button.textContent;
        button.setAttribute('data-original-text', originalText);
        
        // Visual changes
        button.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
        button.style.transform = 'scale(1.05)';
        button.textContent = '✓ Thank you!';
        
        // Disable other buttons in the same group
        const siblings = button.parentElement.querySelectorAll('button');
        siblings.forEach(function(btn) {
            if (btn !== button) {
                btn.disabled = true;
                btn.style.opacity = '0.5';
            }
        });
        
        // Reset button after delay
        setTimeout(() => {
            button.style.background = '';
            button.style.transform = '';
            button.textContent = originalText;
            
            // Re-enable siblings
            siblings.forEach(function(btn) {
                if (btn !== button) {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }
            });
        }, 3000);
    }

    /**
     * Collect comprehensive feedback data
     */
    collectFeedbackData(feedbackType, button) {
        const pageInfo = this.getPageInfo();
        const userInfo = this.getUserInfo();
        
        return {
            // Feedback content
            type: feedbackType,
            value: button.textContent,
            buttonText: button.getAttribute('data-original-text') || button.textContent,
            
            // Page context
            page: pageInfo.page,
            section: pageInfo.section,
            step: pageInfo.step,
            url: pageInfo.url,
            
            // User context
            sessionId: this.sessionId,
            userId: this.userId,
            userAgent: navigator.userAgent,
            language: navigator.language,
            
            // Timing
            timestamp: new Date().toISOString(),
            timeOnPage: this.getTimeOnPage(),
            
            // Technical info
            platform: 'aws-amplify',
            version: '1.0.0'
        };
    }

    /**
     * Get current page information
     */
    getPageInfo() {
        const path = window.location.pathname;
        const page = path.split('/').pop()?.replace('.html', '') || 'unknown';
        
        // Try to get current section/step from page content
        let section = 'unknown';
        let step = 'unknown';
        
        // Look for progress indicators
        const progressText = document.getElementById('progressText');
        if (progressText) {
            step = progressText.textContent;
        }
        
        // Look for section headers
        const sectionHeaders = document.querySelectorAll('h2, h3');
        if (sectionHeaders.length > 0) {
            const visibleHeaders = Array.from(sectionHeaders).filter(h => {
                const rect = h.getBoundingClientRect();
                return rect.top < window.innerHeight && rect.bottom > 0;
            });
            if (visibleHeaders.length > 0) {
                section = visibleHeaders[0].textContent;
            }
        }
        
        return {
            page,
            section,
            step,
            url: window.location.href
        };
    }

    /**
     * Get user information
     */
    getUserInfo() {
        return {
            screenSize: `${screen.width}x${screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            referrer: document.referrer,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
    }

    /**
     * Calculate time spent on page
     */
    getTimeOnPage() {
        const startTime = sessionStorage.getItem('page_start_time');
        if (!startTime) {
            sessionStorage.setItem('page_start_time', Date.now().toString());
            return 0;
        }
        return Math.floor((Date.now() - parseInt(startTime)) / 1000);
    }

    /**
     * Send feedback to backend
     */
    async sendFeedback(feedbackData) {
        try {
            // Try to send to configured endpoint
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData)
            });
            
            if (response.ok) {
                console.log('✅ Feedback sent successfully');
                return true;
            } else {
                console.warn('⚠️ Feedback endpoint returned error:', response.status);
                return false;
            }
        } catch (error) {
            console.warn('⚠️ Could not send feedback to endpoint:', error.message);
            return false;
        }
    }

    /**
     * Store feedback locally as backup
     */
    storeFeedbackLocally(feedbackData) {
        try {
            const existingFeedback = JSON.parse(localStorage.getItem('adjuvantiq_feedback') || '[]');
            existingFeedback.push(feedbackData);
            localStorage.setItem('adjuvantiq_feedback', JSON.stringify(existingFeedback));
            
            // Keep only last 100 feedback items
            if (existingFeedback.length > 100) {
                existingFeedback.splice(0, existingFeedback.length - 100);
                localStorage.setItem('adjuvantiq_feedback', JSON.stringify(existingFeedback));
            }
            
            console.log('💾 Feedback stored locally');
        } catch (error) {
            console.error('❌ Error storing feedback locally:', error);
        }
    }

    /**
     * Track page view
     */
    trackPageView() {
        const pageViewData = {
            type: 'page_view',
            page: this.getPageInfo().page,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId
        };
        
        this.storeFeedbackLocally(pageViewData);
    }

    /**
     * Show toast notification
     */
    showToast(message) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4caf50;
                color: white;
                padding: 15px 20px;
                border-radius: 6px;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 1001;
                font-family: 'Inter', sans-serif;
            `;
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.style.opacity = '1';
        
        setTimeout(() => {
            toast.style.opacity = '0';
        }, 3000);
    }

    /**
     * Get all stored feedback (for admin use)
     */
    getAllFeedback() {
        try {
            const feedback = localStorage.getItem('adjuvantiq_feedback');
            return JSON.parse(feedback || '[]');
        } catch (error) {
            console.error('❌ Error retrieving feedback:', error);
            return [];
        }
    }

    /**
     * Export feedback data
     */
    exportFeedback() {
        const feedback = this.getAllFeedback();
        const dataStr = JSON.stringify(feedback, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `adjuvantiq_feedback_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    /**
     * Clear stored feedback
     */
    clearFeedback() {
        localStorage.removeItem('adjuvantiq_feedback');
        console.log('🗑️ Feedback data cleared');
    }
}

// Initialize the feedback system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.adjuvantiqFeedback = new AmplifyFeedbackSystem();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.adjuvantiqFeedback = new AmplifyFeedbackSystem();
    });
} else {
    window.adjuvantiqFeedback = new AmplifyFeedbackSystem();
}

// Make functions globally available
window.retrieveAllFeedback = function() {
    return window.adjuvantiqFeedback.getAllFeedback();
};

window.exportFeedback = function() {
    return window.adjuvantiqFeedback.exportFeedback();
};

window.clearFeedback = function() {
    return window.adjuvantiqFeedback.clearFeedback();
};
