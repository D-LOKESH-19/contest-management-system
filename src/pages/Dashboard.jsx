


// // // src/pages/Dashboard.jsx
// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import AdminSidebar from '../components/AdminSidebar';
// // import { getAllEvents, getAllTeams, getTeamsByEvent, getScoresByEvent } from '../firebase/realtime.service';
// // import {
// //   Calendar,
// //   Users,
// //   Trophy,
// //   TrendingUp,
// //   Award,
// //   Star,
// //   BarChart3,
// //   PieChart,
// //   Activity,
// //   Target,
// //   CheckCircle,
// //   Clock
// // } from 'lucide-react';

// // const Dashboard = () => {
// //   const [stats, setStats] = useState({
// //     totalEvents: 0,
// //     totalTeams: 0,
// //     totalScores: 0,
// //     averageScore: 0,
// //     highestScore: 0,
// //     topTeam: null
// //   });
// //   const [eventsData, setEventsData] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchDashboardData();
// //   }, []);

// //   const fetchDashboardData = async () => {
// //     setLoading(true);
    
// //     // Fetch events
// //     const eventsResult = await getAllEvents();
// //     const events = eventsResult.success ? eventsResult.events : [];
    
// //     // Fetch all teams
// //     const teamsResult = await getAllTeams();
// //     const allTeams = teamsResult.success ? teamsResult.teams : [];
    
// //     // Fetch scores for each event and calculate stats
// //     let totalScoreSum = 0;
// //     let totalScoreCount = 0;
// //     let highestScore = 0;
// //     let topTeam = null;
    
// //     const eventsWithDetails = await Promise.all(
// //       events.map(async (event) => {
// //         const teamsResult = await getTeamsByEvent(event.id);
// //         const teams = teamsResult.success ? teamsResult.teams : [];
        
// //         const scoresResult = await getScoresByEvent(event.id);
// //         const scores = scoresResult.success ? scoresResult.scores : [];
        
// //         // Calculate event stats
// //         const eventScores = teams.map(team => {
// //           const teamScore = scores.find(s => s.teamId === team.id);
// //           const score = teamScore ? teamScore.score : 0;
// //           totalScoreSum += score;
// //           totalScoreCount++;
          
// //           if (score > highestScore) {
// //             highestScore = score;
// //             topTeam = { ...team, score, eventTitle: event.title };
// //           }
          
// //           return score;
// //         });
        
// //         const totalEventScore = eventScores.reduce((a, b) => a + b, 0);
// //         const avgEventScore = teams.length ? (totalEventScore / teams.length).toFixed(1) : 0;
        
// //         return {
// //           ...event,
// //           teamsCount: teams.length,
// //           totalScore: totalEventScore,
// //           averageScore: avgEventScore,
// //           topScore: Math.max(...eventScores, 0)
// //         };
// //       })
// //     );
    
// //     setStats({
// //       totalEvents: events.length,
// //       totalTeams: allTeams.length,
// //       totalScores: totalScoreCount,
// //       averageScore: totalScoreCount ? (totalScoreSum / totalScoreCount).toFixed(1) : 0,
// //       highestScore: highestScore,
// //       topTeam: topTeam
// //     });
    
// //     setEventsData(eventsWithDetails);
// //     setLoading(false);
// //   };

// //   const statCards = [
// //     {
// //       title: 'Total Events',
// //       value: stats.totalEvents,
// //       icon: Calendar,
// //       color: 'from-blue-500 to-blue-600',
// //       bgColor: 'bg-blue-500/10',
// //       textColor: 'text-blue-600'
// //     },
// //     {
// //       title: 'Total Teams',
// //       value: stats.totalTeams,
// //       icon: Users,
// //       color: 'from-green-500 to-green-600',
// //       bgColor: 'bg-green-500/10',
// //       textColor: 'text-green-600'
// //     },
// //     {
// //       title: 'Total Points',
// //       value: stats.totalScores,
// //       icon: Trophy,
// //       color: 'from-purple-500 to-purple-600',
// //       bgColor: 'bg-purple-500/10',
// //       textColor: 'text-purple-600'
// //     },
// //     {
// //       title: 'Average Score',
// //       value: stats.averageScore,
// //       icon: TrendingUp,
// //       color: 'from-orange-500 to-orange-600',
// //       bgColor: 'bg-orange-500/10',
// //       textColor: 'text-orange-600'
// //     }
// //   ];

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-100">
// //         <AdminSidebar />
// //         <div className="flex items-center justify-center h-screen">
// //           <div className="text-center">
// //             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
// //             <p className="text-gray-600">Loading dashboard...</p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <AdminSidebar />
      
