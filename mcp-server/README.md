# Rocket MCP Server

MCP (Model Context Protocol) server for managing content in Rocket Starter Web. This server enables AI assistants and automated tools to create and manage Hugo content pages with proper front matter.

## Features

- **Create Content Pages**: Automatically generate new content pages with proper Hugo front matter
- **Section Management**: Create content in different sections (blog, articles, etc.)
- **Front Matter Generation**: Automatically format title, date, description, tags, categories, and more
- **Draft Support**: Control whether content is published or kept as draft
- **Validation**: Ensures required fields are present and prevents overwriting existing files

## Installation

```bash
cd mcp-server
npm install
```

## Usage with MCP-Compatible Clients

### Configuration

Add the Rocket MCP server to your MCP client configuration:

```json
{
  "mcpServers": {
    "rocket-content": {
      "command": "node",
      "args": ["/path/to/rocket-starter-web/mcp-server/index.js"],
      "env": {
        "CONTENT_PATH": "/path/to/rocket-starter-web/site/content"
      }
    }
  }
}
```

For Claude Desktop, add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows).

### Available Tools

#### 1. `create_content_page`

Create a new content page with Hugo front matter.

**Parameters:**
- `title` (required): Page title
- `section` (optional): Content section (e.g., "blog", "posts"). Creates directory if needed.
- `filename` (optional): Filename (default: "index.md")
- `content` (optional): Page content in Markdown
- `description` (optional): Short description for SEO
- `summary` (optional): Summary for list pages
- `draft` (optional): Boolean, whether this is a draft (default: false)
- `slug` (optional): Custom URL slug (auto-generated from title if not provided)
- `tags` (optional): Array of tags
- `categories` (optional): Array of categories

**Example:**
```json
{
  "title": "Getting Started with Rocket",
  "section": "blog",
  "description": "Learn how to get started with the Rocket Design System",
  "content": "## Welcome\n\nThis is your first post...",
  "tags": ["tutorial", "getting-started"],
  "categories": ["Guides"],
  "draft": false
}
```

**Response:**
```json
{
  "success": true,
  "path": "/path/to/site/content/blog/index.md",
  "relativePath": "blog/index.md",
  "frontMatter": {
    "title": "Getting Started with Rocket",
    "date": "2025-11-14T00:00:00.000Z",
    "draft": false,
    "description": "Learn how to get started with the Rocket Design System",
    "summary": "",
    "slug": "getting-started-with-rocket",
    "tags": ["tutorial", "getting-started"],
    "categories": ["Guides"]
  }
}
```

#### 2. `list_content_sections`

List all existing content sections.

**Parameters:** None

**Response:**
```json
{
  "success": true,
  "sections": ["about", "faq", "blog", "posts"],
  "contentPath": "/path/to/site/content"
}
```

## Example Workflows

### Publishing a New Blog Post

Using an MCP-compatible AI assistant:

```
Create a new blog post titled "10 Tips for Better CSS" in the blog section with:
- Description: "Practical tips to improve your CSS skills"
- Tags: css, web-development, tips
- Categories: Tutorials
- Content: [your article content here]
- Set draft to false so it's published immediately
```

The assistant will use the `create_content_page` tool to:
1. Create `/site/content/blog/index.md` (or next available name)
2. Generate proper front matter with all metadata
3. Include your content
4. Set draft: false for immediate publishing

### Quick Article Publishing

The goal is to have articles live within one minute:

1. **Content Creation** (via MCP): ~5 seconds
   - AI assistant creates the markdown file with proper front matter
   
2. **Build Process** (automated):
   - CSS compilation: ~1 second
   - Hugo build: ~2-5 seconds
   - Total: ~6-10 seconds

3. **Deployment** (Netlify/similar):
   - Git push triggers build
   - Deploy time: ~30-40 seconds

**Total time: ~45-55 seconds from content creation to live site**

## Integration with GitHub

For automated deployment:

1. Commit the new content file
2. Push to your repository
3. Your CI/CD pipeline (Netlify, GitHub Pages, etc.) automatically builds and deploys

Example git workflow:
```bash
git add site/content/blog/your-new-post/index.md
git commit -m "Add new blog post: Your Title"
git push origin main
```

## Environment Variables

- `CONTENT_PATH`: Path to Hugo content directory (default: `../site/content`)

## Front Matter Structure

Generated front matter follows Hugo conventions:

```yaml
---
title: "Your Title"
date: 2025-11-14T12:00:00.000Z
draft: false
description: "Short description"
summary: "Optional summary"
slug: "your-title"
tags:
  - tag1
  - tag2
categories:
  - Category1
---
```

## Error Handling

The server provides clear error messages:
- Missing required fields (e.g., title)
- File already exists
- Invalid paths
- Permission issues

## Development

Run in development mode:
```bash
cd mcp-server
node index.js
```

The server communicates via stdio (standard input/output) following the MCP protocol.

## Testing

Test the server manually:
```bash
cd mcp-server
node index.js
```

Then send MCP protocol messages via stdin to test tool execution.

## Architecture

- **Protocol**: Model Context Protocol (MCP)
- **Transport**: stdio
- **Tools**: Two primary tools for content management
- **Integration**: Designed to work with Hugo static site generator

## Future Enhancements

- Content editing/updating capabilities
- Content deletion with safety checks
- Bulk content operations
- Template selection
- Image upload and management
- Content preview generation

## Troubleshooting

### Server won't start
- Ensure Node.js v18+ is installed
- Run `npm install` in the mcp-server directory
- Check that CONTENT_PATH points to valid directory

### Files not being created
- Verify CONTENT_PATH environment variable
- Check file system permissions
- Ensure section directories are writable

### Front matter not parsing
- Verify YAML syntax
- Check for special characters in values
- Ensure proper indentation

## Contributing

See the main repository's CONTRIBUTING.md for guidelines on contributing to this MCP server.

## License

Part of the Rocket Starter Web project.
