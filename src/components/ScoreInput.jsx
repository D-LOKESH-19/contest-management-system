// src/components/ScoreInput.jsx
import React, { useState } from 'react';

const ScoreInput = ({ team, initialScore, onScoreChange, onSave }) => {
  const [score, setScore] = useState(initialScore || 0);
  const [isEditing, setIsEditing] = useState(false);

  const handleScoreUpdate = () => {
    onScoreChange(team.id, score);
    if (onSave) onSave(team.id, score);
    setIsEditing(false);
  };

  const handleQuickAdd = (points) => {
    const newScore = Math.max(0, score + points);
    setScore(newScore);
    onScoreChange(team.id, newScore);
    if (onSave) onSave(team.id, newScore);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{team.teamName}</h3>
          <p className="text-sm text-gray-600">Leader: {team.teamLeader}</p>
          <p className="text-xs text-gray-500">{team.members?.length} team members</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-24 border-2 border-blue-500 rounded-lg px-3 py-2 text-center text-lg font-semibold"
                min="0"
                autoFocus
              />
              <button
                onClick={handleScoreUpdate}
                className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setScore(initialScore || 0);
                }}
                className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  ✏️ Edit
                </button>
              </div>
              
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleQuickAdd(5)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 text-sm"
                >
                  +5
                </button>
                <button
                  onClick={() => handleQuickAdd(10)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 text-sm"
                >
                  +10
                </button>
                <button
                  onClick={() => handleQuickAdd(25)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 text-sm"
                >
                  +25
                </button>
                <button
                  onClick={() => handleQuickAdd(-5)}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 text-sm"
                  disabled={score < 5}
                >
                  -5
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreInput;