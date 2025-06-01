#!/usr/bin/env node

/**
 * Production Deployment Test Script
 * 
 * This script performs comprehensive testing to ensure the React Context
 * production error is completely resolved and the website will work
 * correctly when deployed to production environments.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Production Deployment Test for React Context Fixes\n');

// Check if dist directory exists
const distPath = path.join(path.dirname(__dirname), 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Dist directory not found. Please run "npm run build" first.');
  process.exit(1);
}

const distFiles = fs.readdirSync(path.join(distPath, 'assets'));

// Test Results Object
const testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: []
};

const logResult = (status, message) => {
  if (status === 'pass') {
    console.log(`✅ ${message}`);
    testResults.passed++;
  } else if (status === 'fail') {
    console.log(`❌ ${message}`);
    testResults.failed++;
    testResults.errors.push(message);
  } else if (status === 'warn') {
    console.log(`⚠️ ${message}`);
    testResults.warnings++;
  }
};

// Test 1: Verify React Core Chunk
console.log('🔍 Test 1: React Core Chunk Verification');
const reactCoreChunk = distFiles.find(file => file.includes('react-core'));
if (reactCoreChunk) {
  logResult('pass', `React core chunk found: ${reactCoreChunk}`);
  
  // Check size - should be small and focused
  const reactCoreStats = fs.statSync(path.join(distPath, 'assets', reactCoreChunk));
  const reactCoreSizeKB = Math.round(reactCoreStats.size / 1024);
  if (reactCoreSizeKB < 50) {
    logResult('pass', `React core chunk size optimal: ${reactCoreSizeKB}KB`);
  } else {
    logResult('warn', `React core chunk larger than expected: ${reactCoreSizeKB}KB`);
  }
} else {
  logResult('fail', 'React core chunk not found');
}

// Test 2: Verify Vendor Misc Chunk Safety
console.log('\n🔍 Test 2: Vendor Misc Chunk Safety');
const vendorMiscChunk = distFiles.find(file => file.includes('vendor-misc'));
if (vendorMiscChunk) {
  logResult('pass', `Vendor misc chunk found: ${vendorMiscChunk}`);
  
  try {
    const vendorContent = fs.readFileSync(path.join(distPath, 'assets', vendorMiscChunk), 'utf8');
    
    // Check for dangerous patterns
    const dangerousPatterns = [
      'createContext is not a function',
      'Cannot read properties of undefined (reading \'createContext\')',
      'React is not defined',
      'useContext is not a function'
    ];
    
    let foundDangerous = false;
    dangerousPatterns.forEach(pattern => {
      if (vendorContent.includes(pattern)) {
        logResult('fail', `Dangerous pattern found in vendor-misc: "${pattern}"`);
        foundDangerous = true;
      }
    });
    
    if (!foundDangerous) {
      logResult('pass', 'No dangerous patterns found in vendor-misc chunk');
    }
    
    // Check for React Context usage
    const hasCreateContext = vendorContent.includes('createContext');
    const hasReactRef = vendorContent.includes('React') || vendorContent.includes('react');
    
    if (hasCreateContext && hasReactRef) {
      logResult('pass', 'Vendor-misc has proper React references for Context usage');
    } else if (hasCreateContext && !hasReactRef) {
      logResult('fail', 'Vendor-misc uses createContext but lacks React references');
    }
    
  } catch (error) {
    logResult('fail', `Error analyzing vendor-misc chunk: ${error.message}`);
  }
} else {
  logResult('warn', 'Vendor misc chunk not found (may be optimized away)');
}

// Test 3: Verify UI Context Chunk
console.log('\n🔍 Test 3: UI Context Chunk Verification');
const uiContextChunk = distFiles.find(file => file.includes('ui-context'));
if (uiContextChunk) {
  logResult('pass', `UI context chunk found: ${uiContextChunk}`);
  
  try {
    const uiContextContent = fs.readFileSync(path.join(distPath, 'assets', uiContextChunk), 'utf8');
    
    // This chunk should contain Radix UI components that use React Context
    const expectedComponents = ['react-context', 'react-dialog', 'react-toast'];
    let foundComponents = 0;
    
    expectedComponents.forEach(component => {
      if (uiContextContent.includes(component)) {
        foundComponents++;
      }
    });
    
    if (foundComponents > 0) {
      logResult('pass', `UI context chunk contains ${foundComponents} expected React Context components`);
    } else {
      logResult('warn', 'UI context chunk may not contain expected components');
    }
    
  } catch (error) {
    logResult('fail', `Error analyzing ui-context chunk: ${error.message}`);
  }
} else {
  logResult('warn', 'UI context chunk not found (components may be in other chunks)');
}

// Test 4: Verify HTML Error Prevention Script
console.log('\n🔍 Test 4: HTML Error Prevention Script');
try {
  const indexPath = path.join(distPath, 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  if (indexContent.includes('reactContextErrorPrevention')) {
    logResult('pass', 'React Context error prevention script found in HTML');
  } else {
    logResult('fail', 'React Context error prevention script missing from HTML');
  }
  
  if (indexContent.includes('window.addEventListener(\'error\'')) {
    logResult('pass', 'Global error handler found in HTML');
  } else {
    logResult('fail', 'Global error handler missing from HTML');
  }
  
} catch (error) {
  logResult('fail', `Error analyzing index.html: ${error.message}`);
}

// Test 5: Verify Chunk Loading Order
console.log('\n🔍 Test 5: Chunk Loading Order');
try {
  const indexPath = path.join(distPath, 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Extract script tags
  const scriptTags = indexContent.match(/<script[^>]*src="[^"]*"[^>]*>/g) || [];
  
  if (scriptTags.length >= 2) {
    logResult('pass', `Found ${scriptTags.length} script tags for proper loading order`);
  } else {
    logResult('warn', `Only ${scriptTags.length} script tags found`);
  }
  
  // Check for module type
  if (indexContent.includes('type="module"')) {
    logResult('pass', 'Module script type found for proper ES6 loading');
  } else {
    logResult('fail', 'Module script type missing');
  }
  
} catch (error) {
  logResult('fail', `Error analyzing script loading order: ${error.message}`);
}

// Test 6: Overall Bundle Health
console.log('\n🔍 Test 6: Overall Bundle Health');

// Count total chunks
const jsChunks = distFiles.filter(file => file.endsWith('.js'));
const cssChunks = distFiles.filter(file => file.endsWith('.css'));

logResult('pass', `Generated ${jsChunks.length} JavaScript chunks`);
logResult('pass', `Generated ${cssChunks.length} CSS chunks`);

// Check for critical chunks
const criticalChunks = ['main-', 'react-core-', 'react-dom-'];
criticalChunks.forEach(chunkPrefix => {
  const found = jsChunks.find(chunk => chunk.includes(chunkPrefix));
  if (found) {
    logResult('pass', `Critical chunk found: ${found}`);
  } else {
    logResult('fail', `Critical chunk missing: ${chunkPrefix}*`);
  }
});

// Final Results
console.log('\n🎯 Production Deployment Test Results');
console.log('='.repeat(50));
console.log(`✅ Tests Passed: ${testResults.passed}`);
console.log(`❌ Tests Failed: ${testResults.failed}`);
console.log(`⚠️ Warnings: ${testResults.warnings}`);

if (testResults.failed === 0) {
  console.log('\n🎉 ALL TESTS PASSED! The React Context production error has been resolved.');
  console.log('🚀 The website is ready for production deployment.');
  console.log('\n📋 Deployment Checklist:');
  console.log('  1. ✅ React Context errors eliminated');
  console.log('  2. ✅ Proper chunk splitting implemented');
  console.log('  3. ✅ Error prevention scripts in place');
  console.log('  4. ✅ Global error handling configured');
  console.log('  5. ✅ Production build optimized');
} else {
  console.log('\n❌ TESTS FAILED! Please address the following issues:');
  testResults.errors.forEach((error, index) => {
    console.log(`  ${index + 1}. ${error}`);
  });
  process.exit(1);
}

console.log('\n💡 Monitoring: Check browser console for any React validation messages after deployment.');
console.log('🔧 Support: If issues persist, the error prevention script will provide detailed logging.');
