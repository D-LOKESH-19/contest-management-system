










// // src/pages/Leaderboard.jsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getAllEvents, getLeaderboardData } from '../firebase/realtime.service';
// import { Trophy, Medal, Search, Users, Star, TrendingUp, Calendar, MapPin } from 'lucide-react';

// const Leaderboard = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState('');
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     if (selectedEvent) {
//       const unsubscribe = getLeaderboardData(selectedEvent, (data) => {
//         setLeaderboard(data);
//       });
//       return () => unsubscribe();
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

//   const filteredLeaderboard = leaderboard.filter(team =>
//     team.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     team.teamLeader?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getMedalColor = (rank) => {
//     if (rank === 1) return 'from-yellow-400 to-yellow-600';
//     if (rank === 2) return 'from-gray-400 to-gray-600';
//     if (rank === 3) return 'from-orange-400 to-orange-600';
//     return 'from-blue-500 to-purple-500';
//   };

//   const getMedalIcon = (rank) => {
//     if (rank === 1) return <Medal className="text-yellow-500" size={24} />;
//     if (rank === 2) return <Medal className="text-gray-400" size={24} />;
//     if (rank === 3) return <Medal className="text-orange-500" size={24} />;
//     return null;
//   };

//   const selectedEventData = events.find(e => e.id === selectedEvent);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
//         <div className="container mx-auto px-6 text-center">
//           <div className="inline-block p-4 bg-white/20 rounded-2xl mb-4">
//             <Trophy size={48} />
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold mb-4">Fest Leaderboard</h1>
//           <p className="text-xl opacity-90">Real-time rankings updated live</p>
//         </div>
//       </div>

//       <div className="container mx-auto px-6 py-8">
//         {/* Event Selector */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 max-w-2xl mx-auto">
//           <div className="flex items-center gap-3 mb-3">
//             <Calendar size={24} className="text-blue-600" />
//             <label className="text-gray-700 font-semibold text-lg">Select Event</label>
//           </div>
//           <select
//             value={selectedEvent}
//             onChange={(e) => setSelectedEvent(e.target.value)}
//             className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
//           >
//             {events.map((event) => (
//               <option key={event.id} value={event.id}>
//                 {event.title} - {event.date}
//               </option>
//             ))}
//           </select>
//           {selectedEventData && (
//             <div className="mt-3 flex gap-4 text-sm text-gray-500">
//               <span className="flex items-center gap-1"><MapPin size={14} /> {selectedEventData.venue}</span>
//               <span className="flex items-center gap-1"><TrendingUp size={14} /> Prize: {selectedEventData.prizePool || 'TBA'}</span>
//             </div>
//           )}
//         </div>

//         {/* Search Bar */}
//         <div className="max-w-2xl mx-auto mb-6">
//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search team by name or leader..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition"
//             />
//           </div>
//         </div>

//         {/* Leaderboard */}
//         <div className="max-w-4xl mx-auto">
//           {filteredLeaderboard.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
//               <Trophy size={64} className="text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500 text-lg">
//                 {searchTerm ? 'No teams match your search' : 'No teams registered yet'}
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {filteredLeaderboard.map((team) => (
//                 <Link
//                   key={team.id}
//                   to={`/team/${selectedEvent}/${team.id}`}
//                   className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-102"
//                 >
//                   <div className={`bg-gradient-to-r ${getMedalColor(team.rank)} p-1`}>
//                     <div className="bg-white p-6 rounded-xl m-0.5">
//                       <div className="flex items-center justify-between flex-wrap gap-4">
//                         <div className="flex items-center gap-4">
//                           <div className="w-16 text-center">
//                             {team.rank <= 3 ? (
//                               <div className="text-4xl">
//                                 {team.rank === 1 ? '🥇' : team.rank === 2 ? '🥈' : '🥉'}
//                               </div>
//                             ) : (
//                               <div className="text-2xl font-bold text-gray-500">#{team.rank}</div>
//                             )}
//                           </div>
//                           <div>
//                             <h2 className="text-2xl font-bold text-gray-800">{team.teamName}</h2>
//                             <div className="flex items-center gap-3 mt-1">
//                               <span className="flex items-center gap-1 text-gray-600 text-sm">
//                                 <Users size={14} /> Leader: {team.teamLeader}
//                               </span>
//                               <span className="flex items-center gap-1 text-gray-500 text-sm">
//                                 <Star size={14} /> {team.members?.length || 0} members
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                             {team.score}
//                           </div>
//                           <p className="text-gray-500 text-sm">points</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer Stats */}
//         {filteredLeaderboard.length > 0 && (
//           <div className="text-center mt-8 text-gray-500 text-sm">
//             Total Teams: {filteredLeaderboard.length}
//           </div>
//         )}

//         {/* Admin Link */}
//         <div className="text-center mt-12">
//           <Link to="/admin-login" className="text-gray-400 text-sm hover:text-gray-600 transition">
//             Admin Access
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;









// src/pages/Leaderboard.jsx
import React, { useEffect, useState } from 'react';
import { getAllEvents, getLeaderboardData } from '../firebase/realtime.service';
import { 
  Trophy, 
  Medal, 
  Search, 
  Users, 
  Star, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Crown,
  User,
  Mail,
  Phone,
  Gift,
  Target,
  Award
} from 'lucide-react';

const Leaderboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTeam, setExpandedTeam] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      const unsubscribe = getLeaderboardData(selectedEvent, (data) => {
        setLeaderboard(data);
      });
      return () => unsubscribe();
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

  const toggleExpand = (teamId) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId);
  };

  const filteredLeaderboard = leaderboard.filter(team =>
    team.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.teamLeader?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMedalColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 via-yellow-500 to-yellow-600';
    if (rank === 2) return 'from-gray-400 via-gray-500 to-gray-600';
    if (rank === 3) return 'from-orange-400 via-orange-500 to-orange-600';
    return 'from-blue-500 via-purple-500 to-pink-500';
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return { icon: <Crown size={24} className="text-yellow-500" />, text: 'Champion' };
    if (rank === 2) return { icon: <Medal size={24} className="text-gray-400" />, text: 'Runner Up' };
    if (rank === 3) return { icon: <Medal size={24} className="text-orange-500" />, text: 'Second Runner Up' };
    return { icon: <Award size={20} className="text-purple-400" />, text: `Rank #${rank}` };
  };

  const selectedEventData = events.find(e => e.id === selectedEvent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-ping-slow">
          <Sparkles className="text-yellow-400/30" size={40} />
        </div>
        <div className="absolute top-40 right-20 animate-bounce-slow">
          <Sparkles className="text-pink-400/30" size={30} />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-pulse-slow">
          <Sparkles className="text-blue-400/20" size={50} />
        </div>
        <div className="absolute top-1/2 right-10 animate-spin-slow">
          <Sparkles className="text-purple-400/25" size={35} />
        </div>
        <div className="absolute bottom-40 right-1/3 animate-float">
          <Sparkles className="text-yellow-400/20" size={45} />
        </div>
      </div>

      {/* Hero Section with Animation */}
      <div className="relative bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="animate-float">
            <div className="inline-block p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl mb-4 shadow-xl animate-pulse-glow">
              <Trophy size={56} className="text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 animate-slide-down">
            Fest Leaderboard
          </h1>
          <p className="text-xl text-white/80 animate-slide-up">
            Real-time rankings updated live
          </p>
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-8">
        {/* Event Selector - Glassmorphism */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-6 mb-6 max-w-2xl mx-auto border border-white/20 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={24} className="text-yellow-400" />
            <label className="text-white font-semibold text-lg">Select Event</label>
          </div>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition backdrop-blur-sm"
          >
            {events.map((event) => (
              <option key={event.id} value={event.id} className="bg-purple-900">
                {event.title} - {event.date}
              </option>
            ))}
          </select>
          {selectedEventData && (
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1"><MapPin size={14} /> {selectedEventData.venue}</span>
              <span className="flex items-center gap-1"><Gift size={14} /> Prize: {selectedEventData.prizePool || 'TBA'}</span>
              <span className="flex items-center gap-1"><Users size={14} /> {leaderboard.length} Teams</span>
            </div>
          )}
        </div>

        {/* Search Bar - Glassmorphism */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
            <input
              type="text"
              placeholder="🔍 Search team by name or leader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>
        </div>

        {/* Leaderboard Cards */}
        <div className="max-w-4xl mx-auto">
          {filteredLeaderboard.length === 0 ? (
            <div className="text-center py-16 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 animate-fade-in">
              <Trophy size={64} className="text-white/30 mx-auto mb-4" />
              <p className="text-white/60 text-lg">
                {searchTerm ? 'No teams match your search' : 'No teams registered yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-stagger">
              {filteredLeaderboard.map((team, index) => {
                const rankInfo = getRankBadge(team.rank);
                const isExpanded = expandedTeam === team.id;
                
                return (
                  <div
                    key={team.id}
                    className="animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300">
                      {/* Main Card Content - Clickable to Expand */}
                      <div 
                        className="p-6 cursor-pointer transition-all duration-300 hover:bg-white/5"
                        onClick={() => toggleExpand(team.id)}
                      >
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          {/* Rank Section */}
                          <div className="flex items-center gap-4">
                            <div className="w-16 text-center">
                              {team.rank <= 3 ? (
                                <div className="text-5xl animate-bounce-gentle">
                                  {team.rank === 1 ? '🥇' : team.rank === 2 ? '🥈' : '🥉'}
                                </div>
                              ) : (
                                <div className="text-2xl font-bold text-white/60">#{team.rank}</div>
                              )}
                            </div>
                            
                            {/* Team Info */}
                            <div>
                              <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-bold text-white">{team.teamName}</h2>
                                {team.rank === 1 && <Crown size={20} className="text-yellow-400" />}
                              </div>
                              <div className="flex items-center gap-3 mt-1 flex-wrap">
                                <span className="flex items-center gap-1 text-white/70 text-sm">
                                  <User size={14} /> Leader: {team.teamLeader}
                                </span>
                                <span className="flex items-center gap-1 text-white/60 text-sm">
                                  <Users size={14} /> {team.members?.length || 0} members
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Score Section */}
                          <div className="text-right">
                            <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                              {team.score}
                            </div>
                            <p className="text-white/50 text-sm">points</p>
                          </div>
                          
                          {/* Expand/Collapse Icon */}
                          <div className="text-white/50">
                            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                          </div>
                        </div>
                      </div>
                      
                      {/* Expanded Content - Team Members */}
                      {isExpanded && (
                        <div className="border-t border-white/20 bg-white/5 p-6 animate-expand">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Team Leader Section */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Crown size={20} className="text-yellow-400" />
                                <h3 className="text-lg font-semibold text-white">Team Leader</h3>
                              </div>
                              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                                    <User size={24} className="text-white" />
                                  </div>
                                  <div>
                                    <p className="text-white font-semibold">{team.teamLeader}</p>
                                    <p className="text-white/50 text-sm">Team Captain</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Team Members Section */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Users size={20} className="text-blue-400" />
                                <h3 className="text-lg font-semibold text-white">Team Members</h3>
                              </div>
                              <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                                {team.members && team.members.length > 0 ? (
                                  <div className="space-y-2">
                                    {team.members.map((member, idx) => (
                                      <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                          <User size={16} className="text-white" />
                                        </div>
                                        <span className="text-white/80">{member}</span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-white/50 text-center py-4">No members listed</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Performance Badge */}
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between flex-wrap gap-3">
                              <div className="flex items-center gap-2">
                                <Target size={16} className="text-green-400" />
                                <span className="text-white/60 text-sm">
                                  Performance: {team.score >= 80 ? 'Excellent' : team.score >= 60 ? 'Good' : 'Needs Improvement'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star size={16} className="text-yellow-400" />
                                <span className="text-white/60 text-sm">
                                  Rank: {rankInfo.text}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {filteredLeaderboard.length > 0 && (
          <div className="text-center mt-8 text-white/50 text-sm animate-fade-in">
            Total Teams: {filteredLeaderboard.length}
          </div>
        )}

        {/* Admin Link */}
        <div className="text-center mt-12">
          <a href="/admin-login" className="text-white/30 text-sm hover:text-white/50 transition">
            Admin Access
          </a>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4); }
          50% { box-shadow: 0 0 20px 10px rgba(255, 215, 0, 0.2); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes expand {
          from { opacity: 0; transform: scaleY(0); }
          to { opacity: 1; transform: scaleY(1); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in 0.6s ease-out, slide-up 0.6s ease-out; }
        .animate-slide-in { animation: slide-in 0.5s ease-out forwards; opacity: 0; }
        .animate-expand { animation: expand 0.3s ease-out; transform-origin: top; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-ping-slow { animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-bounce-slow { animation: bounce 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        
        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;