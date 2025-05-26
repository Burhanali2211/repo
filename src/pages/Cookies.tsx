import React from "react";

const Cookies: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4 py-16">
      <section className="w-full max-w-3xl bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0} aria-label="Cookie Policy">Cookie Policy</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Our website uses cookies to enhance your browsing experience. This Cookie Policy explains how we use cookies and similar technologies on our website.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="What Are Cookies">What Are Cookies</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="How We Use Cookies">How We Use Cookies</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We use cookies for various purposes including:
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
          <li className="mb-2">Essential cookies to enable core functionality of our website</li>
          <li className="mb-2">Analytics cookies to understand how you use our website</li>
          <li className="mb-2">Preference cookies to remember your settings and choices</li>
          <li className="mb-2">Marketing cookies to deliver personalized content</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="Managing Cookies">Managing Cookies</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "options" or "preferences" menu of your browser. You can also use browser extensions to manage your cookie preferences.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="Contact Us">Contact Us</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you have any questions about our Cookie Policy, please contact us at <a href="mailto:cookies@example.com" className="text-blue-600 underline focus:outline-none focus:ring-2 focus:ring-blue-400" tabIndex={0} aria-label="Email cookies@example.com">cookies@example.com</a>.
        </p>
      </section>
    </main>
  );
};

export default Cookies;
