/**
 * Simple Feedback to Netlify Forms
 * Connects existing feedback buttons to send data to Netlify
 */

(function() {
    'use strict';
    
    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        console.log('Feedback to Netlify: Initializing...');
        
        // Find all existing feedback buttons
        const feedbackButtons = document.querySelectorAll('.feedback-button');
        console.log(`Found ${feedbackButtons.length} feedback buttons`);
        
        // Connect each button to send data to Netlify
        feedbackButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get feedback data from existing button
                const feedbackType = this.dataset.feedbackType || `feedback-${index + 1}`;
                const buttonText = this.textContent.trim();
                const page = window.location.pathname;
                const timestamp = new Date().toISOString();
                
                // Send to Netlify form
                sendToNetlify({
                    feedback_type: feedbackType,
                    button_text: buttonText,
                    page: page,
                    timestamp: timestamp,
                    user_agent: navigator.userAgent
                });
                
                // Show simple confirmation
                showConfirmation(this);
            });
        });
        
        console.log('Feedback to Netlify: Ready');
    }
    
    function sendToNetlify(data) {
        // Create form data
        const formData = new FormData();
        formData.append('form-name', 'demo-feedback');
        formData.append('feedback_type', data.feedback_type);
        formData.append('button_text', data.button_text);
        formData.append('page', data.page);
        formData.append('timestamp', data.timestamp);
        formData.append('user_agent', data.user_agent);
        
        // Send to Netlify
        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Feedback sent to Netlify successfully');
            } else {
                console.log('Failed to send feedback to Netlify');
            }
        })
        .catch(error => {
            console.log('Error sending feedback:', error);
        });
    }
    
    function showConfirmation(button) {
        // Simple visual feedback
        const originalText = button.textContent;
        const originalBackground = button.style.background;
        
        button.textContent = '✓ Sent';
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
    
})();
