/**
 * Session-Based Feedback Analytics System
 * 
 * This system tracks user interactions and micro-feedback across demo pages
 * without triggering spam detection, and prepares data for analytics export.
 */

class SessionFeedbackTracker {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.feedbackData = {
            session_id: this.sessionId,
            start_time: new Date(this.startTime).toISOString(),
            user_agent: navigator.userAgent,
            page_visits: [],
            micro_feedback: [],
            interactions: [],
            session_duration: 0
        };
        
        this.initializeTracking();
    }

    /**
     * Generate unique session ID
     */
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Initialize tracking for the current page
     */
    initializeTracking() {
        // Track page load
        this.trackPageVisit();
        
        // Track user interactions
        this.trackInteractions();
        
        // Track micro-feedback clicks
        this.trackMicroFeedback();
        
        // Save session data periodically
        this.startPeriodicSaving();
        
        // Track session end
        window.addEventListener('beforeunload', () => {
            this.endSession();
        });
    }

    /**
     * Track page visit
     */
    trackPageVisit() {
        const pageData = {
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            title: document.title,
            referrer: document.referrer
        };
        
        this.feedbackData.page_visits.push(pageData);
        this.saveToLocalStorage();
    }

    /**
     * Track user interactions
     */
    trackInteractions() {
        // Track clicks on important elements
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.matches('.demo-link, .cta-button, .btn-primary, .btn-secondary')) {
                this.trackInteraction('button_click', {
                    element: target.textContent.trim(),
                    class: target.className,
                    href: target.href || null
                });
            }
            
            if (target.matches('.reasoning-box, .collapsible-section')) {
                this.trackInteraction('content_expand', {
                    element: target.textContent.trim().substring(0, 50),
                    type: target.className
                });
            }
        });

        // Track form interactions
        document.addEventListener('submit', (e) => {
            this.trackInteraction('form_submit', {
                form_action: e.target.action,
                form_id: e.target.id || 'unknown'
            });
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (scrollPercent % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                    this.trackInteraction('scroll_depth', {
                        depth: scrollPercent
                    });
                }
            }
        });
    }

    /**
     * Track micro-feedback clicks
     */
    trackMicroFeedback() {
        // Listen for micro-feedback button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.micro-feedback, .feedback-button')) {
                const feedbackType = e.target.dataset.feedbackType || e.target.textContent.trim();
                const context = this.getFeedbackContext(e.target);
                
                this.trackMicroFeedback(feedbackType, context);
            }
        });
    }

    /**
     * Track individual micro-feedback
     */
    trackMicroFeedback(feedbackType, context) {
        const feedback = {
            timestamp: new Date().toISOString(),
            type: feedbackType,
            context: context,
            page: window.location.pathname,
            element_text: context.elementText || '',
            element_class: context.elementClass || ''
        };
        
        this.feedbackData.micro_feedback.push(feedback);
        this.saveToLocalStorage();
        
        // Show visual confirmation without form submission
        this.showFeedbackConfirmation(feedbackType);
    }

    /**
     * Get context for feedback
     */
    getFeedbackContext(element) {
        const context = {
            elementText: element.textContent.trim(),
            elementClass: element.className,
            pageSection: this.getPageSection(element)
        };
        
        return context;
    }

    /**
     * Determine which section of the page the element is in
     */
    getPageSection(element) {
        const sections = ['hero', 'problem', 'solution', 'strategy', 'platform', 'team', 'pilot'];
        
        for (const section of sections) {
            if (element.closest(`#${section}, .${section}`)) {
                return section;
            }
        }
        
        return 'unknown';
    }

    /**
     * Track general interactions
     */
    trackInteraction(type, data) {
        const interaction = {
            timestamp: new Date().toISOString(),
            type: type,
            data: data,
            page: window.location.pathname
        };
        
        this.feedbackData.interactions.push(interaction);
        this.saveToLocalStorage();
    }

    /**
     * Show feedback confirmation without form submission
     */
    showFeedbackConfirmation(feedbackType) {
        // Create or update confirmation element
        let confirmation = document.getElementById('feedback-confirmation');
        if (!confirmation) {
            confirmation = document.createElement('div');
            confirmation.id = 'feedback-confirmation';
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
            document.body.appendChild(confirmation);
        }
        
        confirmation.textContent = `✓ ${feedbackType} recorded`;
        confirmation.style.transform = 'translateX(0)';
        
        // Hide after 3 seconds
        setTimeout(() => {
            confirmation.style.transform = 'translateX(100%)';
        }, 3000);
    }

    /**
     * Save data to localStorage
     */
    saveToLocalStorage() {
        try {
            localStorage.setItem('adjuvantiq_session_data', JSON.stringify(this.feedbackData));
        } catch (error) {
            console.log('Could not save to localStorage:', error.message);
        }
    }

    /**
     * Start periodic saving
     */
    startPeriodicSaving() {
        setInterval(() => {
            this.saveToLocalStorage();
        }, 30000); // Save every 30 seconds
    }

    /**
     * End session and prepare data for export
     */
    endSession() {
        this.feedbackData.session_duration = Date.now() - this.startTime;
        this.feedbackData.end_time = new Date().toISOString();
        
        // Save final session data
        this.saveToLocalStorage();
        
        // Prepare data for analytics export
        this.prepareAnalyticsExport();
    }

    /**
     * Prepare analytics data for export
     */
    prepareAnalyticsExport() {
        const analyticsData = {
            session_summary: {
                session_id: this.feedbackData.session_id,
                start_time: this.feedbackData.start_time,
                end_time: this.feedbackData.end_time,
                duration_seconds: Math.round(this.feedbackData.session_duration / 1000),
                pages_visited: this.feedbackData.page_visits.length,
                total_interactions: this.feedbackData.interactions.length,
                total_feedback: this.feedbackData.micro_feedback.length
            },
            page_visits: this.feedbackData.page_visits,
            micro_feedback: this.feedbackData.micro_feedback,
            interactions: this.feedbackData.interactions
        };
        
        // Store analytics data for export
        try {
            localStorage.setItem('adjuvantiq_analytics_export', JSON.stringify(analyticsData));
        } catch (error) {
            console.log('Could not save analytics export:', error.message);
        }
    }

    /**
     * Export analytics data as CSV
     */
    exportAnalyticsCSV() {
        const analyticsData = JSON.parse(localStorage.getItem('adjuvantiq_analytics_export') || '{}');
        
        if (!analyticsData.session_summary) {
            console.log('No analytics data to export');
            return;
        }
        
        // Create CSV content
        let csv = 'Session Analytics\n';
        csv += 'Session ID,Start Time,End Time,Duration (s),Pages Visited,Total Interactions,Total Feedback\n';
        csv += `${analyticsData.session_summary.session_id},${analyticsData.session_summary.start_time},${analyticsData.session_summary.end_time},${analyticsData.session_summary.duration_seconds},${analyticsData.session_summary.pages_visited},${analyticsData.session_summary.total_interactions},${analyticsData.session_summary.total_feedback}\n\n`;
        
        // Add micro-feedback details
        csv += 'Micro-Feedback Details\n';
        csv += 'Timestamp,Type,Context,Page,Element Text,Element Class\n';
        analyticsData.micro_feedback.forEach(feedback => {
            csv += `${feedback.timestamp},${feedback.type},${feedback.context.pageSection},${feedback.page},"${feedback.element_text}",${feedback.element_class}\n`;
        });
        
        // Add interaction details
        csv += '\nInteraction Details\n';
        csv += 'Timestamp,Type,Data,Page\n';
        analyticsData.interactions.forEach(interaction => {
            csv += `${interaction.timestamp},${interaction.type},"${JSON.stringify(interaction.data)}",${interaction.page}\n`;
        });
        
        // Download CSV file
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `adjuvantiq_session_${this.sessionId}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    /**
     * Get session statistics
     */
    getSessionStats() {
        return {
            sessionId: this.sessionId,
            duration: Math.round((Date.now() - this.startTime) / 1000),
            feedbackCount: this.feedbackData.micro_feedback.length,
            interactionCount: this.feedbackData.interactions.length,
            pageCount: this.feedbackData.page_visits.length
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SessionFeedbackTracker;
}

// Auto-initialize if loaded in browser
if (typeof window !== 'undefined') {
    window.SessionFeedbackTracker = SessionFeedbackTracker;
    
    // Initialize tracker when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.sessionTracker = new SessionFeedbackTracker();
        });
    } else {
        window.sessionTracker = new SessionFeedbackTracker();
    }
}
