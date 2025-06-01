# Website Cleanup Script
# This script removes unnecessary files and folders from the website project

Write-Host "Starting website cleanup process..." -ForegroundColor Green

# Define project root
$projectRoot = "d:\MY StartUp\easyiotech"

# Function to safely remove files or directories
function SafeRemove {
    param (
        [string]$path,
        [string]$description
    )
    
    if (Test-Path $path) {
        Write-Host "Removing $description: $path" -ForegroundColor Yellow
        try {
            if (Test-Path -PathType Container $path) {
                Remove-Item -Path $path -Recurse -Force -ErrorAction Stop
            } else {
                Remove-Item -Path $path -Force -ErrorAction Stop
            }
            Write-Host "Successfully removed $description" -ForegroundColor Green
        } catch {
            Write-Host "Error removing $description: $_" -ForegroundColor Red
        }
    } else {
        Write-Host "$description not found: $path" -ForegroundColor Gray
    }
}

# 1. Remove build artifacts
SafeRemove "$projectRoot\dist" "build distribution folder"

# 2. Remove node_modules (will be reinstalled later)
SafeRemove "$projectRoot\node_modules" "node modules folder"

# 3. Remove documentation files (not needed for website operation)
$documentationFiles = @(
    "ABOUT_SECTION_REMOVAL_SUMMARY.md",
    "ANIMATION_OPTIMIZATION_GUIDE.md",
    "ASSET_LOADING_FIXES_REPORT.md",
    "BROWSER_COMPATIBILITY_FIX_SUMMARY.md",
    "COMPREHENSIVE_WEBSITE_AUDIT_REPORT.md",
    "CONSOLE_ERRORS_FIXES.md",
    "CONTACT_PAGE_REDESIGN_SUMMARY.md",
    "DASHBOARD_FIXES_SUMMARY.md",
    "DASHBOARD_PORTFOLIO_INTEGRATION.md",
    "DASHBOARD_SETTINGS_GUIDE.md",
    "DATABASE_AUDIT_AND_HERO_ENHANCEMENT_REPORT.md",
    "DEPLOYMENT_CHECKLIST.md",
    "DEPLOYMENT_GUIDE.md",
    "DESIGN_IMPROVEMENTS.md",
    "FRONTEND_AUDIT_REPORT.md",
    "GRADIENT_TRANSITIONS_GUIDE.md",
    "IMAGE_AND_AUTH_FIXES.md",
    "IMAGE_AUDIT_FIXES_REPORT.md",
    "OPTIMIZATION_REPORT.md",
    "OUR_WORK_IMPLEMENTATION.md",
    "PSYCHOLOGICAL_DESIGN_ENHANCEMENTS.md",
    "REACT_CONTEXT_FIX_SUMMARY.md",
    "SERVICES_REDESIGN_SUMMARY.md",
    "SUPABASE_MODULE_FIX_SUMMARY.md",
    "UNDEFINED_PROPERTY_FIXES.md",
    "super_admin_test_guide.md",
    "test-integrations.md",
    "test_our_work_page.md"
)

foreach ($file in $documentationFiles) {
    SafeRemove "$projectRoot\$file" "documentation file"
}

# 4. Remove duplicate/redundant image components
$redundantComponents = @(
    "$projectRoot\src\components\ui\PerformantImage.tsx"  # Keep OptimizedImage.tsx and remove this
)

foreach ($component in $redundantComponents) {
    SafeRemove $component "redundant component"
}

# 5. Clean up test scripts that aren't needed for production
$redundantScripts = @(
    "$projectRoot\scripts\asset-loading-test.js",
    "$projectRoot\scripts\comprehensive-production-test.js",
    "$projectRoot\scripts\production-deployment-test.js",
    "$projectRoot\scripts\test-production-build.js",
    "$projectRoot\test-integration.js"
)

foreach ($script in $redundantScripts) {
    SafeRemove $script "redundant test script"
}

# 6. Remove duplicate service pages (keep the enhanced ones)
# These would be handled through the dynamic ServiceDetailPage
$redundantPages = @(
    "$projectRoot\src\pages\EnhancedContact.tsx"  # Keep the main ContactPage
)

foreach ($page in $redundantPages) {
    SafeRemove $page "redundant page"
}

Write-Host "Cleanup completed!" -ForegroundColor Green
Write-Host "Now rebuilding the project..." -ForegroundColor Cyan

# 7. Reinstall dependencies and rebuild
try {
    Set-Location $projectRoot
    
    Write-Host "Installing dependencies..." -ForegroundColor Cyan
    npm install --production
    
    Write-Host "Building project..." -ForegroundColor Cyan
    npm run build
    
    Write-Host "Project successfully rebuilt!" -ForegroundColor Green
    
} catch {
    Write-Host "Error during rebuild process: $_" -ForegroundColor Red
}
