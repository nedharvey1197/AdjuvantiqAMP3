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
            'strategy.json',
            'platform.json',
            'team.json',
            'pilot.json',
            'contact.json',
            'stats.json',
            'seo.json',
            'theme.json',
            'navigation.json'
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

        // Update navigation
        if (content.navigation) {
            html = this.updateNavigation(html, content.navigation);
        }

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

        // Update strategy section
        if (content.strategy) {
            html = this.updateStrategySection(html, content.strategy);
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

        // Update theme (colors and fonts)
        if (content.theme) {
            html = this.updateTheme(html, content.theme);
        }

        fs.writeFileSync(indexPath, html);
        console.log('Updated main site with CMS content');
    }

    // Update navigation
    updateNavigation(html, navigation) {
        // Update logo text
        if (navigation.logo_text) {
            html = html.replace(/<div[^>]*class="[^"]*logo[^"]*"[^>]*>.*?<\/div>/s, `<div class="logo">${navigation.logo_text}</div>`);
        }

        // Update navigation links
        if (Array.isArray(navigation.nav_links)) {
            const navLinksHtml = navigation.nav_links.map(link => 
                `<a href="${link.href}">${link.text}</a>`
            ).join('');

            html = html.replace(
                /<div[^>]*class="[^"]*nav-links[^"]*"[^>]*>[\s\S]*?<\/div>/s,
                `<div class="nav-links">${navLinksHtml}</div>`
            );
        }

        // Update demo button
        if (navigation.demo_button) {
            html = html.replace(
                /<a[^>]*class="[^"]*demo-link[^"]*"[^>]*>.*?<\/a>/s,
                `<a href="${navigation.demo_button.href}" class="demo-link">${navigation.demo_button.text}</a>`
            );
        }

        // Update pilot button
        if (navigation.pilot_button) {
            html = html.replace(
                /<a[^>]*class="[^"]*cta-button[^"]*"[^>]*>.*?<\/a>/s,
                `<a href="${navigation.pilot_button.href}" class="cta-button">${navigation.pilot_button.text}</a>`
            );
        }

        return html;
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

    // Update strategy section
    updateStrategySection(html, strategy) {
        if (strategy.title) {
            html = html.replace(/<h2[^>]*class="[^"]*section-title[^"]*"[^>]*>.*?<\/h2>/s, `<h2 class="section-title">${strategy.title}</h2>`);
        }
        
        // Update winner zone
        if (strategy.winner_zone) {
            const winnerZone = strategy.winner_zone;
            html = html.replace(
                /<div class="zone winner-zone">[\s\S]*?<\/div>/s,
                `<div class="zone winner-zone">
                    <div class="zone-label">${winnerZone.label}</div>
                    <div class="zone-title">${winnerZone.title}</div>
                    <div class="solution-highlight">
                        <strong>${winnerZone.company_name}</strong>
                        <p>${winnerZone.description}</p>
                    </div>
                </div>`
            );
        }
        
        // Update commodity zone
        if (strategy.commodity_zone) {
            const commodityZone = strategy.commodity_zone;
            html = html.replace(
                /<div class="zone commodity-zone">[\s\S]*?<\/div>/s,
                `<div class="zone commodity-zone">
                    <div class="zone-label">${commodityZone.label}</div>
                    <div class="zone-title">${commodityZone.title}</div>
                    <p style="font-size: 1.1rem; color: rgba(255, 255, 255, 0.8);">
                        ${commodityZone.technologies}
                    </p>
                </div>`
            );
        }
        
        // Update insight
        if (strategy.insight) {
            const insight = strategy.insight;
            html = html.replace(
                /<div class="fade-in" style="background: linear-gradient\(135deg, #3498db 0%, #2980b9 100%\); border-radius: 15px; padding: 2rem; text-align: center; color: white; margin-top: 3rem;">[\s\S]*?<\/div>/s,
                `<div class="fade-in" style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); border-radius: 15px; padding: 2rem; text-align: center; color: white; margin-top: 3rem;">
                <h3 style="margin-bottom: 1rem;">${insight.title}</h3>
                <p style="font-size: 1.2rem; line-height: 1.6;">${insight.description}</p>
            </div>`
            );
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
        // Replace the entire team section to avoid duplication
        if (team.title && team.subtitle && Array.isArray(team.members) && team.members.length > 0) {
            const membersHtml = team.members.map(m => {
                const initials = (m.initials || (m.name || '')
                    .split(/\s+/)
                    .map(p => p[0])
                    .join('')
                    .toUpperCase()).slice(0, 3);
                const name = m.name || '';
                const role = m.role || '';
                const bio = m.bio || '';
                return `\n                <div class="team-card fade-in">\n                    <div class="team-photo">${initials}</div>\n                    <h3>${name}</h3>\n                    <p class="team-role">${role}</p>\n                    <p class="team-bio">${bio}</p>\n                </div>`;
            }).join('');

            const teamSectionHtml = `    <!-- Team Section -->
    <section class="team" id="team">
        <div class="container">
            <div class="section-header fade-in">
                <h2 class="section-title" style="color: #333;">${team.title}</h2>
                <p class="section-subtitle" style="color: #666;">${team.subtitle}</p>
            </div>
            <div class="team-grid">${membersHtml}
            </div>
        </div>
    </section>`;

            html = html.replace(
                /<!-- Team Section -->[\s\S]*?<!-- Contact Form Section -->/s,
                teamSectionHtml + '\n\n    <!-- Contact Form Section -->'
            );
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

    // Update theme (colors and fonts)
    updateTheme(html, theme) {
        if (!theme) return html;

        // Update CSS variables in :root
        if (theme.primary_color || theme.accent_color || theme.white || theme.warm_gray || theme.light_gray) {
            const cssVars = [];
            if (theme.primary_color) cssVars.push(`--navy: ${theme.primary_color}`);
            if (theme.accent_color) cssVars.push(`--teal: ${theme.accent_color}`);
            if (theme.white) cssVars.push(`--white: ${theme.white}`);
            if (theme.warm_gray) cssVars.push(`--warm-gray: ${theme.warm_gray}`);
            if (theme.light_gray) cssVars.push(`--light-gray: ${theme.light_gray}`);

            if (cssVars.length > 0) {
                const cssVarsString = cssVars.join('; ');
                html = html.replace(
                    /:root\s*\{[^}]*\}/s,
                    `:root {\n        ${cssVarsString};\n    }`
                );
            }
        }

        // Update Google Fonts link
        if (theme.google_fonts_href) {
            html = html.replace(
                /<link[^>]*href="[^"]*fonts\.googleapis\.com[^"]*"[^>]*>/s,
                `<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="${theme.google_fonts_href}" rel="stylesheet">`
            );
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