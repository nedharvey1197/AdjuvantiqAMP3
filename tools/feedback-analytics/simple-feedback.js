/**
 * Simple Feedback Collection System
 * Just captures feedback clicks and saves data for analysis
 */

(function() {
    'use strict';
    
    // Simple data storage
    let feedbackData = [];
    
    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        console.log('Simple feedback system: Initializing...');
        
        // Find all feedback buttons
        const feedbackButtons = document.querySelectorAll('.feedback-button');
        console.log(`Found ${feedbackButtons.length} feedback buttons`);
        
        // Add click handlers to each button
        feedbackButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get feedback info
                const feedbackType = this.dataset.feedbackType || `feedback-${index + 1}`;
                const buttonText = this.textContent.trim();
                const page = window.location.pathname;
                const timestamp = new Date().toISOString();
                
                // Save feedback
                const feedback = {
                    timestamp: timestamp,
                    type: feedbackType,
                    text: buttonText,
                    page: page,
                    session_id: generateSessionId()
                };
                
                feedbackData.push(feedback);
                saveToLocalStorage();
                
                // Show simple confirmation
                showSimpleConfirmation(this);
                
                console.log('Feedback saved:', feedback);
            });
        });
        
        // Add export button to page
        addExportButton();
        
        console.log('Simple feedback system: Ready');
    }
    
    function generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    function saveToLocalStorage() {
        try {
            localStorage.setItem('simple_feedback_data', JSON.stringify(feedbackData));
        } catch (error) {
            console.log('Could not save to localStorage');
        }
    }
    
    function showSimpleConfirmation(button) {
        // Simple visual feedback
        const originalText = button.textContent;
        const originalBackground = button.style.background;
        
        button.textContent = '✓ Saved';
        button.style.background = '#4CAF50';
        button.style.color = 'white';
        button.disabled = true;
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = originalBackground;
            button.style.color = '';
            button.disabled = false;
        }, 2000);
    }
    
    function addExportButton() {
        // Create simple export button
        const exportButton = document.createElement('button');
        exportButton.textContent = '📊 Export Feedback Data';
        exportButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1000;
            background: #2c5282;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            font-family: Arial, sans-serif;
        `;
        
        exportButton.addEventListener('click', exportFeedbackCSV);
        document.body.appendChild(exportButton);
    }
    
    function exportFeedbackCSV() {
        if (feedbackData.length === 0) {
            alert('No feedback data to export yet. Try clicking some feedback buttons first.');
            return;
        }
        
        // Create CSV content
        let csv = 'Timestamp,Feedback Type,Button Text,Page,Session ID\n';
        
        feedbackData.forEach(feedback => {
            csv += `"${feedback.timestamp}","${feedback.type}","${feedback.text}","${feedback.page}","${feedback.session_id}"\n`;
        });
        
        // Download CSV
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `feedback_data_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        alert(`Exported ${feedbackData.length} feedback responses to CSV file.`);
    }
    
    // Make functions available globally for debugging
    window.SimpleFeedback = {
        getData: () => feedbackData,
        exportData: exportFeedbackCSV,
        clearData: () => {
            feedbackData = [];
            localStorage.removeItem('simple_feedback_data');
            alert('Feedback data cleared');
        }
    };
    
})();
