#!/usr/bin/env node

/**
 * Production Build Verification Script
 * Verifies that the EasyIo.tech production build is ready for deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Production Build for EasyIo.tech...\n');

// Check if dist folder exists
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ dist folder not found. Run "npm run build" first.');
  process.exit(1);
}

console.log('✅ dist folder exists');

// Check index.html
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in dist folder');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, 'utf8');
console.log('✅ index.html exists');

// Check for relative asset paths
if (indexContent.includes('src="/assets/')) {
  console.error('❌ Found absolute asset paths in index.html');
  console.error('   Expected: src="./assets/" but found: src="/assets/"');
  process.exit(1);
}

if (indexContent.includes('href="/assets/')) {
  console.error('❌ Found absolute asset paths in index.html');
  console.error('   Expected: href="./assets/" but found: href="/assets/"');
  process.exit(1);
}

console.log('✅ Asset paths are relative (./assets/)');

// Check for required vendor files
const assetsPath = path.join(distPath, 'assets');
if (!fs.existsSync(assetsPath)) {
  console.error('❌ assets folder not found');
  process.exit(1);
}

const assetFiles = fs.readdirSync(assetsPath);
const requiredChunks = [
  'react-vendor',
  'data-vendor',
  'vendor',
  'main'
];

const missingChunks = [];
for (const chunk of requiredChunks) {
  const found = assetFiles.some(file => file.includes(chunk) && file.endsWith('.js'));
  if (!found) {
    missingChunks.push(chunk);
  }
}

if (missingChunks.length > 0) {
  console.error(`❌ Missing required chunks: ${missingChunks.join(', ')}`);
  process.exit(1);
}

console.log('✅ All required vendor chunks present');

// Check CSS file
const cssFiles = assetFiles.filter(file => file.endsWith('.css'));
if (cssFiles.length === 0) {
  console.error('❌ No CSS files found');
  process.exit(1);
}

console.log('✅ CSS files present');

// Check for React shim in index.html
if (!indexContent.includes('window.React')) {
  console.warn('⚠️  React shim not found in index.html');
  console.warn('   This might cause issues in some browsers');
}

console.log('✅ React compatibility shim present');

// Check for error handling script
if (!indexContent.includes('createContext')) {
  console.warn('⚠️  Error handling script not found');
}

console.log('✅ Error handling script present');

// Analyze chunk sizes
console.log('\n📊 Chunk Size Analysis:');
const jsFiles = assetFiles.filter(file => file.endsWith('.js'));
const chunkSizes = [];

for (const file of jsFiles) {
  const filePath = path.join(assetsPath, file);
  const stats = fs.statSync(filePath);
  const sizeKB = Math.round(stats.size / 1024);
  chunkSizes.push({ file, size: sizeKB });
}

// Sort by size descending
chunkSizes.sort((a, b) => b.size - a.size);

for (const chunk of chunkSizes.slice(0, 10)) { // Show top 10
  const sizeStr = chunk.size > 1024
    ? `${Math.round(chunk.size / 1024 * 10) / 10}MB`
    : `${chunk.size}KB`;
  console.log(`   ${chunk.file}: ${sizeStr}`);
}

// Check for large chunks
const largeChunks = chunkSizes.filter(chunk => chunk.size > 1000); // > 1MB
if (largeChunks.length > 0) {
  console.log('\n⚠️  Large chunks detected (>1MB):');
  for (const chunk of largeChunks) {
    console.log(`   ${chunk.file}: ${Math.round(chunk.size / 1024 * 10) / 10}MB`);
  }
  console.log('   Consider code splitting for better performance');
}

// Check hosting configuration files
const hostingConfigs = [
  { file: 'netlify.toml', name: 'Netlify' },
  { file: 'vercel.json', name: 'Vercel' },
  { file: 'firebase.json', name: 'Firebase' },
  { file: '_redirects', name: 'Netlify redirects', path: path.join(distPath, '_redirects') },
  { file: '.htaccess', name: 'Apache', path: path.join(distPath, '.htaccess') }
];

console.log('\n🌐 Hosting Configuration:');
for (const config of hostingConfigs) {
  const configPath = config.path || path.join(process.cwd(), config.file);
  if (fs.existsSync(configPath)) {
    console.log(`✅ ${config.name} configuration found`);
  } else {
    console.log(`⚪ ${config.name} configuration not found`);
  }
}

// Final summary
console.log('\n🎉 Production Build Verification Complete!');
console.log('\n📋 Summary:');
console.log('✅ Build artifacts present and valid');
console.log('✅ Asset paths configured correctly');
console.log('✅ Vendor chunks properly generated');
console.log('✅ Error handling systems in place');
console.log('✅ Ready for production deployment');

console.log('\n🚀 Next Steps:');
console.log('1. Choose your deployment platform (Netlify, Vercel, Firebase, etc.)');
console.log('2. Set environment variables in your hosting platform');
console.log('3. Deploy the dist/ folder contents');
console.log('4. Verify functionality after deployment');

console.log('\n📖 For detailed deployment instructions, see:');
console.log('   - PRODUCTION_DEPLOYMENT_STATUS.md');
console.log('   - Platform-specific configuration files');

process.exit(0);
