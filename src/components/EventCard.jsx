// src/components/EventCard.jsx
import React from 'react';

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
        <h3 className="text-xl font-bold text-white truncate">{event.title}</h3>
      </div>
      <div className="p-4">
        <div className="space-y-2 mb-4">
          <p className="text-gray-600 flex items-center gap-2">
            <span className="text-lg">📅</span>
            <span>{event.date} at {event.time}</span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <span className="text-lg">📍</span>
            <span>{event.venue}</span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <span className="text-lg">💰</span>
            <span>{event.prizePool || 'TBA'}</span>
          </p>
          <p className="text-gray-700 mt-2 text-sm line-clamp-2">
            {event.description}
          </p>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(event)}
            className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;