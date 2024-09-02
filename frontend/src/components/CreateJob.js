import React, { useState } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const { token } = useAuth();
  const { createJob, job, error, loading } = useJobs(token);
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createJob(url);

    if (!error && !loading) {
      navigate('/crawler/jobs');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Create a New Crawling Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Creating job...' : 'Create Job'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      {job && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Job Created:</h3>
          <p><strong>Job ID:</strong> {job._id}</p>
          <p><strong>Status:</strong> {job.status}</p>
        </div>
      )}
    </div>
  );
};

export default CreateJob;
