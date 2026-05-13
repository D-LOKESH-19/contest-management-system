// // src/pages/TeamDetails.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { getTeamWithScore, getAllEvents } from '../firebase/realtime.service'; // ✅ CHANGED

// const TeamDetails = () => {
//   const { eventId, teamId } = useParams();
//   const [team, setTeam] = useState(null);
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchTeamDetails();
//     fetchEventDetails();
//   }, [teamId, eventId]);

//   const fetchTeamDetails = async () => {
//     const result = await getTeamWithScore(teamId, eventId);
//     if (result.success) {
//       setTeam(result.team);
//     }
//     setLoading(false);
//   };

//   const fetchEventDetails = async () => {
//     const result = await getAllEvents();
//     if (result.success) {
//       const foundEvent = result.events.find(e => e.id === eventId);
//       setEvent(foundEvent);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//           <div className="text-gray-600">Loading...</div>
//         </div>
//       </>
//     );
//   }

//   if (!team) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//           <div className="text-center">
//             <p className="text-gray-600 text-lg">Team not found</p>
//             <Link to="/" className="text-blue-600 mt-4 inline-block">Back to Leaderboard</Link>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100">
//         <div className="container mx-auto px-6 py-8">
//           <div className="mb-6">
//             <Link to="/" className="text-blue-600 hover:text-blue-700">
//               ← Back to Leaderboard
//             </Link>
//           </div>

//           <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl mx-auto">
//             <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
//               <div className="text-6xl mb-4">🏆</div>
//               <h1 className="text-4xl font-bold mb-2">{team.teamName}</h1>
//               <p className="text-xl opacity-90">Rank #{team.rank || 'N/A'}</p>
//             </div>
            
//             <div className="p-8">
//               <div className="mb-8 text-center">
//                 <div className="text-6xl font-bold text-blue-600 mb-2">{team.score || 0}</div>
//                 <p className="text-gray-600">Total Points</p>
//               </div>
              
//               <div className="border-t pt-6">
//                 <div className="mb-6">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">👑 Team Leader</h3>
//                   <p className="text-gray-700 text-lg">{team.teamLeader}</p>
//                 </div>
                
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">👥 Team Members</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     {team.members && team.members.map((member, index) => (
//                       <div key={index} className="bg-gray-50 rounded-lg p-3">
//                         <p className="text-gray-700">{member}</p>
//                       </div>
//                     ))}
//                   </div>
//                   {(!team.members || team.members.length === 0) && (
//                     <p className="text-gray-500">No members listed</p>
//                   )}
//                 </div>
//               </div>
              
//               {event && (
//                 <div className="border-t pt-6 mt-6">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">📅 Event Details</h3>
//                   <p className="text-gray-700"><strong>Event:</strong> {event.title}</p>
//                   <p className="text-gray-700"><strong>Venue:</strong> {event.venue}</p>
//                   <p className="text-gray-700"><strong>Date:</strong> {event.date} at {event.time}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TeamDetails;