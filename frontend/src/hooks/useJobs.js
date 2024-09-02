import { useState, useCallback } from 'react';

//hook para le manejo de las llamadas a trabajos
export const useJobs = (token) => {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //Funcion para obtener los trabajos, manejando el callback para evitar bucles
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/crawler/jobs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setJobs(data);
      } else {
        setError(data.message || 'Failed to fetch jobs.');
      }
    } catch (err) {
      setError('Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  //funcion para la creacion de trabajos
  const createJob = useCallback(async (url) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/crawler/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setJob(data);
        fetchJobs(); // Refresh the list of jobs after creating a new one
      } else {
        setError(data.message || 'Failed to create job.');
      }
    } catch (err) {
      setError('Failed to create job.');
    } finally {
      setLoading(false);
    }
  }, [token, fetchJobs]);

  
  //funcion para la comprobar los trabajos
  const fetchJobStatus = useCallback(async (jobId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/crawler/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setJob(data);
      } else {
        setError(data.message || 'Failed to fetch job status.');
      }
    } catch (err) {
      setError('Failed to fetch job status.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  //funcion que comienza el crawler del trabajo
  const startCrawling = useCallback(async (jobId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/crawler/jobs/${jobId}/start`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setJob(data.job); // Actualiza el estado del job que fue iniciado
        fetchJobs(); // Actualiza la lista de jobs
      } else {
        setError(data.message || 'Failed to start crawling.');
      }
    } catch (err) {
      setError('Failed to start crawling.');
    } finally {
      setLoading(false);
    }
  }, [token, fetchJobs]);

  return {
    jobs,
    job,
    error,
    loading,
    fetchJobs,
    createJob,
    fetchJobStatus,
    startCrawling,
  };
};
