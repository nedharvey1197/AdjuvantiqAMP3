# Netlify CMS Integration for Demo Management

This system allows you to create and manage demo content through Netlify CMS, then automatically generate HTML pages using your existing template engine.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Access the CMS
- Go to `https://your-site.netlify.app/admin`
- Login with your GitHub account
- You'll see two new sections: "Demo Management" and "Demo Phases"

## How It Works

### Demo Management
- **Create new demos** through the web interface
- **Edit existing demo content** without touching code
- **Manage demo metadata** (title, slug, type, features)
- **Control publishing** with a simple toggle

### Demo Phases
- **Create individual phases** for multi-phase demos
- **Link phases together** with next/previous navigation
- **Manage persona information** for each phase
- **Control workflow steps** with structured content

### Automatic Generation
- **CMS saves content** as JSON files in `content/demos/` and `content/demo-phases/`
- **Template engine** reads JSON and generates HTML
- **Build process** automatically updates demo pages

## Usage

### Creating a New Demo

1. **Go to CMS**: Visit `/admin` on your site
2. **Click "New Demo"**: In the Demo Management section
3. **Fill in details**:
   - Title: "Cardiovascular Outcomes Trial Design"
   - Slug: "cardiovascular-trial"
   - Type: "primary" or "specialized"
   - Icon: "🎯"
   - Features: List key capabilities
4. **Add workflow steps**: Each step includes user input, system analysis, recommendations, and key decisions
5. **Publish**: Toggle "Published" to true

### Creating Demo Phases

1. **Go to CMS**: Visit `/admin` on your site
2. **Click "New Demo Phase"**: In the Demo Phases section
3. **Fill in details**:
   - Title: "Protocol Design & Optimization"
   - Slug: "protocol-design"
   - Parent Demo: "cardiovascular-trial"
   - Phase Number: 1
   - Total Phases: 4
4. **Add persona**: Name, role, bio, and challenge
5. **Add workflow steps**: Same structure as main demos
6. **Link phases**: Set next/previous phase slugs
7. **Publish**: Toggle "Published" to true

### Generating Pages

```bash
# Generate all published demos and phases
npm run generate-demos

# Generate specific demo
npm run generate-demo cardiovascular-trial

# Generate specific phase
npm run generate-phase protocol-design

# Generate demo hub page
npm run generate-hub
```

## File Structure

```
content/
├── demos/                    # Demo content from CMS
│   ├── cardiovascular-trial.json
│   └── oncology-biomarker.json
├── demo-phases/             # Phase content from CMS
│   ├── protocol-design.json
│   ├── site-selection.json
│   └── regulatory-strategy.json
└── ...                      # Other site content

demo/                        # Generated HTML pages
├── index.html              # Demo hub
├── cardiovascular-trial.html
├── oncology-biomarker.html
├── protocol-design.html
└── ...

tools/
├── cms-integration/        # CMS integration tools
│   ├── demo-generator.js   # Main generation script
│   └── README.md          # This file
└── template-engine/        # Your existing templates
```

## Integration with Your Template Engine

The system works with your existing template engine by:

1. **Reading JSON content** from CMS
2. **Applying Handlebars templates** to generate HTML
3. **Maintaining your existing styling** and functionality
4. **Preserving all interactive features** (feedback, navigation, etc.)

## Deployment

### Netlify
- **Automatic builds** when content changes
- **Git-based workflow** for version control
- **Preview deployments** for testing changes

### Build Process
1. CMS saves content to JSON files
2. Build script runs `npm run generate-demos`
3. Generated HTML is deployed to Netlify

## Benefits

- **Non-technical team members** can create demos
- **Consistent structure** across all demos
- **Version control** for all content changes
- **Preview before publishing** with draft mode
- **Automatic generation** eliminates manual HTML editing
- **Scalable** - easy to add new demos and phases

## Next Steps

1. **Set up Netlify Identity** for team access
2. **Configure build hooks** for automatic generation
3. **Add image upload** for demo assets
4. **Create custom widgets** for specialized content
5. **Add validation** for content structure 