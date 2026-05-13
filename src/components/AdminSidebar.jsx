








// // src/components/AdminSidebar.jsx
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   LayoutDashboard,
//   Calendar,
//   Users,
//   Target,
//   LogOut,
//   Menu,
//   X,
//   Trophy,
//   BarChart3,
//   Settings
// } from 'lucide-react';

// const AdminSidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Close sidebar on ALL devices when route changes
//   useEffect(() => {
//     // Close sidebar when navigating to any page
//     setIsOpen(false);
//   }, [location.pathname]); // This will trigger every time the route changes

//   // Handle window resize to maintain consistent state
//   useEffect(() => {
//     const handleResize = () => {
//       // On large screens, you might want to reopen if closed automatically
//       // Comment this out if you want to keep user preference
//       if (window.innerWidth >= 1024 && !isOpen) {
//         // Uncomment if you want sidebar to auto-open on desktop
//         // setIsOpen(true);
//       }
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [isOpen]);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/admin-login');
//   };

//   const handleNavigation = () => {
//     // The useEffect will handle closing, but we keep this for any additional logic
//     // No need to manually set isOpen here as useEffect will trigger
//   };

//   const menuItems = [
//     { path: '/dashboard', icon: LayoutDashboard, name: 'Dashboard', color: 'from-blue-500 to-blue-600' },
//     { path: '/events', icon: Calendar, name: 'Events', color: 'from-green-500 to-green-600' },
//     { path: '/teams', icon: Users, name: 'Teams', color: 'from-purple-500 to-purple-600' },
//     { path: '/scores', icon: Target, name: 'Scores', color: 'from-red-500 to-red-600' },
//   ];

//   return (
//     <>
//       {/* Toggle Button - Always visible on all devices */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed top-4 left-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//       >
//         {isOpen ? <X size={20} /> : <Menu size={20} />}
//       </button>

//       {/* Overlay for when sidebar is open on smaller screens */}
//       {isOpen && window.innerWidth < 1024 && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white z-40 
//         transition-all duration-300 shadow-2xl
//         ${isOpen ? 'w-72' : 'w-20'}
//         ${window.innerWidth < 1024 && !isOpen ? 'hidden' : ''}
//       `}>
//         {/* Logo Area */}
//         <div className="p-6 border-b border-gray-700 mb-6">
//           {isOpen ? (
//             <div className="text-center">
//               <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-3 inline-block mb-3">
//                 <Trophy className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 Fest Manager
//               </h2>
//               <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
//             </div>
//           ) : (
//             <div className="text-center">
//               <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-2 inline-block">
//                 <Trophy className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-1 px-3 space-y-2">
//           {menuItems.map((item) => {
//             const isActive = location.pathname === item.path;
//             const Icon = item.icon;
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={handleNavigation}
//                 className={`
//                   flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
//                   ${isActive
//                     ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
//                     : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
//                   }
//                 `}
//               >
//                 <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
//                 {isOpen && (
//                   <span className="font-medium">{item.name}</span>
//                 )}
//                 {!isOpen && (
//                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
//                     {item.name}
//                   </div>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Logout Button */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
//           <button
//             onClick={handleLogout}
//             className={`
//               flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-red-600/20 hover:bg-red-600 
//               transition-all duration-200 group text-red-400 hover:text-white
//               ${!isOpen && 'justify-center'}
//             `}
//           >
//             <LogOut size={20} />
//             {isOpen && <span className="font-medium">Logout</span>}
//             {!isOpen && (
//               <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                 Logout
//               </div>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Main Content Spacer */}
//       <div className={`transition-all duration-300 ${isOpen ? 'ml-72' : 'ml-20'}`} />
//     </>
//   );
// };

// export default AdminSidebar;














// src/components/AdminSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Target,
  LogOut,
  Menu,
  X,
  Trophy,
} from 'lucide-react';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  const handleNavigation = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, name: 'Dashboard', color: 'from-blue-500 to-blue-600' },
    { path: '/events', icon: Calendar, name: 'Events', color: 'from-green-500 to-green-600' },
    { path: '/teams', icon: Users, name: 'Teams', color: 'from-purple-500 to-purple-600' },
    { path: '/scores', icon: Target, name: 'Scores', color: 'from-red-500 to-red-600' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white z-40 
          transition-all duration-300 shadow-2xl overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isMobile ? 'w-72' : 'w-64'}
        `}
      >
        {/* Logo Area */}
        <div className="p-6 border-b border-gray-700 mb-6">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-3 inline-block mb-3">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Fest Manager
            </h2>
            <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-red-600/20 hover:bg-red-600 transition-all duration-200 text-red-400 hover:text-white"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Wrapper - This creates space for the sidebar */}
      <div className={`transition-all duration-300 ${!isMobile && isOpen ? 'ml-64' : 'ml-0'}`}>
        {/* This div handles the layout spacing */}
      </div>
    </>
  );
};

export default AdminSidebar;