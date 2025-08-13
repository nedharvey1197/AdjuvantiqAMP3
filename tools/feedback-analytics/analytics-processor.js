/**
 * Analytics Processor for AdjuvantIQ Feedback System
 * 
 * This module processes session data, aggregates feedback, and provides
 * CSV export functionality for analytics and reporting.
 */

class AnalyticsProcessor {
    constructor() {
        this.sessionsData = [];
        this.feedbackData = [];
        this.interactionsData = [];
        this.aggregatedStats = {
            totalSessions: 0,
            totalFeedback: 0,
            averageRating: 0,
            totalInteractions: 0
        };
    }

    /**
     * Initialize the analytics dashboard
     */
    initializeDashboard() {
        this.loadAllData();
        this.updateStatistics();
        this.populateTables();
    }

    /**
     * Load all available data from localStorage
     */
    loadAllData() {
        // Load session data
        this.loadSessionsData();
        
        // Load feedback data (from Netlify forms)
        this.loadFeedbackData();
        
        // Load interaction data
        this.loadInteractionsData();
    }

    /**
     * Load session data from localStorage
     */
    loadSessionsData() {
        this.sessionsData = [];
        
        // Look for session data in localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('adjuvantiq_session_data')) {
                try {
                    const sessionData = JSON.parse(localStorage.getItem(key));
                    if (sessionData && sessionData.session_id) {
                        this.sessionsData.push(sessionData);
                    }
                } catch (error) {
                    console.log('Error parsing session data:', error.message);
                }
            }
        }
        
        // Sort by start time (newest first)
        this.sessionsData.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
    }

    /**
     * Load feedback data from localStorage (Netlify form submissions)
     */
    loadFeedbackData() {
        this.feedbackData = [];
        
        // Look for feedback data in localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('adjuvantiq_feedback_')) {
                try {
                    const feedbackData = JSON.parse(localStorage.getItem(key));
                    if (feedbackData && feedbackData.timestamp) {
                        this.feedbackData.push(feedbackData);
                    }
                } catch (error) {
                    console.log('Error parsing feedback data:', error.message);
                }
            }
        }
        
        // Sort by timestamp (newest first)
        this.feedbackData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    /**
     * Load interaction data from localStorage
     */
    loadInteractionsData() {
        this.interactionsData = [];
        
        // Collect interactions from all sessions
        this.sessionsData.forEach(session => {
            if (session.interactions && Array.isArray(session.interactions)) {
                session.interactions.forEach(interaction => {
                    this.interactionsData.push({
                        ...interaction,
                        session_id: session.session_id
                    });
                });
            }
        });
        
        // Sort by timestamp (newest first)
        this.interactionsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    /**
     * Update dashboard statistics
     */
    updateStatistics() {
        this.aggregatedStats.totalSessions = this.sessionsData.length;
        this.aggregatedStats.totalFeedback = this.feedbackData.length;
        this.aggregatedStats.totalInteractions = this.interactionsData.length;
        
        // Calculate average rating
        const ratings = this.feedbackData
            .filter(feedback => feedback.rating)
            .map(feedback => parseInt(feedback.rating));
        
        if (ratings.length > 0) {
            this.aggregatedStats.averageRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
        }
        
        // Update UI
        document.getElementById('total-sessions').textContent = this.aggregatedStats.totalSessions;
        document.getElementById('total-feedback').textContent = this.aggregatedStats.totalFeedback;
        document.getElementById('avg-rating').textContent = this.aggregatedStats.averageRating;
        document.getElementById('total-interactions').textContent = this.aggregatedStats.totalInteractions;
    }

    /**
     * Populate data tables
     */
    populateTables() {
        this.populateSessionsTable();
        this.populateFeedbackTable();
        this.populateInteractionsTable();
    }

    /**
     * Populate sessions table
     */
    populateSessionsTable() {
        const tbody = document.getElementById('sessions-tbody');
        tbody.innerHTML = '';
        
        if (this.sessionsData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="no-data">No session data available</td></tr>';
            return;
        }
        
        this.sessionsData.forEach(session => {
            const row = document.createElement('tr');
            
            const duration = session.session_duration ? 
                Math.round(session.session_duration / 1000) + 's' : 'N/A';
            
            row.innerHTML = `
                <td>${session.session_id}</td>
                <td>${this.formatDateTime(session.start_time)}</td>
                <td>${duration}</td>
                <td>${session.page_visits ? session.page_visits.length : 0}</td>
                <td>${session.interactions ? session.interactions.length : 0}</td>
                <td>${session.micro_feedback ? session.micro_feedback.length : 0}</td>
                <td>${this.truncateText(session.user_agent || 'N/A', 50)}</td>
            `;
            
            tbody.appendChild(row);
        });
    }

    /**
     * Populate feedback table
     */
    populateFeedbackTable() {
        const tbody = document.getElementById('feedback-tbody');
        tbody.innerHTML = '';
        
        if (this.feedbackData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="no-data">No feedback data available</td></tr>';
            return;
        }
        
        this.feedbackData.forEach(feedback => {
            const row = document.createElement('tr');
            
            const ratingStars = this.generateRatingStars(feedback.rating);
            const feedbackTypeClass = feedback['feedback-type'] ? `feedback-type ${feedback['feedback-type']}` : '';
            const feedbackTypeText = feedback['feedback-type'] ? feedback['feedback-type'].replace('-', ' ') : 'N/A';
            
            row.innerHTML = `
                <td>${this.formatDateTime(feedback.timestamp)}</td>
                <td>${feedback.session_id || 'N/A'}</td>
                <td><span class="${feedbackTypeClass}">${feedbackTypeText}</span></td>
                <td>${ratingStars}</td>
                <td>${this.formatFeedbackAreas(feedback['feedback-areas'])}</td>
                <td>${this.truncateText(feedback['detailed-feedback'] || 'N/A', 100)}</td>
                <td>${feedback['contact-email'] || 'N/A'}</td>
                <td>${feedback.company || 'N/A'}</td>
            `;
            
            tbody.appendChild(row);
        });
    }

    /**
     * Populate interactions table
     */
    populateInteractionsTable() {
        const tbody = document.getElementById('interactions-tbody');
        tbody.innerHTML = '';
        
        if (this.interactionsData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="no-data">No interaction data available</td></tr>';
            return;
        }
        
        this.interactionsData.forEach(interaction => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${this.formatDateTime(interaction.timestamp)}</td>
                <td>${interaction.session_id || 'N/A'}</td>
                <td>${interaction.page || 'N/A'}</td>
                <td>${this.formatInteractionType(interaction.type)}</td>
                <td>${this.formatInteractionData(interaction.data)}</td>
            `;
            
            tbody.appendChild(row);
        });
    }

    /**
     * Generate rating stars display
     */
    generateRatingStars(rating) {
        if (!rating) return 'N/A';
        
        const numRating = parseInt(rating);
        let stars = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= numRating) {
                stars += '<span class="rating-star">★</span>';
            } else {
                stars += '<span class="rating-star" style="color: #e2e8f0;">☆</span>';
            }
        }
        
        return `<div class="rating-display">${stars}</div>`;
    }

    /**
     * Format feedback areas
     */
    formatFeedbackAreas(areas) {
        if (!areas) return 'N/A';
        
        if (Array.isArray(areas)) {
            return areas.join(', ');
        }
        
        return areas;
    }

    /**
     * Format interaction type
     */
    formatInteractionType(type) {
        if (!type) return 'N/A';
        
        return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    /**
     * Format interaction data
     */
    formatInteractionData(data) {
        if (!data) return 'N/A';
        
        if (typeof data === 'object') {
            return JSON.stringify(data);
        }
        
        return data.toString();
    }

    /**
     * Format date and time
     */
    formatDateTime(dateString) {
        if (!dateString) return 'N/A';
        
        try {
            const date = new Date(dateString);
            return date.toLocaleString();
        } catch (error) {
            return dateString;
        }
    }

    /**
     * Truncate text to specified length
     */
    truncateText(text, maxLength) {
        if (!text) return 'N/A';
        
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    /**
     * Filter sessions based on criteria
     */
    filterSessions() {
        const filterValue = document.getElementById('session-filter').value;
        let filteredData = [...this.sessionsData];
        
        if (filterValue === 'recent') {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            filteredData = filteredData.filter(session => 
                new Date(session.start_time) >= sevenDaysAgo
            );
        } else if (filterValue === 'month') {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            filteredData = filteredData.filter(session => 
                new Date(session.start_time) >= thirtyDaysAgo
            );
        }
        
        this.populateSessionsTableWithData(filteredData);
    }

    /**
     * Filter feedback based on criteria
     */
    filterFeedback() {
        const typeFilter = document.getElementById('feedback-type-filter').value;
        const ratingFilter = document.getElementById('rating-filter').value;
        
        let filteredData = [...this.feedbackData];
        
        if (typeFilter) {
            filteredData = filteredData.filter(feedback => 
                feedback['feedback-type'] === typeFilter
            );
        }
        
        if (ratingFilter) {
            filteredData = filteredData.filter(feedback => 
                feedback.rating === ratingFilter
            );
        }
        
        this.populateFeedbackTableWithData(filteredData);
    }

    /**
     * Filter interactions based on criteria
     */
    filterInteractions() {
        const typeFilter = document.getElementById('interaction-type-filter').value;
        
        let filteredData = [...this.interactionsData];
        
        if (typeFilter) {
            filteredData = filteredData.filter(interaction => 
                interaction.type === typeFilter
            );
        }
        
        this.populateInteractionsTableWithData(filteredData);
    }

    /**
     * Populate sessions table with specific data
     */
    populateSessionsTableWithData(data) {
        const tbody = document.getElementById('sessions-tbody');
        tbody.innerHTML = '';
        
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="no-data">No sessions match the selected filter</td></tr>';
            return;
        }
        
        data.forEach(session => {
            const row = document.createElement('tr');
            
            const duration = session.session_duration ? 
                Math.round(session.session_duration / 1000) + 's' : 'N/A';
            
            row.innerHTML = `
                <td>${session.session_id}</td>
                <td>${this.formatDateTime(session.start_time)}</td>
                <td>${duration}</td>
                <td>${session.page_visits ? session.page_visits.length : 0}</td>
                <td>${session.interactions ? session.interactions.length : 0}</td>
                <td>${session.micro_feedback ? session.micro_feedback.length : 0}</td>
                <td>${this.truncateText(session.user_agent || 'N/A', 50)}</td>
            `;
            
            tbody.appendChild(row);
        });
    }

    /**
     * Populate feedback table with specific data
     */
    populateFeedbackTableWithData(data) {
        const tbody = document.getElementById('feedback-tbody');
        tbody.innerHTML = '';
        
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="no-data">No feedback matches the selected filter</td></tr>';
            return;
        }
        
        data.forEach(feedback => {
            const row = document.createElement('tr');
            
            const ratingStars = this.generateRatingStars(feedback.rating);
            const feedbackTypeClass = feedback['feedback-type'] ? `feedback-type ${feedback['feedback-type']}` : '';
            const feedbackTypeText = feedback['feedback-type'] ? feedback['feedback-type'].replace('-', ' ') : 'N/A';
            
            row.innerHTML = `
                <td>${this.formatDateTime(feedback.timestamp)}</td>
                <td>${feedback.session_id || 'N/A'}</td>
                <td><span class="${feedbackTypeClass}">${feedbackTypeText}</span></td>
                <td>${ratingStars}</td>
                <td>${this.formatFeedbackAreas(feedback['feedback-areas'])}</td>
                <td>${this.truncateText(feedback['detailed-feedback'] || 'N/A', 100)}</td>
                <td>${feedback['contact-email'] || 'N/A'}</td>
                <td>${feedback.company || 'N/A'}</td>
            `;
            
            tbody.appendChild(row);
        });
    }

    /**
     * Populate interactions table with specific data
     */
    populateInteractionsTableWithData(data) {
        const tbody = document.getElementById('interactions-tbody');
        tbody.innerHTML = '';
        
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="no-data">No interactions match the selected filter</td></tr>';
            return;
        }
        
        data.forEach(interaction => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${this.formatDateTime(interaction.timestamp)}</td>
                <td>${interaction.session_id || 'N/A'}</td>
                <td>${interaction.page || 'N/A'}</td>
                <td>${this.formatInteractionType(interaction.type)}</td>
                <td>${this.formatInteractionData(interaction.data)}</td>
            `;
            
            tbody.appendChild(row);
        });
    }
}

