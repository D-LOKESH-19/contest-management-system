// // // src/App.jsx
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { AuthProvider } from './contexts/AuthContext';
// // import ProtectedRoute from './components/ProtectedRoute';
// // import AdminLogin from './pages/AdminLogin';
// // import Dashboard from './pages/Dashboard';
// // import Events from './pages/Events';
// // import Teams from './pages/Teams';
// // import Scores from './pages/Scores';
// // import Leaderboard from './pages/Leaderboard';
// // // import TeamDetails from './pages/TeamDetails';

// // function App() {
// //   return (
// //     <Router>
// //       <AuthProvider>
// //         <Routes>
// //           <Route path="/" element={<Leaderboard />} />
// //           {/* <Route path="/team/:eventId/:teamId" element={<TeamDetails />} /> */}
// //           <Route path="/admin-login" element={<AdminLogin />} />
// //           <Route path="/dashboard" element={
// //             <ProtectedRoute>
// //               <Dashboard />
// //             </ProtectedRoute>
// //           } />
// //           <Route path="/events" element={
// //             <ProtectedRoute>
// //               <Events />
// //             </ProtectedRoute>
// //           } />
// //           <Route path="/teams" element={
// //             <ProtectedRoute>
// //               <Teams />
// //             </ProtectedRoute>
// //           } />
// //           <Route path="/scores" element={
// //             <ProtectedRoute>
// //               <Scores />
// //             </ProtectedRoute>
// //           } />
// //         </Routes>
// //       </AuthProvider>
// //     </Router>
// //   );
// // }

// // export default App;











// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminLogin from './pages/AdminLogin';
// import Dashboard from './pages/Dashboard';
// import Events from './pages/Events';
// import Teams from './pages/Teams';
// import Scores from './pages/Scores';
// import Leaderboard from './pages/Leaderboard';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           {/* Public Routes - No login required */}
//           <Route path="/" element={<Leaderboard />} />
//           <Route path="/admin-login" element={<AdminLogin />} />
          
//           {/* Protected Admin Routes - Login required */}
//           <Route path="/dashboard" element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } />
//           <Route path="/events" element={
//             <ProtectedRoute>
//               <Events />
//             </ProtectedRoute>
//           } />
//           <Route path="/teams" element={
//             <ProtectedRoute>
//               <Teams />
//             </ProtectedRoute>
//           } />
//           <Route path="/scores" element={
//             <ProtectedRoute>
//               <Scores />
//             </ProtectedRoute>
//           } />
          
//           {/* Catch all - redirect to home */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;







// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Teams from './pages/Teams';
import Scores from './pages/Scores';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Leaderboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          } />
          <Route path="/teams" element={
            <ProtectedRoute>
              <Teams />
            </ProtectedRoute>
          } />
          <Route path="/scores" element={
            <ProtectedRoute>
              <Scores />
            </ProtectedRoute>
          } />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;