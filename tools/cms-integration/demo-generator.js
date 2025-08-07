#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Demo template engine
class DemoGenerator {
    constructor() {
        this.contentDir = path.join(__dirname, '../../content');
        this.outputDir = path.join(__dirname, '../../demo');
        this.templateDir = path.join(__dirname, '../template-engine');
    }

    // Load demo content from CMS
    loadDemoContent(demoSlug) {
        const demoFile = path.join(this.contentDir, 'demos', `${demoSlug}.json`);
        if (!fs.existsSync(demoFile)) {
            throw new Error(`Demo file not found: ${demoFile}`);
        }
        return JSON.parse(fs.readFileSync(demoFile, 'utf8'));
    }

    // Load phase content from CMS
    loadPhaseContent(phaseSlug) {
        const phaseFile = path.join(this.contentDir, 'demo-phases', `${phaseSlug}.json`);
        if (!fs.existsSync(phaseFile)) {
            throw new Error(`Phase file not found: ${phaseFile}`);
        }
        return JSON.parse(fs.readFileSync(phaseFile, 'utf8'));
    }

    // Generate demo hub page
    generateDemoHub() {
        const demosDir = path.join(this.contentDir, 'demos');
        const demos = [];

        if (fs.existsSync(demosDir)) {
            const files = fs.readdirSync(demosDir);
            files.forEach(file => {
                if (file.endsWith('.json')) {
                    const demo = JSON.parse(fs.readFileSync(path.join(demosDir, file), 'utf8'));
                    if (demo.published) {
                        demos.push(demo);
                    }
                }
            });
        }

        // Sort by order
        demos.sort((a, b) => a.order - b.order);

        const template = this.loadTemplate('demo-hub');
        const html = template({ demos });
        
        // Only generate if there are demos, and don't overwrite existing index.html
        if (demos.length > 0) {
            const outputFile = path.join(this.outputDir, 'cms-generated-hub.html');
            fs.writeFileSync(outputFile, html);
            console.log(`Generated CMS demo hub page: cms-generated-hub.html (${demos.length} demos)`);
        } else {
            console.log('No published demos found - skipping demo hub generation');
        }
    }

    // Generate individual demo page
    generateDemoPage(demoSlug) {
        const demo = this.loadDemoContent(demoSlug);
        const template = this.loadTemplate('demo-page');
        const html = template(demo);
        
        // Use cms- prefix to avoid conflicts with existing files
        const outputFile = path.join(this.outputDir, `cms-${demoSlug}.html`);
        fs.writeFileSync(outputFile, html);
        console.log(`Generated CMS demo page: cms-${demoSlug}.html`);
    }

    // Generate phase page
    generatePhasePage(phaseSlug) {
        const phase = this.loadPhaseContent(phaseSlug);
        const template = this.loadTemplate('phase-page');
        const html = template(phase);
        
        // Use cms- prefix to avoid conflicts with existing files
        const outputFile = path.join(this.outputDir, `cms-${phaseSlug}.html`);
        fs.writeFileSync(outputFile, html);
        console.log(`Generated CMS phase page: cms-${phaseSlug}.html`);
    }

    // Load Handlebars template
    loadTemplate(templateName) {
        const templateFile = path.join(this.templateDir, `${templateName}.hbs`);
        if (!fs.existsSync(templateFile)) {
            throw new Error(`Template not found: ${templateFile}`);
        }
        const templateContent = fs.readFileSync(templateFile, 'utf8');
        return Handlebars.compile(templateContent);
    }

    // Generate all pages
    generateAll() {
        console.log('Starting demo generation...');
        
        // Generate demo hub
        this.generateDemoHub();
        
        // Generate all published demos
        const demosDir = path.join(this.contentDir, 'demos');
        if (fs.existsSync(demosDir)) {
            const files = fs.readdirSync(demosDir);
            files.forEach(file => {
                if (file.endsWith('.json')) {
                    const demo = JSON.parse(fs.readFileSync(path.join(demosDir, file), 'utf8'));
                    if (demo.published) {
                        this.generateDemoPage(demo.slug);
                    }
                }
            });
        }
        
        // Generate all published phases
        const phasesDir = path.join(this.contentDir, 'demo-phases');
        if (fs.existsSync(phasesDir)) {
            const files = fs.readdirSync(phasesDir);
            files.forEach(file => {
                if (file.endsWith('.json')) {
                    const phase = JSON.parse(fs.readFileSync(path.join(phasesDir, file), 'utf8'));
                    if (phase.published) {
                        this.generatePhasePage(phase.slug);
                    }
                }
            });
        }
        
        console.log('Demo generation complete!');
    }
}

// CLI interface
if (require.main === module) {
    const generator = new DemoGenerator();
    const command = process.argv[2];
    const target = process.argv[3];

    switch (command) {
        case 'generate-all':
            generator.generateAll();
            break;
        case 'generate-demo':
            if (!target) {
                console.error('Please specify a demo slug');
                process.exit(1);
            }
            generator.generateDemoPage(target);
            break;
        case 'generate-phase':
            if (!target) {
                console.error('Please specify a phase slug');
                process.exit(1);
            }
            generator.generatePhasePage(target);
            break;
        case 'generate-hub':
            generator.generateDemoHub();
            break;
        default:
            console.log(`
Usage: node demo-generator.js <command> [target]

Commands:
  generate-all          Generate all published demos and phases
  generate-demo <slug>  Generate a specific demo page
  generate-phase <slug> Generate a specific phase page
  generate-hub          Generate the demo hub page
            `);
    }
}

module.exports = DemoGenerator; 