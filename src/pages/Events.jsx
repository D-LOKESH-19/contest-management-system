





// // // src/pages/Events.jsx
// // import React, { useEffect, useState } from 'react';
// // import AdminSidebar from '../components/AdminSidebar';
// // import EventCard from '../components/EventCard';
// // import { getAllEvents, addEvent, updateEvent, deleteEvent } from '../firebase/realtime.service';

// // const Events = () => {
// //   const [events, setEvents] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingEvent, setEditingEvent] = useState(null);
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     description: '',
// //     date: '',
// //     time: '',
// //     venue: '',
// //     prizePool: ''
// //   });

// //   useEffect(() => {
// //     fetchEvents();
// //   }, []);

// //   const fetchEvents = async () => {
// //     const result = await getAllEvents();
// //     if (result.success) {
// //       setEvents(result.events);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     let result;
// //     if (editingEvent) {
// //       result = await updateEvent(editingEvent.id, formData);
// //     } else {
// //       result = await addEvent(formData);
// //     }
    
// //     if (result.success) {
// //       fetchEvents();
// //       setShowForm(false);
// //       setEditingEvent(null);
// //       setFormData({ title: '', description: '', date: '', time: '', venue: '', prizePool: '' });
// //       alert('Event saved successfully!');
// //     } else {
// //       alert('Error saving event: ' + result.error);
// //     }
// //   };

// //   const handleEdit = (event) => {
// //     setEditingEvent(event);
// //     setFormData({
// //       title: event.title,
// //       description: event.description,
// //       date: event.date,
// //       time: event.time,
// //       venue: event.venue,
// //       prizePool: event.prizePool
// //     });
// //     setShowForm(true);
// //   };

// //   const handleDelete = async (eventId) => {
// //     if (window.confirm('Are you sure? This will also delete all teams for this event.')) {
// //       const result = await deleteEvent(eventId);
// //       if (result.success) {
// //         fetchEvents();
// //         alert('Event deleted successfully!');
// //       }
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <AdminSidebar />
// //       <div className="p-8">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="flex justify-between items-center mb-6">
// //             <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
// //             <button
// //               onClick={() => {
// //                 setEditingEvent(null);
// //                 setFormData({ title: '', description: '', date: '', time: '', venue: '', prizePool: '' });
// //                 setShowForm(!showForm);
// //               }}
// //               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
// //             >
// //               {showForm ? 'Cancel' : '+ Add Event'}
// //             </button>
// //           </div>

