import { cleanupScriptContent } from './cleanup-scripts';

// Run the cleanup
cleanupScriptContent().then(result => {
  console.log('Cleanup result:', result);
  if (result.success) {
    console.log('✅ Script cleanup completed successfully');
  } else {
    console.error('❌ Script cleanup failed:', result.message);
  }
}).catch(error => {
  console.error('❌ Error running cleanup:', error);
});
