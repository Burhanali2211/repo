#!/usr/bin/env node

/**
 * Comprehensive Production Test Script
 * Tests for white screen issues, bundle loading problems, and runtime errors
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Starting Comprehensive Production Test...\n');

// Test 1: Check if build files exist
function testBuildFiles() {
  console.log('📁 Testing Build Files...');

  const distPath = path.join(path.dirname(__dirname), 'dist');
  const requiredFiles = [
    'index.html',
    'assets',
    '_redirects',
    '.htaccess'
  ];

  const missingFiles = [];

  requiredFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file);
    }
  });

  if (missingFiles.length > 0) {
    console.log('❌ Missing build files:', missingFiles);
    return false;
  }

  console.log('✅ All required build files present\n');
  return true;
}

// Test 2: Check index.html for critical issues
function testIndexHtml() {
  console.log('📄 Testing index.html...');

  const indexPath = path.join(path.dirname(__dirname), 'dist', 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.log('❌ index.html not found');
    return false;
  }

  const content = fs.readFileSync(indexPath, 'utf8');

  // Check for critical elements
  const checks = [
    { name: 'Root div', pattern: /<div id="root">/ },
    { name: 'Script tags', pattern: /<script.*src=.*\.js/ },
    { name: 'CSS links', pattern: /<link.*href=.*\.css/ },
    { name: 'Meta viewport', pattern: /<meta.*viewport/ },
    { name: 'Title tag', pattern: /<title>/ }
  ];

  const failed = [];

  checks.forEach(check => {
    if (!check.pattern.test(content)) {
      failed.push(check.name);
    }
  });

  if (failed.length > 0) {
    console.log('❌ Missing critical elements:', failed);
    return false;
  }

  console.log('✅ index.html structure is valid\n');
  return true;
}

// Test 3: Check for chunk loading issues
function testChunkStructure() {
  console.log('📦 Testing Chunk Structure...');

  const assetsPath = path.join(path.dirname(__dirname), 'dist', 'assets');

  if (!fs.existsSync(assetsPath)) {
    console.log('❌ Assets directory not found');
    return false;
  }

  const files = fs.readdirSync(assetsPath);

  // Check for critical chunks
  const criticalChunks = [
    'react-core',
    'react-dom',
    'main',
    'index'
  ];

  const missingChunks = [];

  criticalChunks.forEach(chunk => {
    const hasChunk = files.some(file => file.includes(chunk) && file.endsWith('.js'));
    if (!hasChunk) {
      missingChunks.push(chunk);
    }
  });

  if (missingChunks.length > 0) {
    console.log('❌ Missing critical chunks:', missingChunks);
    return false;
  }

  console.log('✅ All critical chunks present\n');
  return true;
}

// Test 4: Check environment configuration
function testEnvironmentConfig() {
  console.log('🔧 Testing Environment Configuration...');

  const envPath = path.join(path.dirname(__dirname), '.env');

  if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found');
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');

  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];

  const missingVars = [];

  requiredVars.forEach(varName => {
    if (!envContent.includes(varName) || envContent.includes(`${varName}=`)) {
      const line = envContent.split('\n').find(line => line.startsWith(varName));
      if (!line || line.split('=')[1]?.trim() === '') {
        missingVars.push(varName);
      }
    }
  });

  if (missingVars.length > 0) {
    console.log('❌ Missing or empty environment variables:', missingVars);
    return false;
  }

  console.log('✅ Environment configuration is valid\n');
  return true;
}

// Test 5: Check for TypeScript compilation issues
function testTypeScriptCompilation() {
  console.log('🔍 Testing TypeScript Compilation...');

  try {
    // Run TypeScript compiler check
    execSync('npx tsc --noEmit --skipLibCheck', {
      stdio: 'pipe',
      cwd: path.dirname(__dirname)
    });

    console.log('✅ TypeScript compilation successful\n');
    return true;
  } catch (error) {
    console.log('❌ TypeScript compilation errors detected');
    console.log('Error output:', error.stdout?.toString() || error.message);
    return false;
  }
}

// Test 6: Check hosting configuration
function testHostingConfig() {
  console.log('🌐 Testing Hosting Configuration...');

  const configs = [
    { name: 'Netlify', file: 'netlify.toml' },
    { name: 'Vercel', file: 'vercel.json' },
    { name: 'Firebase', file: 'firebase.json' }
  ];

  const availableConfigs = [];

  configs.forEach(config => {
    const configPath = path.join(path.dirname(__dirname), config.file);
    if (fs.existsSync(configPath)) {
      availableConfigs.push(config.name);
    }
  });

  if (availableConfigs.length === 0) {
    console.log('⚠️  No hosting configuration files found');
    return false;
  }

  console.log('✅ Available hosting configs:', availableConfigs.join(', '), '\n');
  return true;
}

// Run all tests
async function runAllTests() {
  const tests = [
    { name: 'Build Files', fn: testBuildFiles },
    { name: 'Index HTML', fn: testIndexHtml },
    { name: 'Chunk Structure', fn: testChunkStructure },
    { name: 'Environment Config', fn: testEnvironmentConfig },
    { name: 'TypeScript Compilation', fn: testTypeScriptCompilation },
    { name: 'Hosting Config', fn: testHostingConfig }
  ];

  const results = [];

  for (const test of tests) {
    try {
      const result = test.fn();
      results.push({ name: test.name, passed: result });
    } catch (error) {
      console.log(`❌ ${test.name} failed with error:`, error.message);
      results.push({ name: test.name, passed: false, error: error.message });
    }
  }

  // Summary
  console.log('📊 Test Summary:');
  console.log('================');

  const passed = results.filter(r => r.passed).length;
  const total = results.length;

  results.forEach(result => {
    const status = result.passed ? '✅' : '❌';
    console.log(`${status} ${result.name}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });

  console.log(`\n📈 Overall: ${passed}/${total} tests passed`);

  if (passed === total) {
    console.log('🎉 All tests passed! Your application should work in production.');
  } else {
    console.log('⚠️  Some tests failed. Please address the issues above before deploying.');
  }

  return passed === total;
}

// Run the tests
runAllTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test runner failed:', error);
  process.exit(1);
});
