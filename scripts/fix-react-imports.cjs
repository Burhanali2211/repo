/**
 * React Import Fixer Script
 * 
 * This script fixes all remaining "import * as React from 'react'" patterns
 * to use the standard "import React from 'react'" pattern to prevent
 * production build errors.
 */

const fs = require('fs');
const path = require('path');

// Files that need to be fixed (remaining from the search)
const filesToFix = [
  // UI Components
  'src/components/ui/accordion.tsx',
  'src/components/ui/alert-dialog.tsx',
  'src/components/ui/alert.tsx',
  'src/components/ui/avatar.tsx',
  'src/components/ui/badge.tsx',
  'src/components/ui/breadcrumb.tsx',
  'src/components/ui/calendar.tsx',
  'src/components/ui/carousel.tsx',
  'src/components/ui/chart.tsx',
  'src/components/ui/checkbox.tsx',
  'src/components/ui/command.tsx',
  'src/components/ui/context-menu.tsx',
  'src/components/ui/drawer.tsx',
  'src/components/ui/dropdown-menu.tsx',
  'src/components/ui/form.tsx',
  'src/components/ui/hover-card.tsx',
  'src/components/ui/input-otp.tsx',
  'src/components/ui/menubar.tsx',
  'src/components/ui/navigation-menu.tsx',
  'src/components/ui/pagination.tsx',
  'src/components/ui/popover.tsx',
  'src/components/ui/progress.tsx',
  'src/components/ui/radio-group.tsx',
  'src/components/ui/scroll-area.tsx',
  'src/components/ui/separator.tsx',
  'src/components/ui/sheet.tsx',
  'src/components/ui/sidebar.tsx',
  'src/components/ui/slider.tsx',
  'src/components/ui/switch.tsx',
  'src/components/ui/table.tsx',
  'src/components/ui/tabs.tsx',
  'src/components/ui/textarea.tsx',
  'src/components/ui/toggle-group.tsx',
  'src/components/ui/toggle.tsx',
  'src/components/ui/tooltip.tsx'
];

function fixReactImport(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Pattern 1: import * as React from "react"
    if (content.includes('import * as React from "react"')) {
      content = content.replace('import * as React from "react"', 'import React from "react"');
      modified = true;
    }

    // Pattern 2: import * as React from 'react'
    if (content.includes("import * as React from 'react'")) {
      content = content.replace("import * as React from 'react'", "import React from 'react'");
      modified = true;
    }

    // Pattern 3: Handle destructuring from React namespace
    const destructurePattern = /const\s*{\s*([^}]+)\s*}\s*=\s*React;/;
    const match = content.match(destructurePattern);
    
    if (match) {
      const destructuredItems = match[1].trim();
      // Replace the React import and destructuring with direct import
      content = content.replace(
        /import React from ['"]react['"][\s\S]*?const\s*{\s*[^}]+\s*}\s*=\s*React;/,
        `import React, { ${destructuredItems} } from 'react';`
      );
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    } else {
      console.log(`ℹ️ No changes needed: ${filePath}`);
      return false;
    }

  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 Starting React import fixes...\n');
  
  let fixedCount = 0;
  let totalCount = 0;

  for (const filePath of filesToFix) {
    totalCount++;
    if (fixReactImport(filePath)) {
      fixedCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total files processed: ${totalCount}`);
  console.log(`   Files fixed: ${fixedCount}`);
  console.log(`   Files unchanged: ${totalCount - fixedCount}`);

  if (fixedCount > 0) {
    console.log('\n🎯 React import fixes completed successfully!');
    console.log('   All UI components now use the standard React import pattern.');
    console.log('   This should resolve the "Cannot read properties of undefined (reading \'createContext\')" errors.');
  } else {
    console.log('\n✅ All files already use the correct React import pattern.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { fixReactImport };