// //       <div className="p-8">
// //         <div className="max-w-7xl mx-auto">
// //           {/* Header */}
// //           <div className="mb-8">
// //             <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
// //             <p className="text-gray-600">Welcome back! Here's your event analytics overview</p>
// //           </div>

// //           {/* Stats Grid */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //             {statCards.map((card, index) => {
// //               const Icon = card.icon;
// //               return (
// //                 <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
// //                   <div className="flex items-center justify-between mb-4">
// //                     <div className={`${card.bgColor} p-3 rounded-xl`}>
// //                       <Icon className={`${card.textColor}`} size={24} />
// //                     </div>
// //                     <div className={`text-3xl font-bold ${card.textColor}`}>
// //                       {card.value}
// //                     </div>
// //                   </div>
// //                   <h3 className="text-gray-600 font-medium">{card.title}</h3>
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* Top Performer Card */}
// //           {stats.topTeam && (
// //             <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg p-6 mb-8 text-white">
// //               <div className="flex items-center justify-between flex-wrap gap-4">
// //                 <div className="flex items-center gap-4">
// //                   <div className="bg-white/20 p-4 rounded-xl">
// //                     <Award size={32} />
// //                   </div>
// //                   <div>
// //                     <p className="text-sm opacity-90">Top Performing Team</p>
// //                     <h2 className="text-2xl font-bold">{stats.topTeam.teamName}</h2>
// //                     <p className="text-sm opacity-90">{stats.topTeam.eventTitle}</p>
// //                   </div>
// //                 </div>
// //                 <div className="text-right">
// //                   <p className="text-sm opacity-90">Highest Score</p>
// //                   <p className="text-4xl font-bold">{stats.highestScore}</p>
// //                   <p className="text-sm opacity-90">points</p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Events Detailed Analytics */}
// //           <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
// //             <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4">
// //               <div className="flex items-center gap-3">
// //                 <BarChart3 size={24} />
// //                 <h2 className="text-xl font-bold">Event-wise Analytics</h2>
// //               </div>
// //             </div>
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50 border-b">
// //                   <tr>
// //                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Event</th>
// //                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Teams</th>
// //                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total Points</th>
// //                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Average</th>
// //                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Top Score</th>
// //                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y">
// //                   {eventsData.map((event) => (
// //                     <tr key={event.id} className="hover:bg-gray-50 transition">
// //                       <td className="px-6 py-4">
// //                         <div>
// //                           <p className="font-semibold text-gray-800">{event.title}</p>
// //                           <p className="text-sm text-gray-500">{event.date}</p>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4">
// //                         <div className="flex items-center gap-2">
// //                           <Users size={16} className="text-gray-400" />
// //                           <span className="font-semibold">{event.teamsCount}</span>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4">
// //                         <div className="flex items-center gap-2">
// //                           <Trophy size={16} className="text-yellow-500" />
// //                           <span className="font-semibold">{event.totalScore}</span>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4">
// //                         <div className="flex items-center gap-2">
// //                           <Target size={16} className="text-blue-500" />
// //                           <span>{event.averageScore}</span>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4">
// //                         <div className="flex items-center gap-2">
// //                           <Star size={16} className="text-purple-500" />
// //                           <span className="font-semibold">{event.topScore}</span>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4">
// //                         {event.teamsCount > 0 ? (
// //                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
// //                             <CheckCircle size={12} />
// //                             Active
// //                           </span>
// //                         ) : (
// //                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
// //                             <Clock size={12} />
// //                             Pending
// //                           </span>
// //                         )}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //             {eventsData.length === 0 && (
// //               <div className="text-center py-12">
// //                 <p className="text-gray-500">No events created yet</p>
// //                 <Link to="/events" className="text-blue-600 mt-2 inline-block">Create your first event →</Link>
// //               </div>
// //             )}
// //           </div>

// //           {/* Quick Actions */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             <Link to="/events" className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-md p-6 text-white hover:shadow-xl transition-all transform hover:scale-105">
// //               <Calendar size={32} className="mb-3" />
// //               <h3 className="text-xl font-bold mb-1">Manage Events</h3>
// //               <p className="text-sm opacity-90">Create and organize fest events</p>
// //             </Link>
            
