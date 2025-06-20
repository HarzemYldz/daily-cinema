import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="text-light-primary dark:text-dark-primary hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound; 