// //           {showForm && (
// //             <div className="bg-white rounded-lg shadow-md p-6 mb-6">
// //               <h2 className="text-xl font-bold mb-4">{editingEvent ? 'Edit Event' : 'Add New Event'}</h2>
// //               <form onSubmit={handleSubmit}>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <input
// //                     type="text"
// //                     placeholder="Event Title"
// //                     required
// //                     value={formData.title}
// //                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                     className="border rounded-lg px-3 py-2"
// //                   />
// //                   <input
// //                     type="text"
// //                     placeholder="Venue"
// //                     required
// //                     value={formData.venue}
// //                     onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
// //                     className="border rounded-lg px-3 py-2"
// //                   />
// //                   <input
// //                     type="date"
// //                     required
// //                     value={formData.date}
// //                     onChange={(e) => setFormData({ ...formData, date: e.target.value })}
// //                     className="border rounded-lg px-3 py-2"
// //                   />
// //                   <input
// //                     type="time"
// //                     required
// //                     value={formData.time}
// //                     onChange={(e) => setFormData({ ...formData, time: e.target.value })}
// //                     className="border rounded-lg px-3 py-2"
// //                   />
// //                   <input
// //                     type="text"
// //                     placeholder="Prize Pool"
// //                     value={formData.prizePool}
// //                     onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
// //                     className="border rounded-lg px-3 py-2"
// //                   />
// //                   <textarea
// //                     placeholder="Description"
// //                     rows="3"
// //                     value={formData.description}
// //                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                     className="border rounded-lg px-3 py-2 md:col-span-2"
// //                   />
// //                 </div>
// //                 <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
// //                   {editingEvent ? 'Update' : 'Save'} Event
// //                 </button>
// //               </form>
// //             </div>
// //           )}

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {events.map((event) => (
// //               <EventCard
// //                 key={event.id}
// //                 event={event}
// //                 onEdit={handleEdit}
// //                 onDelete={handleDelete}
// //               />
// //             ))}
// //           </div>
          
// //           {events.length === 0 && (
// //             <div className="text-center py-12 bg-white rounded-lg shadow-md">
// //               <p className="text-gray-500">No events created yet. Click "Add Event" to get started!</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Events;










// // src/pages/Events.jsx
// import React, { useEffect, useState } from 'react';
// import AdminSidebar from '../components/AdminSidebar';
// import { getAllEvents, addEvent, updateEvent, deleteEvent } from '../firebase/realtime.service';
// import { Calendar, MapPin, DollarSign, Plus, Edit2, Trash2, X, Save, Clock, Trophy } from 'lucide-react';

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingEvent, setEditingEvent] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     date: '',
//     time: '',
//     venue: '',
//     prizePool: ''
//   });

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     const result = await getAllEvents();
//     if (result.success) {
//       setEvents(result.events);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let result;
//     if (editingEvent) {
//       result = await updateEvent(editingEvent.id, formData);
//     } else {
//       result = await addEvent(formData);
//     }
    
//     if (result.success) {
//       fetchEvents();
//       setShowForm(false);
//       setEditingEvent(null);
//       setFormData({ title: '', description: '', date: '', time: '', venue: '', prizePool: '' });
//     } else {
//       alert('Error saving event');
//     }
//   };

//   const handleEdit = (event) => {
//     setEditingEvent(event);
//     setFormData({
//       title: event.title,
//       description: event.description,
//       date: event.date,
//       time: event.time,
//       venue: event.venue,
//       prizePool: event.prizePool
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (eventId) => {
//     if (window.confirm('Are you sure? This will also delete all teams for this event.')) {
//       await deleteEvent(eventId);
//       fetchEvents();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <AdminSidebar />
      
//       <div className="p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-800 mb-2">Manage Events</h1>
//               <p className="text-gray-600">Create and organize your fest events</p>
//             </div>
//             <button
//               onClick={() => {
//                 setEditingEvent(null);
//                 setFormData({ title: '', description: '', date: '', time: '', venue: '', prizePool: '' });
//                 setShowForm(!showForm);
//               }}
//               className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
//             >
//               <Plus size={20} />
//               {showForm ? 'Cancel' : 'Add Event'}
//             </button>
//           </div>

//           {showForm && (
//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <input
//                     type="text"
//                     placeholder="Event Title"
//                     required
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Venue"
//                     required
//                     value={formData.venue}
//                     onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
//                     className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="date"
//                     required
//                     value={formData.date}
//                     onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                     className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="time"
//                     required
//                     value={formData.time}
//                     onChange={(e) => setFormData({ ...formData, time: e.target.value })}
//                     className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Prize Pool"
//                     value={formData.prizePool}
//                     onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
//                     className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <textarea
//                     placeholder="Description"
//                     rows="3"
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
//                   />
//                 </div>
//                 <div className="flex gap-3 mt-6">
//                   <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
//                     <Save size={20} />
//                     {editingEvent ? 'Update Event' : 'Save Event'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {events.map((event) => (
//               <div key={event.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
//                   <h3 className="text-xl font-bold">{event.title}</h3>
//                 </div>
//                 <div className="p-5">
//                   <div className="space-y-2 mb-4">
//                     <p className="flex items-center gap-2 text-gray-600">
//                       <Calendar size={16} />
//                       {event.date} at {event.time}
//                     </p>
//                     <p className="flex items-center gap-2 text-gray-600">
//                       <MapPin size={16} />
//                       {event.venue}
//                     </p>
//                     <p className="flex items-center gap-2 text-gray-600">
//                       <Trophy size={16} />
//                       Prize: {event.prizePool || 'TBA'}
//                     </p>
//                   </div>
//                   <p className="text-gray-700 text-sm mb-4">{event.description}</p>
//                   <div className="flex gap-2">
//                     <button onClick={() => handleEdit(event)} className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition flex items-center justify-center gap-2">
//                       <Edit2 size={16} />
//                       Edit
//                     </button>
//                     <button onClick={() => handleDelete(event.id)} className="flex-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2">
//                       <Trash2 size={16} />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {events.length === 0 && (
//             <div className="text-center py-12 bg-white rounded-2xl shadow-md">
//               <Calendar size={48} className="text-gray-400 mx-auto mb-3" />
//               <p className="text-gray-500">No events created yet. Click "Add Event" to get started!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Events;










// src/pages/Events.jsx
import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getAllEvents, addEvent, updateEvent, deleteEvent } from '../firebase/realtime.service';
import { Calendar, MapPin, Trophy, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    prizePool: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const result = await getAllEvents();
    if (result.success) {
      setEvents(result.events);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (editingEvent) {
      result = await updateEvent(editingEvent.id, formData);
    } else {
      result = await addEvent(formData);
    }
    
    if (result.success) {
      fetchEvents();
      setShowForm(false);
      setEditingEvent(null);
      setFormData({ title: '', description: '', date: '', time: '', venue: '', prizePool: '' });
    } else {
      alert('Error saving event');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      prizePool: event.prizePool
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure?')) {
      await deleteEvent(eventId);
      fetchEvents();
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Manage Events</h1>
          <p className="text-gray-600">Create and organize your fest events</p>
        </div>
        <button
          onClick={() => {
            setEditingEvent(null);
            setFormData({ title: '', description: '', date: '', time: '', venue: '', prizePool: '' });
            setShowForm(!showForm);
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          {showForm ? 'Cancel' : 'Add Event'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Event Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Venue"
                required
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="border border-gray-300 rounded-xl px-4 py-3"
              />
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border border-gray-300 rounded-xl px-4 py-3"
              />
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="border border-gray-300 rounded-xl px-4 py-3"
              />
              <input
                type="text"
                placeholder="Prize Pool"
                value={formData.prizePool}
                onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                className="border border-gray-300 rounded-xl px-4 py-3"
              />
              <textarea
                placeholder="Description"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border border-gray-300 rounded-xl px-4 py-3 md:col-span-2"
              />
            </div>
            <button type="submit" className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
              <Save size={20} />
              {editingEvent ? 'Update Event' : 'Save Event'}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
              <h3 className="text-xl font-bold">{event.title}</h3>
            </div>
            <div className="p-5">
              <div className="space-y-2 mb-4">
                <p className="flex items-center gap-2 text-gray-600"><Calendar size={16} /> {event.date} at {event.time}</p>
                <p className="flex items-center gap-2 text-gray-600"><MapPin size={16} /> {event.venue}</p>
                <p className="flex items-center gap-2 text-gray-600"><Trophy size={16} /> Prize: {event.prizePool || 'TBA'}</p>
              </div>
              <p className="text-gray-700 text-sm mb-4">{event.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(event)} className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition flex items-center justify-center gap-2">
                  <Edit2 size={16} /> Edit
                </button>
                <button onClick={() => handleDelete(event.id)} className="flex-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-md">
          <Calendar size={48} className="text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No events created yet. Click "Add Event" to get started!</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default Events;