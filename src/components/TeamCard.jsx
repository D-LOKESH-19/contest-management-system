// src/components/TeamCard.jsx
import React, { useState } from 'react';

const TeamCard = ({ team, onEdit, onDelete }) => {
  const [showMembers, setShowMembers] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{team.teamName}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {team.members?.length || 0} members
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-gray-600 flex items-center gap-2">
            <span className="text-lg">👑</span>
            <span className="font-semibold">Leader:</span>
            <span>{team.teamLeader}</span>
          </p>
          
          <div>
            <button
              onClick={() => setShowMembers(!showMembers)}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              <span className="text-lg">👥</span>
              {showMembers ? '▼ Hide Members' : '▶ Show Members'} ({team.members?.length || 0})
            </button>
            
            {showMembers && team.members && team.members.length > 0 && (
              <div className="mt-2 pl-6 space-y-1">
                {team.members.map((member, index) => (
                  <div key={index} className="text-gray-600 text-sm flex items-center gap-2">
                    <span>•</span>
                    <span>{member}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(team)}
            className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
          >
            ✏️ Edit Team
          </button>
          <button
            onClick={() => onDelete(team.id)}
            className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;