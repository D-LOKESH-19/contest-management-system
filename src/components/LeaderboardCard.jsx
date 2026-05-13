// src/components/LeaderboardCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LeaderboardCard = ({ team, eventId, rank }) => {
  const getMedalIcon = () => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getMedalColor = () => {
    if (rank === 1) return 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100';
    if (rank === 2) return 'border-gray-400 bg-gradient-to-r from-gray-50 to-gray-100';
    if (rank === 3) return 'border-orange-400 bg-gradient-to-r from-orange-50 to-orange-100';
    return 'border-gray-200 bg-white hover:bg-gray-50';
  };

  const getRankBadge = () => {
    if (rank === 1) return 'bg-yellow-500';
    if (rank === 2) return 'bg-gray-500';
    if (rank === 3) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  return (
    <Link
      to={`/team/${eventId}/${team.id}`}
      className={`block border-l-4 ${getMedalColor()} rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-102`}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {/* Rank with medal */}
          <div className="relative">
            <div className={`w-12 h-12 ${getRankBadge()} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md`}>
              {rank}
            </div>
            {getMedalIcon() && (
              <div className="absolute -top-2 -right-2 text-2xl">
                {getMedalIcon()}
              </div>
            )}
          </div>
          
          {/* Team Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {team.teamName}
            </h2>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
              <span>👑 {team.teamLeader}</span>
              <span>•</span>
              <span>👥 {team.members?.length || 0} members</span>
            </div>
          </div>
        </div>
        
        {/* Score */}
        <div className="text-right">
          <div className="text-4xl font-bold text-blue-600">{team.score}</div>
          <div className="text-sm text-gray-500">points</div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-4">
        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((team.score / 100) * 100, 100)}%` }}
          />
        </div>
      </div>
    </Link>
  );
};

export default LeaderboardCard;