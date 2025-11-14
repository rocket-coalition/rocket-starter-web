#!/bin/bash

# Rocket MCP Server Quick Setup Script
# This script helps configure the MCP server for first-time use

set -e

echo "🚀 Rocket MCP Server Setup"
echo "================================"
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Get absolute path to repository
REPO_PATH="$(cd "$(dirname "$0")" && pwd)"
MCP_SERVER_PATH="$REPO_PATH/mcp-server"
CONTENT_PATH="$REPO_PATH/site/content"

echo "Repository path: $REPO_PATH"
echo ""

# Install dependencies
echo "Installing MCP server dependencies..."
cd "$MCP_SERVER_PATH"
npm install
echo "✅ Dependencies installed"
echo ""

# Detect OS
OS="unknown"
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
    CONFIG_PATH="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    OS="windows"
    CONFIG_PATH="$APPDATA/Claude/claude_desktop_config.json"
else
    OS="linux"
    CONFIG_PATH="$HOME/.config/Claude/claude_desktop_config.json"
fi

echo "Detected OS: $OS"
echo ""

# Generate configuration
echo "📝 MCP Server Configuration:"
echo "================================"
echo ""
echo "Add this to your MCP client configuration:"
echo ""

if [ "$OS" == "windows" ]; then
    # Windows path formatting
    MCP_SERVER_PATH_JSON=$(echo "$MCP_SERVER_PATH/index.js" | sed 's/\\/\\\\/g')
    CONTENT_PATH_JSON=$(echo "$CONTENT_PATH" | sed 's/\\/\\\\/g')
else
    MCP_SERVER_PATH_JSON="$MCP_SERVER_PATH/index.js"
    CONTENT_PATH_JSON="$CONTENT_PATH"
fi

cat << EOF
{
  "mcpServers": {
    "rocket-content": {
      "command": "node",
      "args": ["$MCP_SERVER_PATH_JSON"],
      "env": {
        "CONTENT_PATH": "$CONTENT_PATH_JSON"
      }
    }
  }
}
EOF

echo ""
echo "================================"
echo ""

# Offer to update Claude Desktop config automatically
if [ "$OS" == "macos" ] || [ "$OS" == "linux" ]; then
    echo "Claude Desktop configuration file: $CONFIG_PATH"
    echo ""
    
    if [ -f "$CONFIG_PATH" ]; then
        read -p "Would you like to automatically update your Claude Desktop config? (y/n) " -n 1 -r
        echo ""
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            # Backup existing config
            cp "$CONFIG_PATH" "$CONFIG_PATH.backup.$(date +%s)"
            echo "✅ Backed up existing config"
            
            # Create new config with rocket-content server
            # This is a simple append, a more sophisticated merge would be better
            echo "⚠️  Manual merge required - please add the configuration above to: $CONFIG_PATH"
            echo "   A backup was created at: $CONFIG_PATH.backup.*"
        fi
    else
        echo "ℹ️  Claude Desktop config not found. You'll need to create it manually."
        echo "   Location: $CONFIG_PATH"
    fi
fi

echo ""
echo "================================"
echo "✨ Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Add the configuration to your MCP client"
echo "2. Restart your MCP client (e.g., Claude Desktop)"
echo "3. Test with: 'List the available content sections'"
echo ""
echo "Documentation:"
echo "  • Full setup guide: SETUP.md"
echo "  • API reference: mcp-server/README.md"
echo "  • Examples: mcp-server/EXAMPLES.md"
echo ""
echo "🚀 Happy launching!"
