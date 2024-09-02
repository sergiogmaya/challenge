import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Aquí asumimos que guardaste el token en localStorage al hacer login

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-700">Welcome to the Web Crawler App</h1>
        <p className="text-gray-600 mt-4">This app allows you to perform web crawling tasks and extract information from websites. Please log in or register to get started.</p>
        
        {isLoggedIn ? (
          <div className="mt-6">
            <button onClick={() => navigate('/crawler')} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 mb-4">
              Go to Crawler
            </button>
            <button onClick={handleLogout} className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
              Logout
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <Link to="/login">
              <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 mb-4">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
