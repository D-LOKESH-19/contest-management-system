







// // src/pages/Scores.jsx
// import React, { useEffect, useState } from 'react';
// import AdminSidebar from '../components/AdminSidebar';
// import ScoreInput from '../components/ScoreInput';
// import { getAllEvents, getTeamsByEvent, getScoresByEvent, addOrUpdateScore } from '../firebase/realtime.service';

// const Scores = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState('');
//   const [teams, setTeams] = useState([]);
//   const [scores, setScores] = useState({});
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     if (selectedEvent) {
//       fetchTeamsAndScores();
//     }
//   }, [selectedEvent]);

//   const fetchEvents = async () => {
//     const result = await getAllEvents();
//     if (result.success) {
//       setEvents(result.events);
//       if (result.events.length > 0) {
//         setSelectedEvent(result.events[0].id);
//       }
//     }
//   };

//   const fetchTeamsAndScores = async () => {
//     const teamsResult = await getTeamsByEvent(selectedEvent);
//     const scoresResult = await getScoresByEvent(selectedEvent);
    
//     if (teamsResult.success) {
//       setTeams(teamsResult.teams);
//       const scoresMap = {};
//       if (scoresResult.success) {
//         scoresResult.scores.forEach(score => {
//           scoresMap[score.teamId] = score.score;
//         });
//       }
//       setScores(scoresMap);
//     }
//   };

//   const handleScoreChange = (teamId, value) => {
//     setScores({ ...scores, [teamId]: Number(value) });
//   };

//   const handleSingleSave = async (teamId, score) => {
//     await addOrUpdateScore(selectedEvent, teamId, score);
//     alert('Score saved!');
//   };

//   const handleSaveAll = async () => {
//     setSaving(true);
//     for (const team of teams) {
//       const score = scores[team.id] || 0;
//       await addOrUpdateScore(selectedEvent, team.id, score);
//     }
//     alert('All scores saved!');
//     setSaving(false);
//   };

//   const getTotalScore = () => {
//     return Object.values(scores).reduce((sum, score) => sum + (Number(score) || 0), 0);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminSidebar />
//       <div className="p-8">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Scores</h1>
          
//           <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//             <label className="block text-gray-700 font-semibold mb-2">Select Event</label>
//             <select
//               value={selectedEvent}
//               onChange={(e) => setSelectedEvent(e.target.value)}
//               className="border rounded-lg px-3 py-2 w-full md:w-64"
//             >
//               {events.map((event) => (
//                 <option key={event.id} value={event.id}>{event.title}</option>
//               ))}
//             </select>
//           </div>

//           {teams.length > 0 && (
//             <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md p-4 mb-6">
//               <div className="flex justify-between">
//                 <div><p className="text-sm">Total Teams</p><p className="text-2xl font-bold">{teams.length}</p></div>
//                 <div><p className="text-sm">Total Points</p><p className="text-2xl font-bold">{getTotalScore()}</p></div>
//                 <div><p className="text-sm">Average</p><p className="text-2xl font-bold">{Math.round(getTotalScore() / teams.length) || 0}</p></div>
//               </div>
//             </div>
//           )}

//           <div className="space-y-4">
//             {teams.map((team) => (
//               <ScoreInput
//                 key={team.id}
//                 team={team}
//                 initialScore={scores[team.id] || 0}
//                 onScoreChange={handleScoreChange}
//                 onSave={handleSingleSave}
//               />
//             ))}
//           </div>
          
//           {teams.length === 0 && (
//             <div className="text-center py-12 bg-white rounded-lg shadow-md">
//               <p className="text-gray-500">No teams found. Add teams first.</p>
//             </div>
//           )}
          
//           {teams.length > 0 && (
//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={handleSaveAll}
//                 disabled={saving}
//                 className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
//               >
//                 {saving ? 'Saving...' : 'Save All Scores'}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scores;








// src/pages/Scores.jsx
import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getAllEvents, getTeamsByEvent, getScoresByEvent, addOrUpdateScore } from '../firebase/realtime.service';
import { Target, Trophy, Users, Calendar, MapPin, Save, TrendingUp, Award } from 'lucide-react';

