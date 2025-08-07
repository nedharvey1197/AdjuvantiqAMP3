// Feedback Collection System for AdjuvantIQ Demo
class FeedbackCollector {
    constructor() {
        this.feedbackData = {
            sessionId: this.generateSessionId(),
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            userAgent: navigator.userAgent,
            feedback: []
        };
        
        this.initializeTracking();
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    initializeTracking() {
        // Track page load time
        window.addEventListener('load', () => {
            this.feedbackData.pageLoadTime = performance.now();
        });
        
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            maxScroll = Math.max(maxScroll, scrollPercent);
            this.feedbackData.maxScrollDepth = maxScroll;
        });
        
        // Track time on page
        setInterval(() => {
            this.feedbackData.timeOnPage = Math.round((Date.now() - new Date(this.feedbackData.timestamp).getTime()) / 1000);
        }, 5000);
    }
    
    collectFeedback(type, value, context = {}) {
        const feedback = {
            type: type,
            value: value,
            context: context,
            timestamp: new Date().toISOString(),
            scrollDepth: this.feedbackData.maxScrollDepth || 0,
            timeOnPage: this.feedbackData.timeOnPage || 0
        };
        
        this.feedbackData.feedback.push(feedback);
        
        // Log to console for development
        console.log('Feedback collected:', feedback);
        
        // Send to backend (if configured)
        this.sendFeedback(feedback);
        
        return feedback;
    }
    
    sendFeedback(feedback) {
        // For now, we'll use a simple approach that can be extended
        // In production, this would send to AWS Lambda, API Gateway, or similar
        
        // Option 1: Send to AWS Lambda via API Gateway
        if (window.FEEDBACK_ENDPOINT) {
            fetch(window.FEEDBACK_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: this.feedbackData.sessionId,
                    feedback: feedback
                })
            }).catch(error => {
                console.log('Feedback send failed:', error);
            });
        }
        
        // Option 2: Store in localStorage for later batch upload
        this.storeFeedbackLocally(feedback);
    }
    
    storeFeedbackLocally(feedback) {
        const stored = JSON.parse(localStorage.getItem('adjuvantiq_feedback') || '[]');
        stored.push(feedback);
        localStorage.setItem('adjuvantiq_feedback', JSON.stringify(stored));
        
        // Limit stored feedback to prevent localStorage overflow
        if (stored.length > 100) {
            stored.splice(0, 50);
            localStorage.setItem('adjuvantiq_feedback', JSON.stringify(stored));
        }
    }
    
    // Collect all feedback at session end
    collectSessionSummary() {
        const summary = {
            ...this.feedbackData,
            sessionEnd: new Date().toISOString(),
            totalFeedback: this.feedbackData.feedback.length
        };
        
        // Send session summary
        if (window.SESSION_ENDPOINT) {
            fetch(window.SESSION_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(summary)
            }).catch(error => {
                console.log('Session summary send failed:', error);
            });
        }
        
        return summary;
    }
}

// Global feedback collector instance
window.feedbackCollector = new FeedbackCollector();

// Enhanced feedback function for use in demos
function giveFeedback(button, response, context = {}) {
    // Visual feedback
    button.style.background = '#4caf50';
    button.textContent = '✓ ' + button.textContent.replace('✓ ', '');
    
    // Disable other buttons in the same group
    const siblings = button.parentElement.querySelectorAll('button');
    siblings.forEach(function(btn) {
        if (btn !== button) {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        }
    });
    
    // Collect feedback data
    const feedbackContext = {
        ...context,
        buttonText: button.textContent.replace('✓ ', ''),
        stepNumber: button.closest('.workflow-step')?.querySelector('.step-number')?.textContent,
        stepTitle: button.closest('.workflow-step')?.querySelector('.step-title')?.textContent
    };
    
    window.feedbackCollector.collectFeedback('button_click', response, feedbackContext);
    
    // Show toast notification
    showToast('Thanks for the feedback!');
}

// Enhanced engagement tracking
function handleEngagement(action, context = {}) {
    const engagementContext = {
        ...context,
        action: action,
        page: window.location.pathname
    };
    
    window.feedbackCollector.collectFeedback('engagement', action, engagementContext);
    
    // Handle different engagement types
    switch(action) {
        case 'download_statistical_guide':
            showToast('PDF download started');
            break;
        case 'share_biomarker_insights':
            showToast('Opening LinkedIn share...');
            break;
        case 'request_data_pilot':
            showToast('Pilot form opening...');
            window.open('../#pilot', '_blank');
            break;
        default:
            showToast('Action completed');
    }
}

// Collect session data when user leaves
window.addEventListener('beforeunload', () => {
    window.feedbackCollector.collectSessionSummary();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FeedbackCollector, giveFeedback, handleEngagement };
} 