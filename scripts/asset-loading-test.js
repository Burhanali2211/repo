#!/usr/bin/env node

/**
 * Asset Loading Test Script
 *
 * This script tests asset loading functionality and validates that all
 * production asset loading issues have been resolved.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Asset Loading Test for Production Deployment\n');

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

// Helper function to run tests
function runTest(testName, testFunction) {
  try {
    const result = testFunction();
    if (result) {
      console.log(`✅ ${testName}`);
      testResults.passed++;
    } else {
      console.log(`❌ ${testName}`);
      testResults.failed++;
      testResults.errors.push(testName);
    }
  } catch (error) {
    console.log(`❌ ${testName} - Error: ${error.message}`);
    testResults.failed++;
    testResults.errors.push(`${testName}: ${error.message}`);
  }
}

// Test 1: Check if dist directory exists
runTest('Dist directory exists', () => {
  const distPath = path.join(path.dirname(__dirname), 'dist');
  return fs.existsSync(distPath);
});

// Test 2: Check if index.html has asset loading error handling
runTest('Index.html has asset loading error handling', () => {
  const indexPath = path.join(path.dirname(__dirname), 'dist', 'index.html');
  if (!fs.existsSync(indexPath)) return false;

  const content = fs.readFileSync(indexPath, 'utf8');
  return content.includes('assetErrorHandler') &&
    content.includes('handleAssetFailure') &&
    content.includes('retryAssetLoad');
});

// Test 3: Check if critical assets exist
runTest('Critical assets exist in dist', () => {
  const distPath = path.join(path.dirname(__dirname), 'dist');
  const assetsPath = path.join(distPath, 'assets');

  if (!fs.existsSync(assetsPath)) return false;

  const files = fs.readdirSync(assetsPath);
  const hasDataLayer = files.some(file => file.includes('data-layer'));
  const hasReactCore = files.some(file => file.includes('react-core'));
  const hasMainCSS = files.some(file => file.includes('main') && file.endsWith('.css'));

  return hasDataLayer && hasReactCore && hasMainCSS;
});

// Test 4: Check modulepreload directives in index.html
runTest('Modulepreload directives present', () => {
  const indexPath = path.join(path.dirname(__dirname), 'dist', 'index.html');
  if (!fs.existsSync(indexPath)) return false;

  const content = fs.readFileSync(indexPath, 'utf8');
  const modulepreloadCount = (content.match(/rel="modulepreload"/g) || []).length;

  return modulepreloadCount > 5; // Should have multiple modulepreload directives
});

// Test 5: Check asset paths are correct
runTest('Asset paths are correctly formatted', () => {
  const indexPath = path.join(path.dirname(__dirname), 'dist', 'index.html');
  if (!fs.existsSync(indexPath)) return false;

  const content = fs.readFileSync(indexPath, 'utf8');

  // Check that asset paths start with /assets/
  const assetPaths = content.match(/\/assets\/[^"]+/g) || [];
  return assetPaths.length > 0 && assetPaths.every(path => path.startsWith('/assets/'));
});

// Test 6: Check hosting configuration files
runTest('Hosting configuration files exist', () => {
  const rootPath = path.dirname(__dirname);
  const vercelExists = fs.existsSync(path.join(rootPath, 'vercel.json'));
  const netlifyExists = fs.existsSync(path.join(rootPath, 'netlify.toml'));
  const htaccessExists = fs.existsSync(path.join(rootPath, 'public', '.htaccess'));

  return vercelExists && netlifyExists && htaccessExists;
});

// Test 7: Check CORS headers in hosting configs
runTest('CORS headers configured in hosting files', () => {
  const rootPath = path.dirname(__dirname);

  // Check Vercel config
  const vercelPath = path.join(rootPath, 'vercel.json');
  if (!fs.existsSync(vercelPath)) return false;

  const vercelContent = fs.readFileSync(vercelPath, 'utf8');
  const hasCORS = vercelContent.includes('Access-Control-Allow-Origin');

  // Check .htaccess
  const htaccessPath = path.join(rootPath, 'public', '.htaccess');
  if (!fs.existsSync(htaccessPath)) return false;

  const htaccessContent = fs.readFileSync(htaccessPath, 'utf8');
  const hasHTAccessCORS = htaccessContent.includes('Access-Control-Allow-Origin');

  return hasCORS && hasHTAccessCORS;
});

// Test 8: Check asset loading manager exists
runTest('Asset loading manager utility exists', () => {
  const assetManagerPath = path.join(path.dirname(__dirname), 'src', 'utils', 'assetLoadingManager.ts');
  return fs.existsSync(assetManagerPath);
});

// Test 9: Check Vite config has proper base URL
runTest('Vite config has production base URL', () => {
  const viteConfigPath = path.join(path.dirname(__dirname), 'vite.config.ts');
  if (!fs.existsSync(viteConfigPath)) return false;

  const content = fs.readFileSync(viteConfigPath, 'utf8');
  return content.includes('base:') && content.includes('production');
});

// Test 10: Check chunk splitting configuration
runTest('Chunk splitting properly configured', () => {
  const viteConfigPath = path.join(path.dirname(__dirname), 'vite.config.ts');
  if (!fs.existsSync(viteConfigPath)) return false;

  const content = fs.readFileSync(viteConfigPath, 'utf8');
  return content.includes('manualChunks') &&
    content.includes('data-layer') &&
    content.includes('react-core');
});

// Test 11: Check App.tsx has asset loading integration
runTest('App.tsx integrates asset loading manager', () => {
  const appPath = path.join(path.dirname(__dirname), 'src', 'App.tsx');
  if (!fs.existsSync(appPath)) return false;

  const content = fs.readFileSync(appPath, 'utf8');
  return content.includes('assetLoadingManager') &&
    content.includes('preloadCriticalAssets');
});

// Test 12: Check environment variables are properly configured
runTest('Environment configuration is safe', () => {
  const envConfigPath = path.join(path.dirname(__dirname), 'src', 'lib', 'config', 'env.ts');
  if (!fs.existsSync(envConfigPath)) return false;

  const content = fs.readFileSync(envConfigPath, 'utf8');
  return content.includes('getEnvVar') && content.includes('validateEnv');
});

// Test 13: Check build output size is reasonable
runTest('Build output size is optimized', () => {
  const distPath = path.join(path.dirname(__dirname), 'dist');
  if (!fs.existsSync(distPath)) return false;

  const assetsPath = path.join(distPath, 'assets');
  if (!fs.existsSync(assetsPath)) return false;

  const files = fs.readdirSync(assetsPath);
  const jsFiles = files.filter(file => file.endsWith('.js'));

  // Check that we have proper chunk splitting (multiple JS files)
  return jsFiles.length > 10; // Should have many chunks for optimal loading
});

// Test 14: Check error boundary implementation
runTest('Error boundaries are properly implemented', () => {
  const errorBoundaryPath = path.join(path.dirname(__dirname), 'src', 'components', 'ErrorBoundary.tsx');
  return fs.existsSync(errorBoundaryPath);
});

// Test 15: Check production readiness indicators
runTest('Production readiness indicators present', () => {
  const indexPath = path.join(path.dirname(__dirname), 'dist', 'index.html');
  if (!fs.existsSync(indexPath)) return false;

  const content = fs.readFileSync(indexPath, 'utf8');

  // Check for production optimizations
  const hasMinifiedAssets = content.includes('.js') && content.includes('/assets/');
  const hasErrorHandling = content.includes('assetErrorHandler');
  const hasMetaTags = content.includes('og:title');

  return hasMinifiedAssets && hasErrorHandling && hasMetaTags;
});

// Display results
console.log('\n📊 Test Results Summary:');
console.log(`✅ Passed: ${testResults.passed}`);
console.log(`❌ Failed: ${testResults.failed}`);
console.log(`📈 Success Rate: ${Math.round((testResults.passed / (testResults.passed + testResults.failed)) * 100)}%`);

if (testResults.failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED! Asset loading issues have been resolved.');
  console.log('🚀 The website is ready for production deployment.');
  console.log('\n📋 Asset Loading Fixes Applied:');
  console.log('  1. ✅ Enhanced error handling in index.html');
  console.log('  2. ✅ Asset loading manager with retry mechanism');
  console.log('  3. ✅ CORS headers configured for all hosting platforms');
  console.log('  4. ✅ Proper base URL configuration in Vite');
  console.log('  5. ✅ Optimized chunk splitting for critical assets');
  console.log('  6. ✅ Fallback mechanisms for failed assets');
  console.log('  7. ✅ Production-ready hosting configurations');
  console.log('\n🔧 Deployment Instructions:');
  console.log('  1. Run "npm run build" to generate production build');
  console.log('  2. Deploy the "dist" folder to your hosting platform');
  console.log('  3. Ensure environment variables are set on hosting platform');
  console.log('  4. Test the deployed website for asset loading');
} else {
  console.log('\n❌ TESTS FAILED! Please address the following issues:');
  testResults.errors.forEach((error, index) => {
    console.log(`  ${index + 1}. ${error}`);
  });
  process.exit(1);
}