const Scores = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      fetchTeamsAndScores();
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    const result = await getAllEvents();
    if (result.success) {
      setEvents(result.events);
      if (result.events.length > 0) {
        setSelectedEvent(result.events[0].id);
      }
    }
  };

  const fetchTeamsAndScores = async () => {
    const teamsResult = await getTeamsByEvent(selectedEvent);
    const scoresResult = await getScoresByEvent(selectedEvent);
    
    if (teamsResult.success) {
      setTeams(teamsResult.teams);
      const scoresMap = {};
      if (scoresResult.success) {
        scoresResult.scores.forEach(score => {
          scoresMap[score.teamId] = score.score;
        });
      }
      setScores(scoresMap);
    }
  };

  const handleScoreChange = (teamId, value) => {
    setScores({ ...scores, [teamId]: Number(value) });
  };

  const handleSaveAll = async () => {
    setSaving(true);
    for (const team of teams) {
      const score = scores[team.id] || 0;
      await addOrUpdateScore(selectedEvent, team.id, score);
    }
    alert('All scores saved successfully!');
    setSaving(false);
  };

  const getTotalScore = () => {
    return Object.values(scores).reduce((sum, score) => sum + (Number(score) || 0), 0);
  };

  const selectedEventData = events.find(e => e.id === selectedEvent);
  const averageScore = teams.length ? (getTotalScore() / teams.length).toFixed(1) : 0;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Manage Scores</h1>
        <p className="text-gray-600">Update team scores in real-time</p>
      </div>

      {/* Event Selector */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar size={24} className="text-blue-600" />
          <label className="text-gray-700 font-semibold text-lg">Select Event</label>
        </div>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full md:w-96 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
        >
          {events.map((event) => (
            <option key={event.id} value={event.id}>{event.title}</option>
          ))}
        </select>
        {selectedEventData && (
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Calendar size={14} /> {selectedEventData.date}</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> {selectedEventData.venue}</span>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      {teams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Teams</p>
                <p className="text-3xl font-bold">{teams.length}</p>
              </div>
              <Users size={32} className="opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Points</p>
                <p className="text-3xl font-bold">{getTotalScore()}</p>
              </div>
              <Trophy size={32} className="opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Average Score</p>
                <p className="text-3xl font-bold">{averageScore}</p>
              </div>
              <TrendingUp size={32} className="opacity-80" />
            </div>
          </div>
        </div>
      )}

      {/* Score Input Cards */}
      {teams.length > 0 ? (
        <div className="space-y-4">
          {teams.map((team, index) => (
            <div 
              key={team.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Award size={24} className="text-purple-500" />
                      <h3 className="text-xl font-bold text-gray-800">{team.teamName}</h3>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">👑 Leader: {team.teamLeader}</span>
                      <span className="flex items-center gap-1">👥 {team.members?.length || 0} members</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <label className="text-gray-700 font-semibold">Score:</label>
                    <input
                      type="number"
                      value={scores[team.id] || 0}
                      onChange={(e) => handleScoreChange(team.id, e.target.value)}
                      className="w-28 border-2 border-gray-200 rounded-xl px-4 py-2 text-center text-lg font-semibold focus:outline-none focus:border-blue-500 transition"
                      min="0"
                      step="5"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleScoreChange(team.id, (scores[team.id] || 0) + 5)}
                        className="bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition"
                      >
                        +5
                      </button>
                      <button
                        onClick={() => handleScoreChange(team.id, Math.max(0, (scores[team.id] || 0) - 5))}
                        className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition"
                      >
                        -5
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Score Progress Bar */}
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((scores[team.id] || 0), 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md">
          <Target size={64} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No teams found for this event</p>
          <p className="text-gray-400 mt-2">Please add teams first</p>
        </div>
      )}
      
      {/* Save Button */}
      {teams.length > 0 && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save All Scores'}
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default Scores;