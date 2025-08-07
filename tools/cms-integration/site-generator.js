#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class SiteGenerator {
    constructor() {
        this.contentDir = path.join(__dirname, '../../content');
        this.outputDir = path.join(__dirname, '../../');
    }

    // Load site content from CMS
    loadSiteContent() {
        const content = {};
        const contentFiles = [
            'hero.json',
            'problem.json', 
            'solution.json',
            'platform.json',
            'team.json',
            'pilot.json',
            'contact.json',
            'stats.json',
            'seo.json'
        ];

        contentFiles.forEach(file => {
            const filePath = path.join(this.contentDir, file);
            if (fs.existsSync(filePath)) {
                const key = file.replace('.json', '');
                content[key] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            }
        });

        return content;
    }

    // Update main index.html with CMS content
    updateMainSite() {
        const content = this.loadSiteContent();
        const indexPath = path.join(this.outputDir, 'index.html');
        
        if (!fs.existsSync(indexPath)) {
            console.log('Main index.html not found - skipping site update');
            return;
        }

        let html = fs.readFileSync(indexPath, 'utf8');

        // Update hero section
        if (content.hero) {
            html = this.updateHeroSection(html, content.hero);
        }

        // Update problem section
        if (content.problem) {
            html = this.updateProblemSection(html, content.problem);
        }

        // Update solution section
        if (content.solution) {
            html = this.updateSolutionSection(html, content.solution);
        }

        // Update platform section
        if (content.platform) {
            html = this.updatePlatformSection(html, content.platform);
        }

        // Update team section
        if (content.team) {
            html = this.updateTeamSection(html, content.team);
        }

        // Update pilot section
        if (content.pilot) {
            html = this.updatePilotSection(html, content.pilot);
        }

        // Update contact information
        if (content.contact) {
            html = this.updateContactInfo(html, content.contact);
        }

        // Update company stats
        if (content.stats) {
            html = this.updateCompanyStats(html, content.stats);
        }

        // Update SEO
        if (content.seo) {
            html = this.updateSEO(html, content.seo);
        }

        fs.writeFileSync(indexPath, html);
        console.log('Updated main site with CMS content');
    }

    // Update hero section
    updateHeroSection(html, hero) {
        if (hero.title) {
            html = html.replace(/<h1[^>]*>.*?<\/h1>/s, `<h1>${hero.title}</h1>`);
        }
        if (hero.subtitle) {
            html = html.replace(/<p[^>]*class="[^"]*lead[^"]*"[^>]*>.*?<\/p>/s, `<p class="lead">${hero.subtitle}</p>`);
        }
        if (hero.tagline) {
            html = html.replace(/<p[^>]*class="[^"]*tagline[^"]*"[^>]*>.*?<\/p>/s, `<p class="tagline">${hero.tagline}</p>`);
        }
        return html;
    }

    // Update problem section
    updateProblemSection(html, problem) {
        if (problem.title) {
            html = html.replace(/<h2[^>]*class="[^"]*section-title[^"]*"[^>]*>.*?<\/h2>/s, `<h2 class="section-title">${problem.title}</h2>`);
        }
        if (problem.subtitle) {
            html = html.replace(/<p[^>]*class="[^"]*section-subtitle[^"]*"[^>]*>.*?<\/p>/s, `<p class="section-subtitle">${problem.subtitle}</p>`);
        }
        return html;
    }

    // Update solution section
    updateSolutionSection(html, solution) {
        if (solution.title) {
            html = html.replace(/<h2[^>]*class="[^"]*section-title[^"]*"[^>]*>.*?<\/h2>/s, `<h2 class="section-title">${solution.title}</h2>`);
        }
        if (solution.subtitle) {
            html = html.replace(/<p[^>]*class="[^"]*section-subtitle[^"]*"[^>]*>.*?<\/p>/s, `<p class="section-subtitle">${solution.subtitle}</p>`);
        }
        return html;
    }

    // Update platform section
    updatePlatformSection(html, platform) {
        if (platform.title) {
            html = html.replace(/<h2[^>]*class="[^"]*section-title[^"]*"[^>]*>.*?<\/h2>/s, `<h2 class="section-title">${platform.title}</h2>`);
        }
        if (platform.subtitle) {
            html = html.replace(/<p[^>]*class="[^"]*section-subtitle[^"]*"[^>]*>.*?<\/p>/s, `<p class="section-subtitle">${platform.subtitle}</p>`);
        }
        return html;
    }

    // Update team section
    updateTeamSection(html, team) {
        if (team.title) {
            html = html.replace(/<h2[^>]*class="[^"]*section-title[^"]*"[^>]*>.*?<\/h2>/s, `<h2 class="section-title">${team.title}</h2>`);
        }
        if (team.subtitle) {
            html = html.replace(/<p[^>]*class="[^"]*section-subtitle[^"]*"[^>]*>.*?<\/p>/s, `<p class="section-subtitle">${team.subtitle}</p>`);
        }
        return html;
    }

    // Update pilot section
    updatePilotSection(html, pilot) {
        if (pilot.title) {
            html = html.replace(/<h2[^>]*class="[^"]*section-title[^"]*"[^>]*>.*?<\/h2>/s, `<h2 class="section-title">${pilot.title}</h2>`);
        }
        if (pilot.subtitle) {
            html = html.replace(/<p[^>]*class="[^"]*section-subtitle[^"]*"[^>]*>.*?<\/p>/s, `<p class="section-subtitle">${pilot.subtitle}</p>`);
        }
        return html;
    }

    // Update contact information
    updateContactInfo(html, contact) {
        if (contact.invest_email) {
            html = html.replace(/invest@adjuvantiq\.com/g, contact.invest_email);
        }
        if (contact.pilot_email) {
            html = html.replace(/pilot@adjuvantiq\.com/g, contact.pilot_email);
        }
        if (contact.phone) {
            html = html.replace(/\+1 303-885-7143/g, contact.phone);
        }
        return html;
    }

    // Update company stats
    updateCompanyStats(html, stats) {
        if (stats.arr) {
            html = html.replace(/\$75-120M/g, stats.arr);
        }
        if (stats.market_size) {
            html = html.replace(/~6,400/g, stats.market_size);
        }
        if (stats.ltv_cac) {
            html = html.replace(/15-20x/g, stats.ltv_cac);
        }
        if (stats.partner_limit) {
            html = html.replace(/25/g, stats.partner_limit);
        }
        return html;
    }

    // Update SEO
    updateSEO(html, seo) {
        if (seo.title) {
            html = html.replace(/<title>.*?<\/title>/s, `<title>${seo.title}</title>`);
        }
        if (seo.description) {
            html = html.replace(/<meta[^>]*name="description"[^>]*>/s, `<meta name="description" content="${seo.description}">`);
        }
        if (seo.keywords) {
            html = html.replace(/<meta[^>]*name="keywords"[^>]*>/s, `<meta name="keywords" content="${seo.keywords}">`);
        }
        return html;
    }

    // Generate everything
    generateAll() {
        console.log('Starting site generation...');
        this.updateMainSite();
        console.log('Site generation complete!');
    }
}

// CLI interface
if (require.main === module) {
    const generator = new SiteGenerator();
    const command = process.argv[2];

    switch (command) {
        case 'generate':
            generator.generateAll();
            break;
        default:
            console.log(`
Usage: node site-generator.js <command>

Commands:
  generate    Update main site with CMS content
            `);
    }
}

module.exports = SiteGenerator; 