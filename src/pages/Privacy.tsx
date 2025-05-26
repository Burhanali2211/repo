import React from "react";

const Privacy: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4 py-16">
      <section className="w-full max-w-3xl bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" tabIndex={0} aria-label="Privacy Policy">Privacy Policy</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="Information Collection">Information Collection</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We may collect personal information such as your name, email address, and usage data to provide and improve our services.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="Use of Information">Use of Information</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We use your information to operate, maintain, and enhance our website, as well as to communicate with you.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="Data Security">Data Security</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We implement security measures to protect your information. However, no system is completely secure, and we cannot guarantee absolute security.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2" tabIndex={0} aria-label="Contact Us">Contact Us</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@example.com" className="text-blue-600 underline focus:outline-none focus:ring-2 focus:ring-blue-400" tabIndex={0} aria-label="Email privacy@example.com">privacy@example.com</a>.
        </p>
      </section>
    </main>
  );
};

export default Privacy;