// Export functions for CSV download
function exportSessionsCSV() {
    const processor = new AnalyticsProcessor();
    processor.loadSessionsData();
    
    let csv = 'Session Analytics\n';
    csv += 'Session ID,Start Time,End Time,Duration (s),Pages Visited,Total Interactions,Total Feedback,User Agent\n';
    
    processor.sessionsData.forEach(session => {
        const duration = session.session_duration ? Math.round(session.session_duration / 1000) : 0;
        const endTime = session.end_time || 'N/A';
        
        csv += `${session.session_id},${session.start_time},${endTime},${duration},${session.page_visits ? session.page_visits.length : 0},${session.interactions ? session.interactions.length : 0},${session.micro_feedback ? session.micro_feedback.length : 0},"${session.user_agent || 'N/A'}"\n`;
    });
    
    downloadCSV(csv, 'adjuvantiq_sessions_export.csv');
}

function exportFeedbackCSV() {
    const processor = new AnalyticsProcessor();
    processor.loadFeedbackData();
    
    let csv = 'Feedback Analytics\n';
    csv += 'Timestamp,Session ID,Feedback Type,Rating,Areas,Detailed Feedback,Contact Email,Company\n';
    
    processor.feedbackData.forEach(feedback => {
        csv += `${feedback.timestamp},${feedback.session_id || 'N/A'},${feedback['feedback-type'] || 'N/A'},${feedback.rating || 'N/A'},${processor.formatFeedbackAreas(feedback['feedback-areas']) || 'N/A'},"${feedback['detailed-feedback'] || 'N/A'}",${feedback['contact-email'] || 'N/A'},${feedback.company || 'N/A'}\n`;
    });
    
    downloadCSV(csv, 'adjuvantiq_feedback_export.csv');
}

function exportInteractionsCSV() {
    const processor = new AnalyticsProcessor();
    processor.loadInteractionsData();
    
    let csv = 'Interaction Analytics\n';
    csv += 'Timestamp,Session ID,Page,Interaction Type,Data\n';
    
    processor.interactionsData.forEach(interaction => {
        csv += `${interaction.timestamp},${interaction.session_id || 'N/A'},${interaction.page || 'N/A'},${interaction.type || 'N/A'},"${processor.formatInteractionData(interaction.data) || 'N/A'}"\n`;
    });
    
    downloadCSV(csv, 'adjuvantiq_interactions_export.csv');
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Global filter functions
function filterSessions() {
    if (window.analyticsProcessor) {
        window.analyticsProcessor.filterSessions();
    }
}

function filterFeedback() {
    if (window.analyticsProcessor) {
        window.analyticsProcessor.filterFeedback();
    }
}

function filterInteractions() {
    if (window.analyticsProcessor) {
        window.analyticsProcessor.filterInteractions();
    }
}

// Initialize dashboard
function initializeDashboard() {
    window.analyticsProcessor = new AnalyticsProcessor();
    window.analyticsProcessor.initializeDashboard();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsProcessor;
}
