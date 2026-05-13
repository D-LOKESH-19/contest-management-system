








// // src/pages/Teams.jsx
// import React, { useEffect, useState } from 'react';
// import AdminSidebar from '../components/AdminSidebar';
// import TeamCard from '../components/TeamCard';
// import { getAllEvents, getTeamsByEvent, addTeam, updateTeam, deleteTeam } from '../firebase/realtime.service';

// const Teams = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState('');
//   const [teams, setTeams] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingTeam, setEditingTeam] = useState(null);
//   const [formData, setFormData] = useState({
//     teamName: '',
//     teamLeader: '',
//     members: ['']
//   });

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     if (selectedEvent) {
//       fetchTeams();
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

//   const fetchTeams = async () => {
//     const result = await getTeamsByEvent(selectedEvent);
//     if (result.success) {
//       setTeams(result.teams);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const teamData = {
//       ...formData,
//       eventId: selectedEvent,
//       members: formData.members.filter(m => m.trim() !== '')
//     };
    
//     let result;
//     if (editingTeam) {
//       result = await updateTeam(editingTeam.id, teamData);
//     } else {
//       result = await addTeam(teamData);
//     }
    
//     if (result.success) {
//       fetchTeams();
//       setShowForm(false);
//       setEditingTeam(null);
//       setFormData({ teamName: '', teamLeader: '', members: [''] });
//       alert('Team saved successfully!');
//     }
//   };

//   const addMemberField = () => {
//     setFormData({ ...formData, members: [...formData.members, ''] });
//   };

//   const removeMemberField = (index) => {
//     const members = formData.members.filter((_, i) => i !== index);
//     setFormData({ ...formData, members });
//   };

//   const updateMember = (index, value) => {
//     const members = [...formData.members];
//     members[index] = value;
//     setFormData({ ...formData, members });
//   };

//   const handleEdit = (team) => {
//     setEditingTeam(team);
//     setFormData({
//       teamName: team.teamName,
//       teamLeader: team.teamLeader,
//       members: team.members || ['']
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (teamId) => {
//     if (window.confirm('Are you sure you want to delete this team?')) {
//       const result = await deleteTeam(teamId);
//       if (result.success) {
//         fetchTeams();
//       }
//     }
//   };

//   const selectedEventData = events.find(e => e.id === selectedEvent);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminSidebar />
//       <div className="p-8">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Teams</h1>
          
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
//             {selectedEventData && (
//               <p className="text-sm text-gray-500 mt-2">
//                 {selectedEventData.date} at {selectedEventData.time} | {selectedEventData.venue}
//               </p>
//             )}
//           </div>

//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Teams ({teams.length})</h2>
//             <button
//               onClick={() => {
//                 setEditingTeam(null);
//                 setFormData({ teamName: '', teamLeader: '', members: [''] });
//                 setShowForm(!showForm);
//               }}
//               className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//               disabled={!selectedEvent}
//             >
//               + Add Team
//             </button>
//           </div>

//           {showForm && (
//             <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//               <h2 className="text-xl font-bold mb-4">{editingTeam ? 'Edit Team' : 'Add New Team'}</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 font-semibold mb-2">Team Name</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.teamName}
//                     onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
                
//                 <div className="mb-4">
//                   <label className="block text-gray-700 font-semibold mb-2">Team Leader</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.teamLeader}
//                     onChange={(e) => setFormData({ ...formData, teamLeader: e.target.value })}
//                     className="w-full border rounded-lg px-3 py-2"
//                   />
//                 </div>
                
//                 <div className="mb-4">
//                   <label className="block text-gray-700 font-semibold mb-2">Team Members</label>
//                   {formData.members.map((member, index) => (
//                     <div key={index} className="flex gap-2 mb-2">
//                       <input
//                         type="text"
//                         placeholder={`Member ${index + 1}`}
//                         value={member}
//                         onChange={(e) => updateMember(index, e.target.value)}
//                         className="flex-1 border rounded-lg px-3 py-2"
//                       />
//                       {index > 0 && (
//                         <button
//                           type="button"
//                           onClick={() => removeMemberField(index)}
//                           className="bg-red-500 text-white px-3 py-1 rounded"
//                         >
//                           Remove
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={addMemberField}
//                     className="text-blue-600 mt-2 text-sm"
//                   >
//                     + Add Member
//                   </button>
//                 </div>
                
//                 <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
//                   {editingTeam ? 'Update' : 'Save'} Team
//                 </button>
//               </form>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {teams.map((team) => (
//               <TeamCard
//                 key={team.id}
//                 team={team}
//                 onEdit={handleEdit}
//                 onDelete={handleDelete}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Teams;










// src/pages/Teams.jsx
import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getAllEvents, getTeamsByEvent, addTeam, updateTeam, deleteTeam } from '../firebase/realtime.service';
import { Users, Calendar, MapPin, Plus, Edit2, Trash2, Save, UserPlus, UserMinus } from 'lucide-react';

const Teams = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeader: '',
    members: ['']
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      fetchTeams();
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

  const fetchTeams = async () => {
    const result = await getTeamsByEvent(selectedEvent);
    if (result.success) {
      setTeams(result.teams);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamData = {
      ...formData,
      eventId: selectedEvent,
      members: formData.members.filter(m => m.trim() !== '')
    };
    
    let result;
    if (editingTeam) {
      result = await updateTeam(editingTeam.id, teamData);
    } else {
      result = await addTeam(teamData);
    }
    
    if (result.success) {
      fetchTeams();
      setShowForm(false);
      setEditingTeam(null);
      setFormData({ teamName: '', teamLeader: '', members: [''] });
      alert('Team saved successfully!');
    } else {
      alert('Error saving team');
    }
  };

  const addMemberField = () => {
    setFormData({ ...formData, members: [...formData.members, ''] });
  };

  const removeMemberField = (index) => {
    const members = formData.members.filter((_, i) => i !== index);
    setFormData({ ...formData, members });
  };

  const updateMember = (index, value) => {
    const members = [...formData.members];
    members[index] = value;
    setFormData({ ...formData, members });
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setFormData({
      teamName: team.teamName,
      teamLeader: team.teamLeader,
      members: team.members || ['']
    });
    setShowForm(true);
  };

  const handleDelete = async (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      const result = await deleteTeam(teamId);
      if (result.success) {
        fetchTeams();
        alert('Team deleted successfully!');
      }
    }
  };

  const selectedEventData = events.find(e => e.id === selectedEvent);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Manage Teams</h1>
        <p className="text-gray-600">Add and manage teams for your fest events</p>
      </div>

      {/* Event Selector Card */}
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

      {/* Header with Team Count */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Users size={28} className="text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">Teams ({teams.length})</h2>
        </div>
        <button
          onClick={() => {
            setEditingTeam(null);
            setFormData({ teamName: '', teamLeader: '', members: [''] });
            setShowForm(!showForm);
          }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
          disabled={!selectedEvent}
        >
          <Plus size={20} />
          {showForm ? 'Cancel' : 'Add Team'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingTeam ? 'Edit Team' : 'Create New Team'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Team Name</label>
                <input
                  type="text"
                  required
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Enter team name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Team Leader</label>
                <input
                  type="text"
                  required
                  value={formData.teamLeader}
                  onChange={(e) => setFormData({ ...formData, teamLeader: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Enter team leader name"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-gray-700 font-semibold mb-2">Team Members</label>
              <div className="space-y-3">
                {formData.members.map((member, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      placeholder={`Member ${index + 1} name`}
                      value={member}
                      onChange={(e) => updateMember(index, e.target.value)}
                      className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeMemberField(index)}
                        className="bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition flex items-center gap-2"
                      >
                        <UserMinus size={18} />
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addMemberField}
                className="mt-3 text-blue-600 hover:text-blue-700 transition flex items-center gap-2"
              >
                <UserPlus size={18} />
                Add Member
              </button>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Save size={18} />
                {editingTeam ? 'Update Team' : 'Save Team'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingTeam(null);
                }}
                className="bg-gray-500 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
              <h3 className="text-xl font-bold">{team.teamName}</h3>
            </div>
            <div className="p-5">
              <div className="space-y-2 mb-4">
                <p className="flex items-center gap-2 text-gray-600">
                  <Users size={16} /> Leader: {team.teamLeader}
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <Users size={16} /> Members: {team.members?.length || 0}
                </p>
              </div>
              
              {/* Show members preview */}
              {team.members && team.members.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Team Members:</p>
                  <div className="flex flex-wrap gap-1">
                    {team.members.slice(0, 3).map((member, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {member}
                      </span>
                    ))}
                    {team.members.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{team.members.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(team)} 
                  className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition flex items-center justify-center gap-2"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(team.id)} 
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {teams.length === 0 && !showForm && (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md">
          <Users size={64} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No teams found for this event</p>
          <p className="text-gray-400 mt-2">Click "Add Team" to get started!</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default Teams;