import React from 'react';
import { Link } from 'react-router-dom';

const NoPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="mb:text-6xl text-4xl font-bold text-gray-800 mb-4 text-center">Page is on build</h1>
      <Link to="/tv" onClick={() => localStorage.setItem('selectedContent', 'tv')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Go to Home
      </Link>
    </div>
  );
};

export default NoPage
