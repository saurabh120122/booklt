import React from "react";
import { useLocation, Link } from "react-router-dom";

// Green Checkmark SVG
const SuccessIcon = () => (
  <svg className="w-20 h-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Red X SVG
const FailureIcon = () => (
  <svg className="w-20 h-20 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ResultPage: React.FC = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">No booking information found.</h1>
        <Link to="/" className="bg-brand-yellow text-black font-semibold px-6 py-2 rounded-lg">
          Back to Home
        </Link>
      </div>
    );
  }

  const { success, data, message } = state;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white max-w-lg mx-auto p-10 rounded-lg shadow-lg text-center flex flex-col items-center">
        {success ? (
          <>
            <SuccessIcon />
            <h1 className="text-3xl font-bold mt-6 mb-2">Booking Confirmed</h1>
            <p className="text-gray-600 mb-4">Ref ID: {data._id}</p>
            <p className="mb-8">Thank you, {data.userName}. Your booking is complete.</p>
            <Link to="/" className="bg-brand-gray-dark text-black font-semibold px-6 py-3 rounded-lg hover:bg-brand-gray">
              Back to Home
            </Link>
          </>
        ) : (
          <>
            <FailureIcon />
            <h1 className="text-3xl font-bold text-red-600 mt-6 mb-2">Booking Failed</h1>
            <p className="text-gray-600 mb-8">{message || "An unknown error occurred."}</p>
            <Link to="/" className="bg-brand-gray-dark text-black font-semibold px-6 py-3 rounded-lg hover:bg-brand-gray">
              Try Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;