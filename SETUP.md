# MCP Integration Setup Guide

This guide walks you through setting up the Rocket MCP server for automated content management with proper security considerations.

## Prerequisites

- Node.js v18 or higher
- Hugo v0.146.0 (extended version)
- Git
- An MCP-compatible client (e.g., Claude Desktop, GitHub Copilot, etc.)

## Installation Steps

### 1. Install MCP Server Dependencies

```bash
cd mcp-server
npm install
```

### 2. Configure Your MCP Client

#### For Claude Desktop

1. Locate your configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. Add the Rocket MCP server configuration:

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

**Important**: Use absolute paths, not relative paths.

3. Restart Claude Desktop completely (quit and reopen).

#### For GitHub Copilot

Check your editor's MCP configuration documentation for how to add custom MCP servers.

### 3. Verify Installation

Use your MCP client to test the connection:

**Test prompt**:
> "List the available content sections in the Rocket site"

Expected response should show available sections like "about", "faq", etc.

### 4. Set Up GitHub Actions (Optional but Recommended)

For automated deployment when content is added:

1. Add secrets to your GitHub repository:
   - Go to Settings → Secrets and variables → Actions
   - Add `NETLIFY_AUTH_TOKEN` (get from Netlify account settings)
   - Add `NETLIFY_SITE_ID` (get from Netlify site settings)

2. The workflow file `.github/workflows/deploy.yml` is already configured to:
   - Trigger on content changes
   - Build the site
   - Deploy to Netlify

## Security Considerations

### 1. File System Access

The MCP server has write access to your content directory. Consider:

- **Principle of Least Privilege**: Only grant access to the content directory
- **File Validation**: The server validates paths to prevent directory traversal
- **Overwrite Protection**: Existing files cannot be overwritten

### 2. Input Validation

The server validates all inputs:
- Required fields (title) are checked
- File paths are sanitized
- YAML front matter is validated

### 3. Environment Variables

Never commit sensitive environment variables:
- Use `.env` files (already in `.gitignore`)
- Use secrets management for CI/CD
- Don't hardcode paths in shared configs

### 4. MCP Client Security

- Only install MCP servers from trusted sources
- Review server code before installation
- Keep Node.js and dependencies updated

### 5. Git Best Practices

- Review all changes before committing
- Use branches for content changes
- Enable branch protection on main branch
- Require pull request reviews for production content

## Usage Workflow

### Creating Content via MCP

1. **Start your MCP client** (e.g., Claude Desktop)

2. **Request content creation**:
   ```
   Create a new blog post titled "My First Post" with:
   - Section: blog
   - Description: "An introduction to our blog"
   - Tags: welcome, introduction
   - Draft: false
   ```

3. **Review the created file**:
   ```bash
   cat site/content/blog/index.md
   ```

4. **Commit and push**:
   ```bash
   git add site/content/blog/
   git commit -m "Add blog post: My First Post"
   git push origin main
   ```

5. **Automated deployment** (if GitHub Actions is set up):
   - Push triggers build workflow
   - Site builds and deploys automatically
   - Live in ~45-55 seconds

### Manual Build and Deploy

If not using GitHub Actions:

```bash
# Build the site
cd site
npm run build

# Deploy (method depends on your hosting)
# Example for Netlify CLI:
netlify deploy --prod
```

## Troubleshooting

### MCP Server Not Found

**Symptom**: Client can't connect to server

**Solutions**:
- Verify absolute paths in configuration
- Check that `node` is in your PATH
- Ensure dependencies are installed (`npm install` in mcp-server)
- Restart your MCP client completely

### Permission Denied Errors

**Symptom**: Can't write files

**Solutions**:
- Check directory permissions: `ls -la site/content`
- Ensure CONTENT_PATH is correct
- Verify user has write access to content directory

### YAML Parsing Errors

**Symptom**: Front matter not formatted correctly

**Solutions**:
- Check for special characters in input
- Verify quote escaping in titles/descriptions
- Review the generated file manually

### Build Failures

**Symptom**: Hugo build fails after content creation

**Solutions**:
- Run `hugo server -D` locally to see errors
- Check front matter syntax
- Verify all required Hugo configuration is present
- Review Hugo error messages in build logs

### Deployment Delays

**Symptom**: Content not appearing on live site quickly

**Solutions**:
- Verify GitHub Actions workflow is running
- Check Netlify build logs
- Ensure draft is set to `false`
- Clear CDN cache if applicable

## Advanced Configuration

### Custom Front Matter Fields

Extend the MCP server to support custom fields:

1. Edit `mcp-server/index.js`
2. Add fields to `generateFrontMatter` function
3. Update tool schema in `ListToolsRequestSchema` handler
4. Restart the server

### Multiple Content Types

Create different archetypes:

1. Create files in `site/archetypes/` (e.g., `blog.md`, `article.md`)
2. Modify MCP server to support archetype selection
3. Add archetype parameter to tool schema

### Content Templates

Use content templates for consistent structure:

1. Store templates in a `templates/` directory
2. Modify MCP server to load templates
3. Add template selection to tool parameters

## Monitoring and Logs

### MCP Server Logs

The server logs to stderr. To see logs:
- Check your MCP client's log files
- For Claude Desktop: Check console in developer tools

### Build Logs

- **GitHub Actions**: View in Actions tab on GitHub
- **Netlify**: View in Netlify dashboard under Deploys
- **Local**: Terminal output from `hugo` command

### Content Audit

Track content changes:

```bash
# See all content files
git log --follow site/content/

# See recent content changes
git log --oneline --since="7 days ago" -- site/content/
```

## Best Practices

1. **Use Drafts for Review Workflows**
   - Create content with `draft: true`
   - Review and edit manually
   - Set `draft: false` when ready to publish

2. **Organize Content in Sections**
   - Use clear section names (blog, articles, docs, etc.)
   - Keep related content together
   - Follow Hugo's content organization conventions

3. **Maintain Consistent Metadata**
   - Always include description for SEO
   - Use consistent tag naming
   - Add meaningful categories

4. **Test Locally First**
   - Run `hugo server -D` to preview
   - Check formatting and layout
   - Verify links and images work

5. **Automate Where Possible**
   - Use GitHub Actions for CI/CD
   - Set up automated testing
   - Enable automatic dependency updates

6. **Version Control Everything**
   - Commit content changes regularly
   - Use meaningful commit messages
   - Tag releases for production deploys

## Getting Help

- **MCP Server Issues**: Check [mcp-server/README.md](mcp-server/README.md)
- **Hugo Issues**: See [Hugo documentation](https://gohugo.io/documentation/)
- **Deployment Issues**: Check your hosting provider's documentation
- **General Questions**: Open an issue in the repository

## Updating the MCP Server

To update to a new version:

```bash
cd mcp-server
npm update
```

Review changelog before updating in production.

## Uninstalling

To remove the MCP integration:

1. Remove the server configuration from your MCP client config
2. Delete the `mcp-server/` directory (optional)
3. Remove `.github/workflows/deploy.yml` if not needed
4. Restart your MCP client

The existing content files remain unaffected.
