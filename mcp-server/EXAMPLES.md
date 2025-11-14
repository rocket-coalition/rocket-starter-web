# Rocket MCP Integration Examples

This directory contains example configurations and usage patterns for the Rocket MCP Server.

## Claude Desktop Integration

### Configuration

1. Open Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the Rocket MCP server:

```json
{
  "mcpServers": {
    "rocket-content": {
      "command": "node",
      "args": ["/absolute/path/to/rocket-starter-web/mcp-server/index.js"],
      "env": {
        "CONTENT_PATH": "/absolute/path/to/rocket-starter-web/site/content"
      }
    }
  }
}
```

3. Restart Claude Desktop

### Example Conversations

#### Create a New Blog Post

**You:**
> Use the rocket-content MCP server to create a new blog post titled "Getting Started with Rocket Design System" in the blog section. Include a description "Learn the basics of the Rocket Design System", tags for "tutorial" and "design-system", and set it as published (not a draft).

**Claude will:**
1. Use the `create_content_page` tool
2. Create `/site/content/blog/index.md` with proper front matter
3. Confirm the file was created successfully

#### List Available Sections

**You:**
> What content sections are available in the Rocket site?

**Claude will:**
1. Use the `list_content_sections` tool
2. Show you all available sections (about, faq, blog, etc.)

#### Create an Article with Full Content

**You:**
> Create a new article in the "articles" section titled "10 CSS Tips for Better Performance" with this content:
> 
> ## Introduction
> CSS performance matters...
> 
> ## Tip 1: Use CSS Custom Properties
> ...
> 
> Include tags: css, performance, web-development
> Categories: Tutorials
> Description: Practical CSS tips to improve your website's performance

**Claude will:**
1. Create the article with all specified metadata
2. Format the front matter correctly
3. Include your full content
4. Set appropriate tags and categories

## GitHub Copilot Integration

If you're using GitHub Copilot in an MCP-compatible editor:

1. Configure the MCP server in your editor's settings
2. Reference the server when asking Copilot to create content
3. Copilot can use the tools to automate content creation

Example prompt:
```
@mcp Create a new FAQ page in the faq section about "How to customize themes"
```

## Automated Workflows

### Quick Content Publishing Script

Create a shell script to automate content creation and deployment:

```bash
#!/bin/bash
# publish-article.sh

# Create content via MCP (example with curl or direct tool call)
node mcp-server/create-article.js "$1" "$2" "$3"

# Build the site
cd site
npm run build

# Deploy (example with Netlify CLI)
netlify deploy --prod
```

### CI/CD Integration

Example GitHub Actions workflow to trigger builds when content is added:

```yaml
name: Build and Deploy

on:
  push:
    paths:
      - 'site/content/**'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Build
        run: |
          cd site
          npm install
          npm run build
      - name: Deploy
        # Your deployment step
```

## Integration with Other Tools

### Zapier/Make Integration

You could create a workflow that:
1. Receives webhook with article data
2. Calls MCP server to create content
3. Triggers git commit and push
4. Notifies team of new content

### Content Management Dashboard

Build a simple web interface that:
1. Collects article information via form
2. Calls MCP server via Node.js backend
3. Shows success/error feedback
4. Lists all published content

### Scheduled Publishing

Create a Node.js script that:
1. Reads articles from a queue (JSON file, database, etc.)
2. Uses MCP tools to create content at scheduled times
3. Automatically commits and pushes changes

## Example: Programmatic Content Creation

```javascript
import { spawn } from 'child_process';

function createArticle(articleData) {
  return new Promise((resolve, reject) => {
    const server = spawn('node', ['mcp-server/index.js'], {
      env: {
        CONTENT_PATH: './site/content'
      }
    });

    const request = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'create_content_page',
        arguments: articleData
      }
    };

    let response = '';
    server.stdout.on('data', (data) => {
      response += data.toString();
    });

    server.on('close', () => {
      resolve(JSON.parse(response));
    });

    server.stdin.write(JSON.stringify(request) + '\n');
    server.stdin.end();
  });
}

// Usage
createArticle({
  title: 'My New Article',
  section: 'blog',
  description: 'An amazing article',
  content: '## Hello World\n\nThis is my content.',
  tags: ['news', 'updates'],
  draft: false
}).then(result => {
  console.log('Article created:', result);
});
```

## Best Practices

1. **Always validate input** before creating content
2. **Use drafts** for review workflows
3. **Automate builds** with CI/CD
4. **Monitor content** creation for errors
5. **Back up** your content directory regularly
6. **Test locally** before deploying to production

## Troubleshooting

### Tool not showing in Claude

- Verify the path to index.js is absolute
- Check that CONTENT_PATH is correct
- Restart Claude Desktop completely
- Check Claude Desktop logs for errors

### Content not appearing on site

- Verify `draft: false` is set
- Check that the build process ran
- Ensure the section exists in your Hugo config
- Run `hugo server -D` to see drafts locally

### Permission errors

- Ensure the process has write access to content directory
- Check file ownership
- Verify directory exists and is writable

## Getting Help

- See [mcp-server/README.md](../mcp-server/README.md) for server documentation
- Check [MCP documentation](https://modelcontextprotocol.io) for protocol details
- Open an issue in the repository for bugs or questions
