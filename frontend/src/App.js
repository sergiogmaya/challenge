import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Home from './pages/Home';
import Crawler from './pages/Crawler';
import CreateJob from './components/CreateJob';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<ProtectedRoute element={<UserProfile />} />} />
          <Route path="/crawler" element={<ProtectedRoute element={<Crawler />} />} />
          <Route path="/crawler/jobs/new" element={<ProtectedRoute element={<CreateJob />} />} />
          <Route path="/crawler/jobs/:jobId" element={<ProtectedRoute element={<JobDetails />} />} />
          <Route path="/crawler/jobs" element={<ProtectedRoute element={<JobList />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
