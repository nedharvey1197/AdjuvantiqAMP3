// template-engine.js
class ExampleRenderer {
    constructor(templateData) {
        this.data = templateData;
    }
    
    render() {
        // Use Handlebars, Mustache, or custom template engine
        const template = document.getElementById('example-template').innerHTML;
        const rendered = Handlebars.compile(template)(this.data);
        document.getElementById('app').innerHTML = rendered;
        
        // Initialize interactive features
        this.initializeInteractivity();
    }
    
    initializeInteractivity() {
        // Same JavaScript functions as current working version
        this.setupProgressTracking();
        this.setupReasoningBoxes();
        this.setupFeedbackButtons();
        this.setupScrollEffects();
    }
}

// Usage
fetch('examples/statistical_analysis_oncology.json')
    .then(response => response.json())
    .then(data => {
        const renderer = new ExampleRenderer(data);
        renderer.render();
    });