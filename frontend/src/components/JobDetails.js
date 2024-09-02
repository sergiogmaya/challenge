import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { useAuth } from '../hooks/useAuth';
import BackButton from './BackButton';

const JobDetails = () => {
  const { token } = useAuth();
  const { jobId } = useParams();
  const { job, fetchJobStatus, startCrawling, loading, error } = useJobs(token);

  useEffect(() => {
    // Función para obtener el estado del trabajo
    const fetchStatus = () => {
      fetchJobStatus(jobId);
    };

    // Llamar inmediatamente para obtener el estado al montar el componente
    fetchStatus();

    // Establecer un intervalo solo si el estado del trabajo no es 'completed'
    if (job?.status !== 'completed') {
      const intervalId = setInterval(fetchStatus, 3000);
      // Limpiar el intervalo cuando el componente se desmonta
      return () => clearInterval(intervalId);
    }
  }, [fetchJobStatus, jobId, job?.status]);

  const handleStartCrawling = async () => {
    await startCrawling(jobId);
    // Opcional: Puedes volver a buscar el estado del trabajo después de iniciar el crawling
    fetchJobStatus(jobId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Job Details</h2>
      <BackButton />
      {loading && <p>Loading job details...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {job && (
        <div className="bg-white p-6 border border-gray-300 rounded shadow-sm">
          <p><strong>Job ID:</strong> {job._id}</p>
          <p><strong>Status:</strong> {job.status}</p>
          <h3 className="text-lg font-semibold mt-4">Found URLs:</h3>
          <ul className="list-disc ml-5 space-y-2">
            {job.urlsFound.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
          {job.status === 'pending' && (
            <button
              onClick={handleStartCrawling}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Start Crawling
            </button>
          )}
          {job.status === 'in-progress' && (
            <p className="mt-4 text-yellow-500">Crawling in progress...</p>
          )}
          {job.status === 'completed' && (
            <p className="mt-4 text-green-500">Crawling completed!</p>
          )}
          {job.status === 'failed' && (
            <p className="mt-4 text-red-500">Crawling failed. Please try again.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetails;
