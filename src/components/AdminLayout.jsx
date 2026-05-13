// // src/components/AdminLayout.jsx
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
//   ChevronLeft,
//   ChevronRight,
//   User,
//   Bell,
//   Settings
// } from 'lucide-react';

// const AdminLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const mobile = window.innerWidth < 1024;
//       setIsMobile(mobile);
//       if (mobile) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };
    
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/admin-login');
//   };

//   const menuItems = [
//     { path: '/dashboard', icon: LayoutDashboard, name: 'Dashboard', color: 'from-blue-500 to-blue-600' },
//     { path: '/events', icon: Calendar, name: 'Events', color: 'from-green-500 to-green-600' },
//     { path: '/teams', icon: Users, name: 'Teams', color: 'from-purple-500 to-purple-600' },
//     { path: '/scores', icon: Target, name: 'Scores', color: 'from-red-500 to-red-600' },
//   ];

//   // Get user initial for avatar
//   const userInitial = currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'A';
//   const userName = currentUser?.email ? currentUser.email.split('@')[0] : 'Admin';

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Top Navbar */}
//       <nav className="fixed top-0 right-0 left-0 bg-white shadow-md z-30 transition-all duration-300" style={{ left: isSidebarOpen && !isMobile ? '280px' : '0' }}>
//         <div className="flex items-center justify-between px-6 py-4">
//           {/* Left side - Menu Toggle + Title */}
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
//             </button>
//             <div className="flex items-center gap-2">
//               <Trophy className="text-blue-600" size={24} />
//               <span className="font-bold text-xl text-gray-800 hidden sm:inline">Fest Manager</span>
//             </div>
//           </div>

//           {/* Right side - User Info */}
//           <div className="flex items-center gap-4">
//             {/* Notification Bell */}
//             <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
//               <Bell size={20} className="text-gray-600" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
            
//             {/* User Dropdown */}
//             <div className="relative group">
//               <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
//                   {userInitial}
//                 </div>
//                 <div className="hidden md:block text-left">
//                   <p className="text-sm font-semibold text-gray-800">{userName}</p>
//                   <p className="text-xs text-gray-500">Administrator</p>
//                 </div>
//               </button>
              
//               {/* Dropdown Menu */}
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                 <div className="p-2">
//                   <div className="px-4 py-2 border-b border-gray-100">
//                     <p className="text-sm font-semibold text-gray-800">{currentUser?.email}</p>
//                     <p className="text-xs text-gray-500">Admin Access</p>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
//                   >
//                     <LogOut size={16} />
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar */}
//       <aside
//         className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white z-20
//           transition-all duration-300 shadow-2xl overflow-y-auto
//           ${isSidebarOpen ? 'w-72' : 'w-0 md:w-20'} 
//           ${!isSidebarOpen && 'overflow-hidden'}
//         `}
//         style={{ top: 0 }}
//       >
//         {/* Logo Area - Only when open */}
//         {isSidebarOpen && (
//           <div className="pt-20 pb-6 px-6 border-b border-gray-700 mb-6">
//             <div className="text-center">
//               <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 inline-block mb-3">
//                 <Trophy className="w-10 h-10 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 Fest Manager
//               </h2>
//               <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
//             </div>
//           </div>
//         )}

//         {/* Collapsed Logo */}
//         {!isSidebarOpen && !isMobile && (
//           <div className="pt-20 pb-6 flex justify-center">
//             <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-2">
//               <Trophy className="w-6 h-6 text-white" />
//             </div>
//           </div>
//         )}

//         {/* Menu Items */}
//         <nav className="flex-1 px-3 space-y-2">
//           {menuItems.map((item) => {
//             const isActive = location.pathname === item.path;
//             const Icon = item.icon;
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`
//                   flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
//                   ${isActive
//                     ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
//                     : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
//                   }
//                   ${!isSidebarOpen && 'justify-center'}
//                 `}
//               >
//                 <Icon size={20} />
//                 {isSidebarOpen && <span className="font-medium">{item.name}</span>}
//                 {!isSidebarOpen && !isMobile && (
//                   <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
//                     {item.name}
//                   </div>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Logout Button at Bottom */}
//         {isSidebarOpen && (
//           <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-red-600/20 hover:bg-red-600 transition-all duration-200 text-red-400 hover:text-white"
//             >
//               <LogOut size={20} />
//               <span className="font-medium">Logout</span>
//             </button>
//           </div>
//         )}
//       </aside>

//       {/* Main Content */}
//       <main 
//         className="min-h-screen transition-all duration-300 pt-16"
//         style={{ 
//           marginLeft: isSidebarOpen && !isMobile ? '280px' : '0',
//           marginRight: 0
//         }}
//       >
//         <div className="p-8">
//           {children}
//         </div>
//       </main>

//       {/* Mobile Overlay */}
//       {isMobile && isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-15"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminLayout;



















// src/components/AdminLayout.jsx
import React, { useState } from 'react';
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
  User,
  Bell,
  ChevronDown
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, name: 'Dashboard' },
    { path: '/events', icon: Calendar, name: 'Events' },
    { path: '/teams', icon: Users, name: 'Teams' },
    { path: '/scores', icon: Target, name: 'Scores' },
  ];

  const userInitial = currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'A';
  const userName = currentUser?.email ? currentUser.email.split('@')[0] : 'Admin';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Menu Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              <div className="flex items-center gap-2">
                <Trophy className="text-blue-600" size={28} />
                <span className="font-bold text-xl text-gray-800">Fest Manager</span>
              </div>
            </div>

            {/* User Info */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {userInitial}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {/* User Dropdown */}
              {isUserDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg z-50 border border-gray-100">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{currentUser?.email}</p>
                      <p className="text-xs text-gray-500 mt-1">Administrator Access</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Side Menu */}
          <div className="fixed left-0 top-16 bottom-0 w-72 bg-white shadow-xl z-40 overflow-y-auto animate-slide-in">
            <div className="p-4">
              {/* Admin Info in Menu */}
              <div className="flex items-center gap-3 p-4 mb-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {userInitial}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="pt-20">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;