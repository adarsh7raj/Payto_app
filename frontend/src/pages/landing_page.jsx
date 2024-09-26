import React from 'react';
import { Link } from 'react-router-dom';

 export const LandingPage = function() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to Payto App</h1>
        <p className="text-lg text-gray-700">Your one-stop solution for secure payments and money transfers.</p>
      </header>

      {/* Information Section */}
      <section className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
        <p className="text-gray-600 mb-6">
          Paytm Clone provides seamless payment solutions, including:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Instant Money Transfers</li>
          <li>Secure and Fast Payments</li>
          <li>Update User Profile Information</li>
          <li>Wallet Management</li>
        </ul>
      </section>

      {/* Action Buttons */}
      <div className="space-x-4">
        <Link to="/signup">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-500 focus:outline-none">
            Sign Up
          </button>
        </Link>
        <Link to="/signin">
          <button className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-500 focus:outline-none">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};


