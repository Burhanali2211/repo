/**
 * Performance Testing Suite
 *
 * Automated tests for bundle optimization and performance validation
 */

interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  chunkCount: number;
  largestChunk: { name: string; size: number };
  duplicateModules: string[];
  unusedExports: string[];
}

interface PerformanceTestResult {
  testName: string;
  passed: boolean;
  actualValue: number;
  expectedValue: number;
  message: string;
}

class PerformanceTester {
  private results: PerformanceTestResult[] = [];

  // Test bundle size constraints
  async testBundleSizes(): Promise<PerformanceTestResult[]> {
    const tests: PerformanceTestResult[] = [];

    try {
      // Simulate bundle analysis (in real scenario, this would read from build output)
      const bundleStats = await this.analyzeBundleStats();

      // Test: No single chunk should exceed 500KB
      tests.push({
        testName: 'Maximum Chunk Size',
        passed: bundleStats.largestChunk.size <= 500 * 1024,
        actualValue: bundleStats.largestChunk.size,
        expectedValue: 500 * 1024,
        message: `Largest chunk: ${bundleStats.largestChunk.name} (${(bundleStats.largestChunk.size / 1024).toFixed(2)}KB)`
      });

      // Test: Total bundle size should be reasonable
      tests.push({
        testName: 'Total Bundle Size',
        passed: bundleStats.totalSize <= 2 * 1024 * 1024, // 2MB
        actualValue: bundleStats.totalSize,
        expectedValue: 2 * 1024 * 1024,
        message: `Total size: ${(bundleStats.totalSize / 1024 / 1024).toFixed(2)}MB`
      });

      // Test: Gzip compression ratio should be good
      const compressionRatio = bundleStats.gzippedSize / bundleStats.totalSize;
      tests.push({
        testName: 'Compression Ratio',
        passed: compressionRatio <= 0.3, // 30% or better
        actualValue: compressionRatio,
        expectedValue: 0.3,
        message: `Compression: ${(compressionRatio * 100).toFixed(1)}%`
      });

      // Test: Reasonable number of chunks
      tests.push({
        testName: 'Chunk Count',
        passed: bundleStats.chunkCount >= 10 && bundleStats.chunkCount <= 50,
        actualValue: bundleStats.chunkCount,
        expectedValue: 30,
        message: `${bundleStats.chunkCount} chunks generated`
      });

    } catch (error) {
      tests.push({
        testName: 'Bundle Analysis',
        passed: false,
        actualValue: 0,
        expectedValue: 1,
        message: `Failed to analyze bundle: ${error}`
      });
    }

    this.results.push(...tests);
    return tests;
  }

