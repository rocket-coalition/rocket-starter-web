#!/usr/bin/env node

/**
 * Example: Programmatic Content Creation
 * 
 * This script demonstrates how to create content programmatically
 * by directly calling the MCP server tools.
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Call an MCP tool
 */
function callTool(toolName, args) {
  return new Promise((resolve, reject) => {
    const serverProcess = spawn('node', [path.join(__dirname, '..', 'mcp-server', 'index.js')], {
      env: {
        ...process.env,
        CONTENT_PATH: path.join(__dirname, '..', 'site', 'content'),
      },
    });

    let output = '';
    let errorOutput = '';

    serverProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    serverProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    const request = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args,
      },
    };

    serverProcess.stdin.write(JSON.stringify(request) + '\n');
    serverProcess.stdin.end();

    serverProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}: ${errorOutput}`));
        return;
      }

      try {
        const response = JSON.parse(output);
        if (response.result && response.result.content) {
          const content = JSON.parse(response.result.content[0].text);
          resolve(content);
        } else {
          reject(new Error('Unexpected response format'));
        }
      } catch (err) {
        reject(new Error(`Failed to parse response: ${err.message}`));
      }
    });

    setTimeout(() => {
      serverProcess.kill();
      reject(new Error('Timeout'));
    }, 5000);
  });
}

/**
 * Example: Create a blog post
 */
async function createBlogPost() {
  console.log('📝 Creating blog post...\n');

  const result = await callTool('create_content_page', {
    title: 'Welcome to Our Blog',
    section: 'blog',
    description: 'An introduction to our blog and what you can expect',
    summary: 'Welcome post introducing our blog',
    content: `## Welcome!

We're excited to launch our blog. Here's what you can expect:

- **Regular Updates**: New posts every week
- **Quality Content**: Well-researched and practical articles
- **Community Focus**: Your feedback shapes our content

### What's Next?

Stay tuned for our upcoming posts on:

1. Getting started with the Rocket Design System
2. Building fast, accessible websites
3. Modern CSS techniques and tips

---

*Thank you for being part of our community!*`,
    tags: ['welcome', 'announcement', 'blog'],
    categories: ['News'],
    draft: false,
  });

  if (result.success) {
    console.log('✅ Blog post created successfully!\n');
    console.log('Path:', result.path);
    console.log('Slug:', result.frontMatter.slug);
    console.log('\nFront Matter:');
    console.log(JSON.stringify(result.frontMatter, null, 2));
  } else {
    console.error('❌ Failed to create blog post:', result.error);
  }

  return result;
}

/**
 * Example: List sections
 */
async function listSections() {
  console.log('\n📂 Listing content sections...\n');

  const result = await callTool('list_content_sections', {});

  if (result.success) {
    console.log('✅ Available sections:');
    result.sections.forEach(section => {
      console.log(`  • ${section}`);
    });
    console.log('\nContent path:', result.contentPath);
  } else {
    console.error('❌ Failed to list sections:', result.error);
  }

  return result;
}

/**
 * Example: Create multiple posts
 */
async function createMultiplePosts() {
  console.log('\n📚 Creating multiple posts...\n');

  const posts = [
    {
      title: 'CSS Grid Layout Guide',
      section: 'tutorials',
      description: 'Master CSS Grid with this comprehensive guide',
      tags: ['css', 'grid', 'layout'],
      categories: ['Tutorials'],
      content: '## Introduction\n\nCSS Grid is a powerful layout system...',
    },
    {
      title: 'Accessibility Best Practices',
      section: 'tutorials',
      description: 'Essential accessibility tips for modern websites',
      tags: ['accessibility', 'a11y', 'best-practices'],
      categories: ['Tutorials'],
      content: '## Why Accessibility Matters\n\nAccessibility ensures everyone can use your site...',
    },
  ];

  const results = [];
  for (const post of posts) {
    try {
      const result = await callTool('create_content_page', post);
      if (result.success) {
        console.log(`✅ Created: ${post.title}`);
        results.push(result);
      } else {
        console.error(`❌ Failed: ${post.title} - ${result.error}`);
      }
    } catch (err) {
      console.error(`❌ Error creating ${post.title}:`, err.message);
    }
  }

  console.log(`\n📊 Created ${results.length}/${posts.length} posts`);
  return results;
}

// Main execution
async function main() {
  console.log('🚀 Rocket Content Creation Examples\n');
  console.log('=' .repeat(60));

  try {
    // Example 1: List sections
    await listSections();

    console.log('\n' + '='.repeat(60));

    // Example 2: Create single blog post
    await createBlogPost();

    console.log('\n' + '='.repeat(60));

    // Example 3: Create multiple posts (commented out to avoid cluttering)
    // Uncomment to test:
    // await createMultiplePosts();

    console.log('\n✨ Examples completed!\n');
    console.log('Check site/content/ for the created files.');
    console.log('Run `hugo server -D` to preview them.\n');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { callTool, createBlogPost, listSections, createMultiplePosts };
