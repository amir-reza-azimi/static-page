const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

// Configuration
const config = {
    contentDir: path.join(__dirname, 'content'),
    templateDir: path.join(__dirname, 'templates'),
    outputDir: path.join(__dirname, '..', 'dist'),
    staticDir: path.join(__dirname, 'static')
};

// Create necessary directories
fs.ensureDirSync(config.outputDir);
fs.ensureDirSync(path.join(config.outputDir, 'css'));
fs.ensureDirSync(path.join(config.outputDir, 'js'));
fs.ensureDirSync(path.join(config.outputDir, 'images'));

// Copy static assets to their respective folders
fs.copySync(
    path.join(config.staticDir, 'css'),
    path.join(config.outputDir, 'css')
);
fs.copySync(
    path.join(config.staticDir, 'js'),
    path.join(config.outputDir, 'js')
);
fs.copySync(
    path.join(config.staticDir, 'images'),
    path.join(config.outputDir, 'images')
);

// Read base template
const baseTemplate = fs.readFileSync(
    path.join(config.templateDir, 'base.html'),
    'utf-8'
);

// Custom renderer to prevent code block transformation for HTML content
const renderer = new marked.Renderer();
renderer.code = function(code, language) {
    // If it looks like HTML, return it as-is
    if (code.includes('<') && code.includes('>')) {
        return code;
    }
    // Otherwise, render as normal code block
    return `<pre><code class="language-${language}">${code}</code></pre>`;
};

marked.setOptions({
    headerIds: false,
    mangle: false,
    html: true,
    renderer: renderer,
    gfm: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: true
});

// Copy static assets
fs.copySync(config.staticDir, config.outputDir);

// Process markdown files
async function buildSite() {
    const pages = fs.readdirSync(config.contentDir)
        .filter(file => file.endsWith('.md'));

    for (const page of pages) {
        const source = fs.readFileSync(
            path.join(config.contentDir, page),
            'utf-8'
        );
        
        // Parse frontmatter and content
        const { data, content } = matter(source);
        
        // Convert markdown to HTML
        const htmlContent = marked(content);
        
        // Replace template variables
        let html = baseTemplate
            .replace('{{title}}', data.title || 'My Website')
            .replace('{{content}}', htmlContent);
        
        // Write output file
        const outputPath = path.join(
            config.outputDir,
            page.replace('.md', '.html')
        );
        fs.writeFileSync(outputPath, html);
    }
}

buildSite().catch(console.error); 