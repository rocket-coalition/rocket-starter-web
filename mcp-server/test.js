#!/usr/bin/env node

/**
 * Test script for Rocket MCP Server
 * 
 * Tests the content creation functionality
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test data
const tests = [
  {
    name: 'List content sections',
    request: {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'list_content_sections',
        arguments: {},
      },
    },
  },
  {
    name: 'Create a test blog post',
    request: {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'create_content_page',
        arguments: {
          title: 'Test Blog Post',
          section: 'blog',
          description: 'A test blog post created by MCP',
          content: '## Introduction\n\nThis is a test post created via MCP.',
          tags: ['test', 'mcp'],
          categories: ['Testing'],
          draft: true,
        },
      },
    },
  },
];

function runTest(test) {
  return new Promise((resolve, reject) => {
    console.log(`\n🧪 Running test: ${test.name}`);
    console.log('Request:', JSON.stringify(test.request, null, 2));

    const serverProcess = spawn('node', [path.join(__dirname, 'index.js')], {
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

    // Send the request
    serverProcess.stdin.write(JSON.stringify(test.request) + '\n');
    serverProcess.stdin.end();

    serverProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('❌ Server exited with code:', code);
        console.error('Error output:', errorOutput);
        reject(new Error(`Server exited with code ${code}`));
        return;
      }

      console.log('✅ Test completed');
      console.log('Response:', output);
      console.log('Stderr:', errorOutput);
      resolve({ output, errorOutput });
    });

    // Timeout after 5 seconds
    setTimeout(() => {
      serverProcess.kill();
      reject(new Error('Test timeout'));
    }, 5000);
  });
}

async function runAllTests() {
  console.log('🚀 Starting Rocket MCP Server Tests\n');
  console.log('=' .repeat(60));

  for (const test of tests) {
    try {
      await runTest(test);
      console.log('✅ Test passed:', test.name);
    } catch (error) {
      console.error('❌ Test failed:', test.name);
      console.error('Error:', error.message);
    }
    console.log('=' .repeat(60));
  }

  console.log('\n✨ All tests completed');
}

runAllTests().catch((error) => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
