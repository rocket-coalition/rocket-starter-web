#!/usr/bin/env node

/**
 * Rocket MCP Server
 * 
 * MCP server for managing Hugo content in Rocket Starter Web.
 * Provides tools for creating content pages with proper front matter.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

// Get content path from environment or use default
const CONTENT_PATH = process.env.CONTENT_PATH || path.join(process.cwd(), '..', 'site', 'content');

/**
 * Format date to Hugo's expected format (ISO 8601)
 */
function formatDate(date = new Date()) {
  return date.toISOString();
}

/**
 * Generate front matter for a new content page
 */
function generateFrontMatter(options) {
  const {
    title,
    description = '',
    summary = '',
    draft = false,
    slug,
    tags = [],
    categories = [],
    date = formatDate(),
  } = options;

  const frontMatter = {
    title,
    date,
    draft,
    description,
    summary,
    slug: slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  };

  // Only add tags and categories if they're provided
  if (tags.length > 0) {
    frontMatter.tags = tags;
  }
  if (categories.length > 0) {
    frontMatter.categories = categories;
  }

  return frontMatter;
}

/**
 * Create a new content page
 */
async function createContentPage(params) {
  const {
    section = '',
    filename = 'index.md',
    title,
    content = '',
    description,
    summary,
    draft = false,
    slug,
    tags = [],
    categories = [],
  } = params;

  // Validate required fields
  if (!title) {
    throw new Error('Title is required');
  }

  // Generate front matter
  const frontMatter = generateFrontMatter({
    title,
    description,
    summary,
    draft,
    slug,
    tags,
    categories,
  });

  // Create the full file content
  const frontMatterYaml = yaml.dump(frontMatter, { lineWidth: -1 });
  const fileContent = `---
${frontMatterYaml}---

${content || `# ${title}

Write your content here.`}
`;

  // Determine the file path
  let filePath;
  if (section) {
    const sectionPath = path.join(CONTENT_PATH, section);
    await fs.mkdir(sectionPath, { recursive: true });
    filePath = path.join(sectionPath, filename);
  } else {
    filePath = path.join(CONTENT_PATH, filename);
  }

  // Check if file already exists
  try {
    await fs.access(filePath);
    throw new Error(`File already exists: ${filePath}`);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  // Write the file
  await fs.writeFile(filePath, fileContent, 'utf8');

  return {
    success: true,
    path: filePath,
    relativePath: path.relative(CONTENT_PATH, filePath),
    frontMatter,
  };
}

/**
 * List existing content sections
 */
async function listContentSections() {
  try {
    const entries = await fs.readdir(CONTENT_PATH, { withFileTypes: true });
    const sections = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(name => !name.startsWith('.'));
    
    return {
      success: true,
      sections,
      contentPath: CONTENT_PATH,
    };
  } catch (err) {
    throw new Error(`Failed to list sections: ${err.message}`);
  }
}

// Create MCP server
const server = new Server(
  {
    name: 'rocket-content',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'create_content_page',
        description: 'Create a new content page with Hugo front matter. This will create a markdown file in the specified section with proper front matter formatting.',
        inputSchema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Page title (required)',
            },
            section: {
              type: 'string',
              description: 'Content section (e.g., "blog", "posts", "articles"). Leave empty for root content. Creates directory if it doesn\'t exist.',
            },
            filename: {
              type: 'string',
              description: 'Filename (default: "index.md"). Use "index.md" for leaf bundles.',
              default: 'index.md',
            },
            content: {
              type: 'string',
              description: 'Page content in Markdown format',
            },
            description: {
              type: 'string',
              description: 'Short description for SEO and previews',
            },
            summary: {
              type: 'string',
              description: 'Optional summary for list pages',
            },
            draft: {
              type: 'boolean',
              description: 'Whether this is a draft (default: false)',
              default: false,
            },
            slug: {
              type: 'string',
              description: 'Custom URL slug (auto-generated from title if not provided)',
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Tags for the content',
            },
            categories: {
              type: 'array',
              items: { type: 'string' },
              description: 'Categories for the content',
            },
          },
          required: ['title'],
        },
      },
      {
        name: 'list_content_sections',
        description: 'List all existing content sections in the Hugo site',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'create_content_page': {
        const result = await createContentPage(args);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'list_content_sections': {
        const result = await listContentSections();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: error.message,
          }, null, 2),
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Rocket MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