  // Test Core Web Vitals performance
  async testCoreWebVitals(): Promise<PerformanceTestResult[]> {
    const tests: PerformanceTestResult[] = [];

    return new Promise((resolve) => {
      // Wait for page to be fully loaded
      if (document.readyState === 'complete') {
        this.runWebVitalsTests(tests, resolve);
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => this.runWebVitalsTests(tests, resolve), 2000);
        });
      }
    });
  }

  private runWebVitalsTests(tests: PerformanceTestResult[], resolve: (tests: PerformanceTestResult[]) => void) {
    // Test First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');

    if (fcpEntry) {
      tests.push({
        testName: 'First Contentful Paint',
        passed: fcpEntry.startTime <= 1800, // 1.8s threshold
        actualValue: fcpEntry.startTime,
        expectedValue: 1800,
        message: `FCP: ${fcpEntry.startTime.toFixed(2)}ms`
      });
    }

    // Test navigation timing
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navEntries.length > 0) {
      const navEntry = navEntries[0];

      // Time to First Byte
      const ttfb = navEntry.responseStart - navEntry.requestStart;
      tests.push({
        testName: 'Time to First Byte',
        passed: ttfb <= 800,
        actualValue: ttfb,
        expectedValue: 800,
        message: `TTFB: ${ttfb.toFixed(2)}ms`
      });

      // DOM Content Loaded
      const dcl = navEntry.domContentLoadedEventEnd - navEntry.navigationStart;
      tests.push({
        testName: 'DOM Content Loaded',
        passed: dcl <= 3000,
        actualValue: dcl,
        expectedValue: 3000,
        message: `DCL: ${dcl.toFixed(2)}ms`
      });

      // Page Load Complete
      const loadComplete = navEntry.loadEventEnd - navEntry.navigationStart;
      tests.push({
        testName: 'Page Load Complete',
        passed: loadComplete <= 5000,
        actualValue: loadComplete,
        expectedValue: 5000,
        message: `Load: ${loadComplete.toFixed(2)}ms`
      });
    }

    this.results.push(...tests);
    resolve(tests);
  }

  // Test resource loading performance
  async testResourceLoading(): Promise<PerformanceTestResult[]> {
    const tests: PerformanceTestResult[] = [];
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    // Group resources by type
    const scripts = resourceEntries.filter(entry => entry.name.includes('.js'));
    const styles = resourceEntries.filter(entry => entry.name.includes('.css'));
    const images = resourceEntries.filter(entry => /\.(png|jpg|jpeg|gif|svg|webp)/.test(entry.name));

    // Test script loading times
    const scriptLoadTimes = scripts.map(script => script.responseEnd - script.requestStart);
    const avgScriptLoadTime = scriptLoadTimes.reduce((a, b) => a + b, 0) / scriptLoadTimes.length;

    tests.push({
      testName: 'Average Script Load Time',
      passed: avgScriptLoadTime <= 1000,
      actualValue: avgScriptLoadTime,
      expectedValue: 1000,
      message: `Avg script load: ${avgScriptLoadTime.toFixed(2)}ms`
    });

    // Test CSS loading times
    if (styles.length > 0) {
      const styleLoadTimes = styles.map(style => style.responseEnd - style.requestStart);
      const avgStyleLoadTime = styleLoadTimes.reduce((a, b) => a + b, 0) / styleLoadTimes.length;

      tests.push({
        testName: 'Average CSS Load Time',
        passed: avgStyleLoadTime <= 500,
        actualValue: avgStyleLoadTime,
        expectedValue: 500,
        message: `Avg CSS load: ${avgStyleLoadTime.toFixed(2)}ms`
      });
    }

    // Test for render-blocking resources
    const renderBlockingResources = resourceEntries.filter(entry =>
      entry.renderBlockingStatus === 'blocking'
    );

    tests.push({
      testName: 'Render Blocking Resources',
      passed: renderBlockingResources.length <= 3,
      actualValue: renderBlockingResources.length,
      expectedValue: 3,
      message: `${renderBlockingResources.length} render-blocking resources`
    });

    this.results.push(...tests);
    return tests;
  }

  // Test lazy loading effectiveness
  async testLazyLoading(): Promise<PerformanceTestResult[]> {
    const tests: PerformanceTestResult[] = [];

    // Test that not all chunks are loaded immediately
    const initialScripts = document.querySelectorAll('script[src*="/assets/"]');
    const totalChunksExpected = 20; // Approximate expected chunk count

    tests.push({
      testName: 'Lazy Loading Effectiveness',
      passed: initialScripts.length < totalChunksExpected * 0.5, // Less than 50% loaded initially
      actualValue: initialScripts.length,
      expectedValue: Math.floor(totalChunksExpected * 0.5),
      message: `${initialScripts.length} chunks loaded initially`
    });

    // Test icon lazy loading
    const iconElements = document.querySelectorAll('[data-lucide]');
    const loadedIcons = document.querySelectorAll('svg[data-lucide]');

    if (iconElements.length > 0) {
      tests.push({
        testName: 'Icon Lazy Loading',
        passed: loadedIcons.length < iconElements.length,
        actualValue: loadedIcons.length,
        expectedValue: iconElements.length - 1,
        message: `${loadedIcons.length}/${iconElements.length} icons loaded`
      });
    }

    this.results.push(...tests);
    return tests;
  }

  // Simulate bundle analysis (would read actual build stats in real implementation)
  private async analyzeBundleStats(): Promise<BundleAnalysis> {
    // In a real implementation, this would read from dist/stats.json or similar
    return {
      totalSize: 1.5 * 1024 * 1024, // 1.5MB
      gzippedSize: 400 * 1024, // 400KB
      chunkCount: 25,
      largestChunk: { name: 'vendor-chunk', size: 300 * 1024 },
      duplicateModules: [],
      unusedExports: []
    };
  }

  // Run all performance tests
  async runAllTests(): Promise<PerformanceTestResult[]> {
    console.log('🧪 Running performance tests...');

    const bundleTests = await this.testBundleSizes();
    const webVitalsTests = await this.testCoreWebVitals();
    const resourceTests = await this.testResourceLoading();
    const lazyLoadingTests = await this.testLazyLoading();

    const allTests = [...bundleTests, ...webVitalsTests, ...resourceTests, ...lazyLoadingTests];

    // Generate report
    this.generateReport(allTests);

    return allTests;
  }

  // Generate test report
  private generateReport(tests: PerformanceTestResult[]) {
    const passed = tests.filter(test => test.passed).length;
    const total = tests.length;
    const passRate = (passed / total) * 100;

    console.group('📊 Performance Test Results');
    console.log(`✅ Passed: ${passed}/${total} (${passRate.toFixed(1)}%)`);

    // Log failed tests
    const failedTests = tests.filter(test => !test.passed);
    if (failedTests.length > 0) {
      console.group('❌ Failed Tests:');
      failedTests.forEach(test => {
        console.log(`${test.testName}: ${test.message}`);
      });
      console.groupEnd();
    }

    // Log all test details
    console.table(tests.map(test => ({
      Test: test.testName,
      Status: test.passed ? '✅' : '❌',
      Actual: test.actualValue,
      Expected: test.expectedValue,
      Message: test.message
    })));

    console.groupEnd();
  }

  // Get test results
  getResults(): PerformanceTestResult[] {
    return this.results;
  }
}

// Export singleton instance
export const performanceTester = new PerformanceTester();

// Utility function to run tests
export async function runPerformanceTests(): Promise<PerformanceTestResult[]> {
  return performanceTester.runAllTests();
}

export default {
  performanceTester,
  runPerformanceTests
};
