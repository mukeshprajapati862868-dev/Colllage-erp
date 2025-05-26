// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// // import './side.css';

// const Sidebar = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   const toggleSidebar = () => {
//     setIsVisible(!isVisible);
//   };

//   return (
//     <>
//       {/* Toggle Button */}
//       <button className="sidebar-toggle" onClick={toggleSidebar}>
//         {isVisible ? '✖' : '☰'}
//       </button>

//       {/* Sidebar */}
//       {isVisible && (
//         <aside className="sidebar">
//           <h2>Sidebar</h2>
//           <nav>
//             <ul>
//               <li><Link to="/">Dashboard</Link></li>
//               <li><Link to="/students">Students</Link></li>
//               <li><Link to="/faculty">Faculty</Link></li>
//               <li><Link to="/admin">Admin Users</Link></li>
//               <li><Link to="/semester-result">Semester Results</Link></li>
//               <li><Link to="/profile">Profile</Link></li>
//             </ul>
//           </nav>
//         </aside>
//       )}
//     </>
//   );
// };

// export default Sidebar;
