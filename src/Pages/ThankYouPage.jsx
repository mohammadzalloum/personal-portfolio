import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-[#6366f1]" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Thank You!
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-lg mb-8">
          Your message has been successfully received. I’ll get back to you as soon as possible.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#6366f1]/30 active:scale-95"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
