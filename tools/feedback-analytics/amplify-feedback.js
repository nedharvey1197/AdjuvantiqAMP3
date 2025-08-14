/**
 * AdjuvantIQ Feedback System for AWS Amplify
 * Simple, lightweight feedback collection that works without complex backend setup
 */

class AmplifyFeedbackCollector {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
        this.pageStartTime = Date.now();
        this.initializeSystem();
    }

    /**
     * Generate unique session ID
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
     * Get or generate user ID
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
        console.log('🚀 AdjuvantIQ Amplify Feedback System Initialized');
        console.log('🆔 Session ID:', this.sessionId);
        console.log('👤 User ID:', this.userId);
        
        // Set up global feedback function
        window.giveFeedback = this.handleFeedback.bind(this);
        
        // Track page view
        this.trackPageView();
        
        // Set up page visibility tracking
        this.setupPageVisibilityTracking();
    }

    /**
     * Handle feedback button clicks
     */
    handleFeedback(button, feedbackType) {
        // Visual feedback
        this.showButtonFeedback(button);
        
        // Collect comprehensive feedback data
        const feedbackData = this.collectFeedbackData(feedbackType, button);
        
        // Store feedback locally
        this.storeFeedback(feedbackData);
        
        // Try to send to any available endpoint (optional)
        this.trySendToEndpoint(feedbackData);
        
        // Show success message
        this.showToast('Thank you for your feedback!');
        
        // Log to console for debugging
        console.log('📝 Feedback collected:', feedbackData);
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
        const timingInfo = this.getTimingInfo();
        
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
            title: pageInfo.title,
            
            // User context
            sessionId: this.sessionId,
            userId: this.userId,
            userAgent: navigator.userAgent,
            language: navigator.language,
            
            // Timing
            timestamp: new Date().toISOString(),
            timeOnPage: timingInfo.timeOnPage,
            pageLoadTime: timingInfo.pageLoadTime,
            
            // Technical info
            platform: 'aws-amplify',
            version: '1.0.0',
            screenSize: userInfo.screenSize,
            viewport: userInfo.viewport
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
            url: window.location.href,
            title: document.title
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
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            cookiesEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack
        };
    }

    /**
     * Get timing information
     */
    getTimingInfo() {
        const now = Date.now();
        const timeOnPage = Math.floor((now - this.pageStartTime) / 1000);
        
        // Get page load performance if available
        let pageLoadTime = 0;
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        }
        
        return {
            timeOnPage,
            pageLoadTime
        };
    }

    /**
     * Store feedback locally
     */
    storeFeedback(feedbackData) {
        try {
            const existingFeedback = JSON.parse(localStorage.getItem('adjuvantiq_feedback') || '[]');
            existingFeedback.push(feedbackData);
            
            // Keep only last 200 feedback items to prevent storage issues
            if (existingFeedback.length > 200) {
                existingFeedback.splice(0, existingFeedback.length - 200);
            }
            
            localStorage.setItem('adjuvantiq_feedback', JSON.stringify(existingFeedback));
            console.log('💾 Feedback stored locally');
            
            // Also store in session storage for immediate access
            sessionStorage.setItem('adjuvantiq_feedback', JSON.stringify(existingFeedback));
            
        } catch (error) {
            console.error('❌ Error storing feedback locally:', error);
            // Fallback to session storage only
            try {
                const existingFeedback = JSON.parse(sessionStorage.getItem('adjuvantiq_feedback') || '[]');
                existingFeedback.push(feedbackData);
                sessionStorage.setItem('adjuvantiq_feedback', JSON.stringify(existingFeedback));
            } catch (fallbackError) {
                console.error('❌ Fallback storage also failed:', fallbackError);
            }
        }
    }

    /**
     * Try to send feedback to an endpoint (optional)
     */
    async trySendToEndpoint(feedbackData) {
        // Try multiple possible endpoints
        const endpoints = [
            '/api/feedback',
            '/.netlify/functions/feedback',
            'https://api.adjuvantiq.com/feedback' // Replace with your actual API
        ];
        
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(feedbackData)
                });
                
                if (response.ok) {
                    console.log('✅ Feedback sent to endpoint:', endpoint);
                    return true;
                }
            } catch (error) {
                // Silently continue to next endpoint
                continue;
            }
        }
        
        console.log('ℹ️ No endpoints available, feedback stored locally only');
        return false;
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
            userId: this.userId,
            referrer: document.referrer
        };
        
        this.storeFeedback(pageViewData);
    }

    /**
     * Set up page visibility tracking
     */
    setupPageVisibilityTracking() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Page hidden - track time spent
                const timeSpent = this.getTimingInfo().timeOnPage;
                const visibilityData = {
                    type: 'page_visibility',
                    action: 'hidden',
                    timeSpent,
                    timestamp: new Date().toISOString(),
                    sessionId: this.sessionId,
                    userId: this.userId
                };
                this.storeFeedback(visibilityData);
            } else {
                // Page visible again - reset timer
                this.pageStartTime = Date.now();
            }
        });
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
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
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
     * Get all stored feedback
     */
    getAllFeedback() {
        try {
            // Try localStorage first
            const feedback = localStorage.getItem('adjuvantiq_feedback');
            if (feedback) {
                return JSON.parse(feedback);
            }
            
            // Fallback to sessionStorage
            const sessionFeedback = sessionStorage.getItem('adjuvantiq_feedback');
            if (sessionFeedback) {
                return JSON.parse(sessionFeedback);
            }
            
            return [];
        } catch (error) {
            console.error('❌ Error retrieving feedback:', error);
            return [];
        }
    }

    /**
     * Export feedback data as JSON
     */
    exportFeedback() {
        const feedback = this.getAllFeedback();
        const dataStr = JSON.stringify(feedback, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `adjuvantiq_feedback_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        console.log('📤 Feedback exported:', feedback.length, 'items');
    }

    /**
     * Export feedback data as CSV
     */
    exportFeedbackCSV() {
        const feedback = this.getAllFeedback();
        if (feedback.length === 0) {
            console.log('No feedback data to export');
            return;
        }
        
        // Get all unique keys from feedback data
        const keys = [...new Set(feedback.flatMap(item => Object.keys(item)))];
        
        // Create CSV header
        const csvHeader = keys.join(',');
        
        // Create CSV rows
        const csvRows = feedback.map(item => {
            return keys.map(key => {
                const value = item[key] || '';
                // Escape commas and quotes
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',');
        });
        
        // Combine header and rows
        const csvContent = [csvHeader, ...csvRows].join('\n');
        const dataBlob = new Blob([csvContent], {type: 'text/csv'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `adjuvantiq_feedback_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        
        console.log('📤 Feedback exported as CSV:', feedback.length, 'items');
    }

    /**
     * Clear stored feedback
     */
    clearFeedback() {
        localStorage.removeItem('adjuvantiq_feedback');
        sessionStorage.removeItem('adjuvantiq_feedback');
        console.log('🗑️ Feedback data cleared');
    }

    /**
     * Get feedback statistics
     */
    getFeedbackStats() {
        const feedback = this.getAllFeedback();
        const stats = {
            total: feedback.length,
            byType: {},
            byPage: {},
            byDate: {},
            recentActivity: []
        };
        
        feedback.forEach(item => {
            // Count by type
            stats.byType[item.type] = (stats.byType[item.type] || 0) + 1;
            
            // Count by page
            stats.byPage[item.page] = (stats.byPage[item.page] || 0) + 1;
            
            // Count by date
            const date = item.timestamp?.split('T')[0] || 'unknown';
            stats.byDate[date] = (stats.byDate[date] || 0) + 1;
        });
        
        // Get recent activity (last 10 items)
        stats.recentActivity = feedback.slice(-10).reverse();
        
        return stats;
    }
}

// Initialize the feedback system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.adjuvantiqFeedback = new AmplifyFeedbackCollector();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.adjuvantiqFeedback = new AmplifyFeedbackCollector();
    });
} else {
    window.adjuvantiqFeedback = new AmplifyFeedbackCollector();
}

// Make functions globally available
window.retrieveAllFeedback = function() {
    return window.adjuvantiqFeedback.getAllFeedback();
};

window.exportFeedback = function() {
    return window.adjuvantiqFeedback.exportFeedback();
};

window.exportFeedbackCSV = function() {
    return window.adjuvantiqFeedback.exportFeedbackCSV();
};

window.clearFeedback = function() {
    return window.adjuvantiqFeedback.clearFeedback();
};

window.getFeedbackStats = function() {
    return window.adjuvantiqFeedback.getFeedbackStats();
};
