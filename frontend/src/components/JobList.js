import React, { useEffect } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const JobList = () => {
  const { token } = useAuth();
  const { jobs, fetchJobs, loading, error } = useJobs(token);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();  //Llamamos al hook que nos traiga los trabajos del usuario
  }, [fetchJobs]);

  //Declaramos el click para visitar el detalle del trabajo
  const handleJobClick = (jobId) => {
    navigate(`/crawler/jobs/${jobId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Your Crawling Jobs</h2>
      <BackButton />
      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {/* Listados de trabajos */}
        {jobs.map((job) => (
          <li
            key={job._id}
            onClick={() => handleJobClick(job._id)}
            className="p-4 bg-white border border-gray-300 rounded shadow-sm cursor-pointer hover:bg-gray-50"
          >
            <p><strong>URL:</strong> {job.rootUrl}</p>
            <p><strong>Status:</strong> {job.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