// //             <Link to="/teams" className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-md p-6 text-white hover:shadow-xl transition-all transform hover:scale-105">
// //               <Users size={32} className="mb-3" />
// //               <h3 className="text-xl font-bold mb-1">Manage Teams</h3>
// //               <p className="text-sm opacity-90">Add teams to specific events</p>
// //             </Link>
            
// //             <Link to="/scores" className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-md p-6 text-white hover:shadow-xl transition-all transform hover:scale-105">
// //               <Target size={32} className="mb-3" />
// //               <h3 className="text-xl font-bold mb-1">Manage Scores</h3>
// //               <p className="text-sm opacity-90">Update team scores in real-time</p>
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;











// // src/pages/Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import AdminSidebar from '../components/AdminSidebar';
// import { getAllEvents, getAllTeams, getTeamsByEvent, getScoresByEvent } from '../firebase/realtime.service';
// import {
//   Calendar,
//   Users,
//   Trophy,
//   TrendingUp,
//   Award,
//   Target,
//   BarChart3,
//   CheckCircle,
//   Clock,
//   ArrowUp,
//   ArrowDown
// } from 'lucide-react';

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalEvents: 0,
//     totalTeams: 0,
//     totalPoints: 0,
//     averageScore: 0,
//     highestScore: 0,
//     topTeam: null
//   });
//   const [eventsData, setEventsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);
    
//     const eventsResult = await getAllEvents();
//     const events = eventsResult.success ? eventsResult.events : [];
    
//     const teamsResult = await getAllTeams();
//     const allTeams = teamsResult.success ? teamsResult.teams : [];
    
//     let totalPointsSum = 0;
//     let totalScoreCount = 0;
//     let highestScore = 0;
//     let topTeam = null;
    
//     const eventsWithDetails = await Promise.all(
//       events.map(async (event) => {
//         const teamsResult = await getTeamsByEvent(event.id);
//         const teams = teamsResult.success ? teamsResult.teams : [];
        
//         const scoresResult = await getScoresByEvent(event.id);
//         const scores = scoresResult.success ? scoresResult.scores : [];
        
//         const eventScores = teams.map(team => {
//           const teamScore = scores.find(s => s.teamId === team.id);
//           const score = teamScore ? teamScore.score : 0;
//           totalPointsSum += score;
//           totalScoreCount++;
          
//           if (score > highestScore) {
//             highestScore = score;
//             topTeam = { ...team, score, eventTitle: event.title };
//           }
          
//           return score;
//         });
        
//         const totalEventScore = eventScores.reduce((a, b) => a + b, 0);
//         const avgEventScore = teams.length ? (totalEventScore / teams.length).toFixed(1) : 0;
        
//         return {
//           ...event,
//           teamsCount: teams.length,
//           totalScore: totalEventScore,
//           averageScore: avgEventScore,
//           topScore: Math.max(...eventScores, 0)
//         };
//       })
//     );
    
//     setStats({
//       totalEvents: events.length,
//       totalTeams: allTeams.length,
//       totalPoints: totalPointsSum,
//       averageScore: totalScoreCount ? (totalPointsSum / totalScoreCount).toFixed(1) : 0,
//       highestScore: highestScore,
//       topTeam: topTeam
//     });
    
//     setEventsData(eventsWithDetails);
//     setLoading(false);
//   };

//   const statCards = [
//     { title: 'Total Events', value: stats.totalEvents, icon: Calendar, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10', textColor: 'text-blue-600', change: '+12%' },
//     { title: 'Total Teams', value: stats.totalTeams, icon: Users, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/10', textColor: 'text-green-600', change: '+8%' },
//     { title: 'Total Points', value: stats.totalPoints, icon: Trophy, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/10', textColor: 'text-purple-600', change: '+25%' },
//     { title: 'Average Score', value: stats.averageScore, icon: TrendingUp, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500/10', textColor: 'text-orange-600', change: '+5%' }
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <AdminSidebar />
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading dashboard...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminSidebar />
      
//       {/* Main Content - Add padding to prevent overlap */}
//       <main className="pt-8 px-8 pb-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
//             <p className="text-gray-600">Welcome back! Here's your event analytics overview</p>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {statCards.map((card, index) => {
//               const Icon = card.icon;
//               return (
//                 <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className={`${card.bgColor} p-3 rounded-xl`}>
//                       <Icon className={`${card.textColor}`} size={24} />
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <span className="text-green-600 text-sm">{card.change}</span>
//                       <ArrowUp size={14} className="text-green-600" />
//                     </div>
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-800">{card.value}</h3>
//                   <p className="text-gray-600 mt-1">{card.title}</p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Top Performer Card */}
//           {stats.topTeam && (
//             <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg p-6 mb-8 text-white">
//               <div className="flex items-center justify-between flex-wrap gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="bg-white/20 p-4 rounded-xl">
//                     <Award size={32} />
//                   </div>
//                   <div>
//                     <p className="text-sm opacity-90">🏆 Top Performing Team</p>
//                     <h2 className="text-2xl font-bold">{stats.topTeam.teamName}</h2>
//                     <p className="text-sm opacity-90">{stats.topTeam.eventTitle}</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm opacity-90">Highest Score</p>
//                   <p className="text-4xl font-bold">{stats.highestScore}</p>
//                   <p className="text-sm opacity-90">points</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Events Detailed Table */}
//           <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
//             <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4">
//               <div className="flex items-center gap-3">
//                 <BarChart3 size={24} />
//                 <h2 className="text-xl font-bold">Event-wise Analytics</h2>
//               </div>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Event</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Teams</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total Points</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Average</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Top Score</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y">
//                   {eventsData.map((event) => (
//                     <tr key={event.id} className="hover:bg-gray-50 transition">
//                       <td className="px-6 py-4">
//                         <div>
//                           <p className="font-semibold text-gray-800">{event.title}</p>
//                           <p className="text-sm text-gray-500">{event.date}</p>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <Users size={16} className="text-gray-400" />
//                           <span className="font-semibold">{event.teamsCount}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <Trophy size={16} className="text-yellow-500" />
//                           <span className="font-semibold">{event.totalScore}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <Target size={16} className="text-blue-500" />
//                           <span>{event.averageScore}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <Award size={16} className="text-purple-500" />
//                           <span className="font-semibold">{event.topScore}</span>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4">
//                         {event.teamsCount > 0 ? (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
//                             <CheckCircle size={12} />
//                             Active
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
//                             <Clock size={12} />
//                             Pending
//                           </span>
//                         )}
//                        </td>
//                      </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             {eventsData.length === 0 && (
//               <div className="text-center py-12">
//                 <p className="text-gray-500">No events created yet</p>
//                 <Link to="/events" className="text-blue-600 mt-2 inline-block">Create your first event →</Link>
//               </div>
//             )}
//           </div>

//           {/* Quick Actions */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Link to="/events" className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-md p-6 text-white hover:shadow-xl transition-all transform hover:scale-105">
//               <Calendar size={32} className="mb-3" />
//               <h3 className="text-xl font-bold mb-1">Manage Events</h3>
//               <p className="text-sm opacity-90">Create and organize fest events</p>
//             </Link>
            
//             <Link to="/teams" className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-md p-6 text-white hover:shadow-xl transition-all transform hover:scale-105">
//               <Users size={32} className="mb-3" />
//               <h3 className="text-xl font-bold mb-1">Manage Teams</h3>
//               <p className="text-sm opacity-90">Add teams to specific events</p>
//             </Link>
            
//             <Link to="/scores" className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-md p-6 text-white hover:shadow-xl transition-all transform hover:scale-105">
//               <Target size={32} className="mb-3" />
//               <h3 className="text-xl font-bold mb-1">Manage Scores</h3>
//               <p className="text-sm opacity-90">Update team scores in real-time</p>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;









// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { getAllEvents, getAllTeams, getTeamsByEvent, getScoresByEvent } from '../firebase/realtime.service';
import {
  Calendar,
  Users,
  Trophy,
  TrendingUp,
  Award,
  Target,
  BarChart3,
  CheckCircle,
  Clock,
  ArrowUp
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalTeams: 0,
    totalPoints: 0,
    averageScore: 0,
    highestScore: 0,
    topTeam: null
  });
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    const eventsResult = await getAllEvents();
    const events = eventsResult.success ? eventsResult.events : [];
    
    const teamsResult = await getAllTeams();
    const allTeams = teamsResult.success ? teamsResult.teams : [];
    
    let totalPointsSum = 0;
    let totalScoreCount = 0;
    let highestScore = 0;
    let topTeam = null;
    
    const eventsWithDetails = await Promise.all(
      events.map(async (event) => {
        const teamsResult = await getTeamsByEvent(event.id);
        const teams = teamsResult.success ? teamsResult.teams : [];
        
        const scoresResult = await getScoresByEvent(event.id);
        const scores = scoresResult.success ? scoresResult.scores : [];
        
        const eventScores = teams.map(team => {
          const teamScore = scores.find(s => s.teamId === team.id);
          const score = teamScore ? teamScore.score : 0;
          totalPointsSum += score;
          totalScoreCount++;
          
          if (score > highestScore) {
            highestScore = score;
            topTeam = { ...team, score, eventTitle: event.title };
          }
          
          return score;
        });
        
        const totalEventScore = eventScores.reduce((a, b) => a + b, 0);
        const avgEventScore = teams.length ? (totalEventScore / teams.length).toFixed(1) : 0;
        
        return {
          ...event,
          teamsCount: teams.length,
          totalScore: totalEventScore,
          averageScore: avgEventScore,
          topScore: Math.max(...eventScores, 0)
        };
      })
    );
    
    setStats({
      totalEvents: events.length,
      totalTeams: allTeams.length,
      totalPoints: totalPointsSum,
      averageScore: totalScoreCount ? (totalPointsSum / totalScoreCount).toFixed(1) : 0,
      highestScore: highestScore,
      topTeam: topTeam
    });
    
    setEventsData(eventsWithDetails);
    setLoading(false);
  };

  const statCards = [
    { title: 'Total Events', value: stats.totalEvents, icon: Calendar, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { title: 'Total Teams', value: stats.totalTeams, icon: Users, color: 'from-green-500 to-green-600', change: '+8%' },
    { title: 'Total Points', value: stats.totalPoints, icon: Trophy, color: 'from-purple-500 to-purple-600', change: '+25%' },
    { title: 'Average Score', value: stats.averageScore, icon: TrendingUp, color: 'from-orange-500 to-orange-600', change: '+5%' }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your event analytics overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${card.color} p-3 rounded-xl bg-opacity-10`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-sm">{card.change}</span>
                  <ArrowUp size={14} className="text-green-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{card.value}</h3>
              <p className="text-gray-600 mt-1">{card.title}</p>
            </div>
          );
        })}
      </div>

      {/* Top Performer */}
      {stats.topTeam && (
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <Award size={32} />
              </div>
              <div>
                <p className="text-sm opacity-90">🏆 Top Performing Team</p>
                <h2 className="text-2xl font-bold">{stats.topTeam.teamName}</h2>
                <p className="text-sm opacity-90">{stats.topTeam.eventTitle}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Highest Score</p>
              <p className="text-4xl font-bold">{stats.highestScore}</p>
              <p className="text-sm opacity-90">points</p>
            </div>
          </div>
        </div>
      )}

      {/* Events Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4">
          <div className="flex items-center gap-3">
            <BarChart3 size={24} />
            <h2 className="text-xl font-bold">Event-wise Analytics</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Event</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Teams</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total Points</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Average</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Top Score</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {eventsData.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-400" />
                      <span className="font-semibold">{event.teamsCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Trophy size={16} className="text-yellow-500" />
                      <span className="font-semibold">{event.totalScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Target size={16} className="text-blue-500" />
                      <span>{event.averageScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-purple-500" />
                      <span className="font-semibold">{event.topScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {event.teamsCount > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        <CheckCircle size={12} />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                        <Clock size={12} />
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {eventsData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No events created yet</p>
            <Link to="/events" className="text-blue-600 mt-2 inline-block">Create your first event →</Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link to="/events" className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-md p-6 text-white hover:shadow-xl transition-all transform hover:scale-105">
          <Calendar size={32} className="mb-3" />
          <h3 className="text-xl font-bold mb-1">Manage Events</h3>
          <p className="text-sm opacity-90">Create and organize fest events</p>
        </Link>
        
        <Link to="/teams" className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-md p-6 text-white hover:shadow-xl transition-all transform hover:scale-105">
          <Users size={32} className="mb-3" />
          <h3 className="text-xl font-bold mb-1">Manage Teams</h3>
          <p className="text-sm opacity-90">Add teams to specific events</p>
        </Link>
        
        <Link to="/scores" className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-md p-6 text-white hover:shadow-xl transition-all transform hover:scale-105">
          <Target size={32} className="mb-3" />
          <h3 className="text-xl font-bold mb-1">Manage Scores</h3>
          <p className="text-sm opacity-90">Update team scores in real-time</p>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;