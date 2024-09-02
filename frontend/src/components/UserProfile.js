import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch('http://localhost:5000/api/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        console.error('Error fetching user profile:', data.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700">User Profile</h2>
        <div className="mt-4">
          <p className="text-gray-700"><span className="font-semibold">Username:</span> {user.username}</p>
          <p className="text-gray-700 mt-2"><span className="font-semibold">Email:</span> {user.email}</p>
          <p className="text-gray-700 mt-2"><span className="font-semibold">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none" onClick={() => {
          localStorage.removeItem('token');
          // Redirigir al login o hacer logout
        }}>Logout</button>
        <BackButton />
      </div>
    </div>
  );
};

export default UserProfile;
