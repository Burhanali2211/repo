import React from "react";

const Terms: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4 py-16">
      <section className="w-full max-w-3xl bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0} aria-label="Terms of Service">Terms of Service</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          By accessing and using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="Use License">Use License</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="Disclaimer">Disclaimer</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="Limitations">Limitations</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use the materials on our website.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="Revisions">Revisions and Errata</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="Contact Us">Contact Us</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you have any questions about these Terms of Service, please contact us at <a href="mailto:terms@example.com" className="text-blue-600 underline focus:outline-none focus:ring-2 focus:ring-blue-400" tabIndex={0} aria-label="Email terms@example.com">terms@example.com</a>.
        </p>
      </section>
    </main>
  );
};

export default Terms;
