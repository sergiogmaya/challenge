import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Crawler = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Crawler Dashboard</h1>
      <BackButton />
      <nav className="space-y-4">
        <Link to="/crawler/jobs/new" className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create New Crawling Job
        </Link>
        <Link to="/crawler/jobs" className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          View All Jobs
        </Link>
      </nav>
    </div>
  );
};

export default Crawler;
