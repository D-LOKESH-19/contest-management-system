// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            🏆 Fest Leaderboard
          </Link>
          <div className="space-x-4">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
                <Link to="/events" className="hover:text-gray-200">Events</Link>
                <Link to="/teams" className="hover:text-gray-200">Teams</Link>
                <Link to="/scores" className="hover:text-gray-200">Scores</Link>
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin-login" className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;