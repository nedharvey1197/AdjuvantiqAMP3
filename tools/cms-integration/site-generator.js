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
            'navigation.json',
            'branding.json',
            'demo-hub.json',
            'demo-cardiovascular.json',
            'demo-oncology.json',
            'demo-workflow.json'
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

        // Update global branding (applies to all pages)
        if (content.branding) {
            html = this.updateGlobalBranding(html, content.branding);
        }

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
                const profilePhoto = m.profile_photo || '';
                
                // Create photo element - use image if available, otherwise use initials
                const photoElement = profilePhoto 
                    ? `<img src="${profilePhoto}" alt="${name}" class="team-photo-img" />`
                    : `<div class="team-photo-initials">${initials}</div>`;
                
                return `\n                <div class="team-card fade-in">\n                    <div class="team-photo">${photoElement}</div>\n                    <h3>${name}</h3>\n                    <p class="team-role">${role}</p>\n                    <p class="team-bio">${bio}</p>\n                </div>`;
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

    // Update global branding (applies to all pages)
    updateGlobalBranding(html, branding) {
        if (!branding) return html;

        // Update company name in various places
        if (branding.company_name) {
            html = html.replace(/AdjuvantIQ/g, branding.company_name);
        }

        // Update company tagline in footer
        if (branding.company_tagline) {
            html = html.replace(
                /"Unlocking Billions in Lost Drug Development Value – One Trial at a Time"/g,
                `"${branding.company_tagline}"`
            );
        }

        // Update brand foundation elements
        if (branding.brand_foundation) {
            const foundation = branding.brand_foundation;
            
            // Update mission statement
            if (foundation.mission) {
                // This would need specific HTML elements to target
                // For now, we'll store it in a data attribute for potential use
                html = html.replace(
                    /<body([^>]*)>/,
                    `<body$1 data-brand-mission="${foundation.mission}">`
                );
            }

            // Update vision statement
            if (foundation.vision) {
                html = html.replace(
                    /<body([^>]*)>/,
                    `<body$1 data-brand-vision="${foundation.vision}">`
                );
            }

            // Update brand promise
            if (foundation.brand_promise) {
                html = html.replace(
                    /<body([^>]*)>/,
                    `<body$1 data-brand-promise="${foundation.brand_promise}">`
                );
            }
        }

        // Update contact information from branding
        if (branding.contact_info) {
            const contact = branding.contact_info;
            if (contact.invest_email) {
                html = html.replace(/invest@adjuvantiq\.com/g, contact.invest_email);
            }
            if (contact.pilot_email) {
                html = html.replace(/pilot@adjuvantiq\.com/g, contact.pilot_email);
            }
            if (contact.phone) {
                html = html.replace(/\+1 303-885-7143/g, contact.phone);
            }
            if (contact.website) {
                html = html.replace(/www\.adjuvantiq\.com/g, contact.website);
            }
        }

        // Apply global brand colors (these can be overridden by local theme)
        if (branding.brand_colors) {
            const colors = branding.brand_colors;
            const cssVars = [];
            if (colors.primary) cssVars.push(`--navy: ${colors.primary}`);
            if (colors.accent) cssVars.push(`--teal: ${colors.accent}`);
            if (colors.white) cssVars.push(`--white: ${colors.white}`);
            if (colors.warm_gray) cssVars.push(`--warm-gray: ${colors.warm_gray}`);
            if (colors.light_gray) cssVars.push(`--light-gray: ${colors.light_gray}`);

            if (cssVars.length > 0) {
                const cssVarsString = cssVars.join('; ');
                html = html.replace(
                    /:root\s*\{[^}]*\}/s,
                    `:root {\n        ${cssVarsString};\n    }`
                );
            }
        }

        // Apply color mapping rules
        if (branding.css_color_mapping) {
            const colorMapping = branding.css_color_mapping;
            let colorRules = '';
            
            // Generate CSS rules for each color mapping
            Object.keys(colorMapping).forEach(colorKey => {
                const colorConfig = colorMapping[colorKey];
                
                // HTML element rules
                if (colorConfig.html_elements && colorConfig.html_elements.length > 0) {
                    colorRules += `\n        ${colorConfig.html_elements.join(', ')} {\n            color: ${colorConfig.color_value};\n        }`;
                }
                
                // CSS class rules
                if (colorConfig.css_classes && colorConfig.css_classes.length > 0) {
                    colorRules += `\n        ${colorConfig.css_classes.join(', ')} {\n            color: ${colorConfig.color_value};\n        }`;
                }
            });
            
            // Insert color mapping rules after existing CSS
            if (colorRules) {
                html = html.replace(
                    /(\/\* Font Mapping Rules \*\/[^}]*\})/s,
                    `$1\n\n        /* Color Mapping Rules */${colorRules}`
                );
            }
        }

        // Apply background color mapping rules
        if (branding.css_background_mapping) {
            const bgMapping = branding.css_background_mapping;
            let bgRules = '';
            
            // Generate CSS rules for each background mapping
            Object.keys(bgMapping).forEach(bgKey => {
                const bgConfig = bgMapping[bgKey];
                
                // HTML element rules
                if (bgConfig.html_elements && bgConfig.html_elements.length > 0) {
                    bgRules += `\n        ${bgConfig.html_elements.join(', ')} {\n            background: ${bgConfig.background_value};\n        }`;
                }
                
                // CSS class rules
                if (bgConfig.css_classes && bgConfig.css_classes.length > 0) {
                    bgRules += `\n        ${bgConfig.css_classes.join(', ')} {\n            background: ${bgConfig.background_value};\n        }`;
                }
            });
            
            // Insert background mapping rules after color rules
            if (bgRules) {
                html = html.replace(
                    /(\/\* Color Mapping Rules \*\/[^}]*\})/s,
                    `$1\n\n        /* Background Mapping Rules */${bgRules}`
                );
            }
        }

        // Apply professional color pairing rules
        if (branding.professional_color_pairings) {
            const pairings = branding.professional_color_pairings;
            let pairingRules = '';
            
            // Apply safe background-font combinations
            if (pairings.safe_background_font_combinations) {
                Object.keys(pairings.safe_background_font_combinations).forEach(bgKey => {
                    const bgConfig = pairings.safe_background_font_combinations[bgKey];
                    
                    // Generate rules for each background type
                    if (bgConfig.html_elements && bgConfig.html_elements.length > 0) {
                        const elements = bgConfig.html_elements.join(', ');
                        const bgColor = bgConfig.background_color;
                        const fontColors = bgConfig.recommended_font_colors;
                        
                        pairingRules += `\n        /* ${bgConfig.description} */`;
                        pairingRules += `\n        ${elements} {`;
                        pairingRules += `\n            background: ${bgColor};`;
                        pairingRules += `\n        }`;
                        
                        // Apply font colors based on background
                        if (fontColors.headlines) {
                            pairingRules += `\n        ${elements} h1, ${elements} h2, ${elements} h3, ${elements} h4, ${elements} h5, ${elements} h6, ${elements} .section-title {`;
                            pairingRules += `\n            color: ${fontColors.headlines};`;
                            pairingRules += `\n        }`;
                        }
                        
                        if (fontColors.body_text) {
                            pairingRules += `\n        ${elements} p, ${elements} li, ${elements} span {`;
                            pairingRules += `\n            color: ${fontColors.body_text};`;
                            pairingRules += `\n        }`;
                        }
                        
                        if (fontColors.subheadings) {
                            pairingRules += `\n        ${elements} .subheading, ${elements} .subtitle, ${elements} .section-subtitle {`;
                            pairingRules += `\n            color: ${fontColors.subheadings};`;
                            pairingRules += `\n        }`;
                        }
                        
                        if (fontColors.links) {
                            pairingRules += `\n        ${elements} a, ${elements} .link {`;
                            pairingRules += `\n            color: ${fontColors.links};`;
                            pairingRules += `\n        }`;
                        }
                        
                        if (fontColors.buttons) {
                            pairingRules += `\n        ${elements} .button, ${elements} .btn, ${elements} .cta-button {`;
                            pairingRules += `\n            color: ${fontColors.buttons};`;
                            pairingRules += `\n        }`;
                        }
                    }
                });
            }
            
            // Apply approved gradients
            if (pairings.approved_gradients) {
                Object.keys(pairings.approved_gradients).forEach(gradientKey => {
                    const gradientConfig = pairings.approved_gradients[gradientKey];
                    
                    if (gradientConfig.html_elements && gradientConfig.html_elements.length > 0) {
                        const elements = gradientConfig.html_elements.join(', ');
                        const gradientValue = gradientConfig.gradient_value;
                        const fontColors = gradientConfig.recommended_font_colors;
                        
                        pairingRules += `\n        /* ${gradientConfig.description} */`;
                        pairingRules += `\n        ${elements} {`;
                        pairingRules += `\n            background: ${gradientValue};`;
                        pairingRules += `\n        }`;
                        
                        // Apply font colors for gradients
                        if (fontColors.headlines) {
                            pairingRules += `\n        ${elements} h1, ${elements} h2, ${elements} h3, ${elements} h4, ${elements} h5, ${elements} h6 {`;
                            pairingRules += `\n            color: ${fontColors.headlines};`;
                            pairingRules += `\n        }`;
                        }
                        
                        if (fontColors.body_text) {
                            pairingRules += `\n        ${elements} p, ${elements} li, ${elements} span {`;
                            pairingRules += `\n            color: ${fontColors.body_text};`;
                            pairingRules += `\n        }`;
                        }
                    }
                });
            }
            
            // Insert professional pairing rules after background rules
            if (pairingRules) {
                html = html.replace(
                    /(\/\* Background Mapping Rules \*\/[^}]*\})/s,
                    `$1\n\n        /* Professional Color Pairing Rules */${pairingRules}`
                );
            }
        }

        // Apply global typography
        if (branding.typography && branding.typography.google_fonts_href) {
            html = html.replace(
                /<link[^>]*href="[^"]*fonts\.googleapis\.com[^"]*"[^>]*>/s,
                `<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="${branding.typography.google_fonts_href}" rel="stylesheet">`
            );
        }

        // Apply font mapping rules
        if (branding.typography && branding.typography.css_font_mapping) {
            const mapping = branding.typography.css_font_mapping;
            
            // Find the existing CSS section and add font mapping rules
            if (mapping.source_sans_pro) {
                const sourceSansRules = mapping.source_sans_pro.html_elements.join(', ') + ' {\n            font-family: ' + mapping.source_sans_pro.font_family + ';\n        }';
                
                // Add CSS classes for manual font control
                const sourceSansClasses = mapping.source_sans_pro.css_classes.join(', ') + ' {\n            font-family: ' + mapping.source_sans_pro.font_family + ';\n        }';
                
                // Insert font mapping rules after existing typography section
                html = html.replace(
                    /(\/\* Typography \*\/\s*body\s*\{[^}]*\})/s,
                    `$1\n\n        /* Font Mapping Rules */\n        ${sourceSansRules}\n        ${sourceSansClasses}`
                );
            }
            
            if (mapping.merriweather) {
                const merriweatherRules = mapping.merriweather.html_elements.join(', ') + ' {\n            font-family: ' + mapping.merriweather.font_family + ';\n        }';
                
                const merriweatherClasses = mapping.merriweather.css_classes.join(', ') + ' {\n            font-family: ' + mapping.merriweather.font_family + ';\n        }';
                
                // Add Merriweather rules
                html = html.replace(
                    /(\/\* Font Mapping Rules \*\/[^}]*\})/s,
                    `$1\n        ${merriweatherRules}\n        ${merriweatherClasses}`
                );
            }
        }

        // Store key messaging for potential use in content generation
        if (branding.key_messaging) {
            const messaging = branding.key_messaging;
            if (messaging.value_propositions && messaging.value_propositions.length > 0) {
                html = html.replace(
                    /<body([^>]*)>/,
                    `<body$1 data-value-propositions='${JSON.stringify(messaging.value_propositions)}'>`
                );
            }
            if (messaging.differentiators && messaging.differentiators.length > 0) {
                html = html.replace(
                    /<body([^>]*)>/,
                    `<body$1 data-differentiators='${JSON.stringify(messaging.differentiators)}'>`
                );
            }
        }

        return html;
    }

    // Update theme (colors and fonts) - now overrides global branding
    updateTheme(html, theme) {
        if (!theme) return html;

        // Update CSS variables in :root (overrides global branding)
        if (theme.primary_color || theme.accent_color || theme.white || theme.warm_gray || theme.light_gray) {
            const cssVars = [];
            if (theme.primary_color) cssVars.push(`--navy: ${theme.primary_color}`);
            if (theme.accent_color) cssVars.push(`--teal: ${theme.accent_color}`);
            if (theme.white) cssVars.push(`--white: ${theme.white}`);
            if (theme.warm_gray) cssVars.push(`--warm-gray: ${theme.warm_gray}`);
            if (theme.light_gray) cssVars.push(`--light-gray: ${theme.light_gray}`);

            if (cssVars.length > 0) {
                const cssVarsString = cssVars.join('; ');
                // This will override the global branding colors
                html = html.replace(
                    /:root\s*\{[^}]*\}/s,
                    `:root {\n        ${cssVarsString};\n    }`
                );
            }
        }

        // Update Google Fonts link (overrides global branding)
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
        this.centralizeDemoStyling();
        console.log('Site generation complete!');
    }

    // Centralize demo styling without breaking existing functionality
    centralizeDemoStyling() {
        try {
            const content = this.loadSiteContent();
            const branding = content.branding;
            
            // Load demo components from separate file
            const demoComponentsPath = path.join(this.contentDir, 'demo-components.json');
            let demoComponents;
            
            try {
                demoComponents = JSON.parse(fs.readFileSync(demoComponentsPath, 'utf8'));
            } catch (error) {
                console.log('No demo component specifications found in demo-components.json - skipping demo styling');
                return;
            }

            const demoFiles = [
                'demo/oncology.html',
                'demo/cardiovascular.html',
                'demo/protocol-design.html',
                'demo/site-selection.html',
                'demo/regulatory-strategy.html',
                'demo/adaptive-modifications.html'
            ];
            
            demoFiles.forEach(file => {
                try {
                    const filePath = path.join(this.outputDir, file);
                    if (fs.existsSync(filePath)) {
                        this.centralizeDemoFileStyling(filePath, branding, demoComponents);
                    } else {
                        console.log(`Demo file not found: ${file}`);
                    }
                } catch (fileError) {
                    console.log(`Error processing demo file ${file}:`, fileError.message);
                }
            });
        } catch (error) {
            console.log('Demo styling centralization failed - continuing with build:', error.message);
        }
    }
    
    // Centralize styling for individual demo file
    centralizeDemoFileStyling(filePath, branding, demoComponents) {
        try {
            console.log(`Centralizing styling for: ${filePath}`);
            let html = fs.readFileSync(filePath, 'utf8');
            
            // Generate centralized CSS from brand data
            const centralizedCSS = this.generateCentralizedCSS(demoComponents);
            
            // Inject centralized CSS without removing existing styles
            html = this.injectCentralizedCSS(html, centralizedCSS);
            
            fs.writeFileSync(filePath, html);
            console.log(`Centralized styling for: ${filePath}`);
        } catch (error) {
            console.log(`Error processing ${filePath}:`, error.message);
        }
    }

    // Generate centralized CSS from component specifications
    generateCentralizedCSS(components) {
        try {
            if (!components || typeof components !== 'object') {
                console.log('Invalid components data - generating minimal CSS');
                return '\n        /* Centralized Demo Component Styles - Minimal Fallback */\n';
            }
            
            let css = '\n        /* Centralized Demo Component Styles - Generated from CMS */\n';
            
            // Reasoning Boxes
            if (components.reasoning_boxes) {
            const rb = components.reasoning_boxes;
            css += `
        /* Centralized Reasoning Box Styles */
        .reasoning-box {
            background: ${rb.background} !important;
            border: ${rb.border} !important;
            padding: ${rb.padding} !important;
            margin: ${rb.margin} !important;
            border-radius: ${rb.border_radius} !important;
            cursor: ${rb.cursor} !important;
            transition: ${rb.transition} !important;
            position: ${rb.position} !important;
        }
        
        .reasoning-box:hover {
            box-shadow: ${rb.hover_effects.box_shadow} !important;
        }
        
        .reasoning-box.expanded {
            background: ${rb.expanded.background} !important;
        }
        
        .reasoning-box::before {
            content: ${rb.before_content.content} !important;
            position: ${rb.before_content.position} !important;
            top: ${rb.before_content.top} !important;
            left: ${rb.before_content.left} !important;
            background: ${rb.before_content.background} !important;
            color: ${rb.before_content.color} !important;
            padding: ${rb.before_content.padding} !important;
            font-size: ${rb.before_content.font_size} !important;
            font-weight: ${rb.before_content.font_weight} !important;
            border-radius: ${rb.before_content.border_radius} !important;
        }
        
        .reasoning-header {
            font-weight: ${rb.typography.header.font_weight} !important;
            color: ${rb.typography.header.color} !important;
            display: ${rb.typography.header.display} !important;
            justify-content: ${rb.typography.header.justify_content} !important;
            align-items: ${rb.typography.header.align_items} !important;
        }
        
        .expand-icon {
            font-size: ${rb.typography.expand_icon.font_size} !important;
            margin-left: ${rb.typography.expand_icon.margin_left} !important;
            transition: ${rb.typography.expand_icon.transition} !important;
        }
        
        .reasoning-box.expanded .expand-icon {
            transform: ${rb.typography.expand_icon.expanded_transform} !important;
        }
        
        .reasoning-details {
            margin-top: ${rb.typography.details.margin_top} !important;
            display: ${rb.typography.details.display} !important;
        }
        
        .reasoning-box.expanded .reasoning-details {
            display: ${rb.typography.details.expanded_display} !important;
        }`;
        }

        // Feedback System
        if (components.feedback_system) {
            const fs = components.feedback_system;
            css += `
        /* Centralized Feedback Section Styles */
        .feedback-section {
            position: ${fs.position} !important;
            margin: ${fs.margin} !important;
            padding: ${fs.padding} !important;
            background: ${fs.background} !important;
            border-radius: ${fs.border_radius} !important;
            border: ${fs.border} !important;
            box-shadow: ${fs.box_shadow} !important;
            animation: ${fs.animation} !important;
        }
        
        .feedback-title {
            text-align: ${fs.typography.title.text_align} !important;
            font-size: ${fs.typography.title.font_size} !important;
            color: ${fs.typography.title.color} !important;
            margin-bottom: ${fs.typography.title.margin_bottom} !important;
            font-weight: ${fs.typography.title.font_weight} !important;
        }
        
        .feedback-buttons {
            display: ${fs.buttons.display} !important;
            flex-wrap: ${fs.buttons.flex_wrap} !important;
            gap: ${fs.buttons.gap} !important;
            justify-content: ${fs.buttons.justify_content} !important;
            margin-top: ${fs.buttons.margin_top} !important;
        }
        
        .feedback-button {
            background: ${fs.button.background} !important;
            color: ${fs.button.color} !important;
            border: ${fs.button.border} !important;
            padding: ${fs.button.padding} !important;
            border-radius: ${fs.button.border_radius} !important;
            font-weight: ${fs.button.font_weight} !important;
            cursor: ${fs.button.cursor} !important;
            transition: ${fs.button.transition} !important;
            box-shadow: ${fs.button.box_shadow} !important;
        }
        
        .feedback-button:hover {
            background: ${fs.button.hover.background} !important;
            transform: ${fs.button.hover.transform} !important;
            box-shadow: ${fs.button.hover.box_shadow} !important;
        }
        
        .feedback-section::before {
            content: ${fs.arrows.content} !important;
            position: ${fs.arrows.position} !important;
            top: ${fs.arrows.top} !important;
            transform: ${fs.arrows.transform} !important;
            font-size: ${fs.arrows.font_size} !important;
            color: ${fs.arrows.color} !important;
            font-weight: ${fs.arrows.font_weight} !important;
            animation: ${fs.arrows.animation} !important;
            left: ${fs.arrows.before.left} !important;
        }
        
        .feedback-section::after {
            content: ${fs.arrows.content} !important;
            position: ${fs.arrows.position} !important;
            top: ${fs.arrows.top} !important;
            transform: ${fs.arrows.after.transform} !important;
            font-size: ${fs.arrows.font_size} !important;
            color: ${fs.arrows.color} !important;
            font-weight: ${fs.arrows.font_weight} !important;
            animation: ${fs.arrows.animation} !important;
            right: ${fs.arrows.after.right} !important;
        }`;
        }

        // Collapsible Sections
        if (components.collapsible_sections) {
            const cs = components.collapsible_sections;
            css += `
        /* Centralized Collapsible Section Styles */
        .collapsible-section {
            margin: ${cs.margin} !important;
            border-radius: ${cs.border_radius} !important;
            box-shadow: ${cs.box_shadow} !important;
            overflow: ${cs.overflow} !important;
            background: ${cs.background} !important;
        }
        
        .section-header {
            background: ${cs.header.background} !important;
            padding: ${cs.header.padding} !important;
            border-bottom: ${cs.header.border_bottom} !important;
            cursor: ${cs.header.cursor} !important;
            display: ${cs.header.display} !important;
            justify-content: ${cs.header.justify_content} !important;
            align-items: ${cs.header.align_items} !important;
            transition: ${cs.header.transition} !important;
        }
        
        .section-header:hover {
            background: ${cs.header.hover.background} !important;
        }
        
        .section-header h3 {
            font-size: ${cs.header.typography.font_size} !important;
            color: ${cs.header.typography.color} !important;
            margin: ${cs.header.typography.margin} !important;
        }
        
        .section-toggle-container {
            display: ${cs.toggle_container.display} !important;
            align-items: ${cs.toggle_container.align_items} !important;
            gap: ${cs.toggle_container.gap} !important;
            font-size: ${cs.toggle_container.font_size} !important;
            color: ${cs.toggle_container.color} !important;
            font-weight: ${cs.toggle_container.font_weight} !important;
        }
        
        .section-toggle {
            background: ${cs.toggle.background} !important;
            color: ${cs.toggle.color} !important;
            border: ${cs.toggle.border} !important;
            border-radius: ${cs.toggle.border_radius} !important;
            width: ${cs.toggle.width} !important;
            height: ${cs.toggle.height} !important;
            display: ${cs.toggle.display} !important;
            align-items: ${cs.toggle.align_items} !important;
            justify-content: ${cs.toggle.justify_content} !important;
            cursor: ${cs.toggle.cursor} !important;
            font-size: ${cs.toggle.font_size} !important;
            transition: ${cs.toggle.transition} !important;
        }
        
        .section-toggle:hover {
            background: ${cs.toggle.hover.background} !important;
            transform: ${cs.toggle.hover.transform} !important;
        }
        
        .section-toggle.collapsed {
            transform: ${cs.toggle.collapsed.transform} !important;
        }
        
        .section-content {
            max-height: ${cs.content.max_height} !important;
            overflow: ${cs.content.overflow} !important;
            transition: ${cs.content.transition} !important;
        }
        
        .section-content.collapsed {
            max-height: ${cs.content.collapsed.max_height} !important;
        }
        
        .section-list {
            padding: ${cs.list.padding} !important;
            background: ${cs.list.background} !important;
            border-top: ${cs.list.border_top} !important;
        }`;
        }

        // Progressive Disclosure
        if (components.progressive_disclosure) {
            const pd = components.progressive_disclosure;
            
            // Workflow Step Progressive Disclosure
            if (pd.workflow_step) {
                const ws = pd.workflow_step;
                css += `
        /* Centralized Progressive Disclosure - Workflow Steps */
        .workflow-step {
            opacity: ${ws.initial_state.opacity} !important;
            transform: ${ws.initial_state.transform} !important;
            transition: ${ws.initial_state.transition} !important;
        }
        
        .workflow-step.in-view {
            opacity: ${ws.in_view_state.opacity} !important;
            transform: ${ws.in_view_state.transform} !important;
        }
        
        .workflow-step.expanded {
            background: ${ws.expanded_state.background} !important;
            transform: ${ws.expanded_state.transform} !important;
        }`;
            }
            
            // Phase Card Progressive Disclosure
            if (pd.phase_card) {
                const pc = pd.phase_card;
                css += `
        /* Centralized Progressive Disclosure - Phase Cards */
        .phase-card {
            opacity: ${pc.initial_state.opacity} !important;
            transform: ${pc.initial_state.transform} !important;
            transition: ${pc.initial_state.transition} !important;
        }
        
        .phase-card.in-view {
            opacity: ${pc.in_view_state.opacity} !important;
            transform: ${pc.in_view_state.transform} !important;
        }
        
        .phase-card.expanded {
            grid-column: ${pc.expanded_state.grid_column} !important;
            background: ${pc.expanded_state.background} !important;
            transform: ${pc.expanded_state.transform} !important;
        }`;
            }
        }

        // Animations
        if (components.animations) {
            css += `
        /* Centralized Animation Keyframes */
        @keyframes feedbackGlow {
            0% {
                box-shadow: ${components.animations.feedbackGlow['0%'].box_shadow};
            }
            100% {
                box-shadow: ${components.animations.feedbackGlow['100%'].box_shadow};
            }
        }
        
        @keyframes arrowPulse {
            0%, 100% {
                opacity: ${components.animations.arrowPulse['0%, 100%'].opacity};
                transform: ${components.animations.arrowPulse['0%, 100%'].transform};
            }
            50% {
                opacity: ${components.animations.arrowPulse['50%'].opacity};
                transform: ${components.animations.arrowPulse['50%'].transform};
            }
        }`;
        }

        return css;
        } catch (error) {
            console.log('Error generating centralized CSS:', error.message);
            return '\n        /* Centralized Demo Component Styles - Error Fallback */\n';
        }
    }

    // Inject centralized CSS without removing existing styles
    injectCentralizedCSS(html, centralizedCSS) {
        // Find the existing style tag and inject centralized CSS before the closing tag
        const styleTagRegex = /<style>([\s\S]*?)<\/style>/;
        const match = html.match(styleTagRegex);
        
        if (match) {
            const existingCSS = match[1];
            const newCSS = existingCSS + centralizedCSS;
            html = html.replace(styleTagRegex, `<style>${newCSS}</style>`);
        } else {
            // If no style tag exists, create one in the head
            const headCloseRegex = /<\/head>/;
            const styleTag = `    <style>${centralizedCSS}\n    </style>\n    </head>`;
            html = html.replace(headCloseRegex, styleTag);
        }
        
        return html;
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