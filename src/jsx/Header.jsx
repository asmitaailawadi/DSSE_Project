"use client"
import "../css/Header.css";
import React from 'react';
import { FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="logo-section">
          <FaUpload className="logo-icon" />
          <span className="logo-text">FileVault</span>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <span className="user-email">{user?.email}</span>
              <button className="sign-in" onClick={logout}>Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="sign-in">Sign In</button>
              </Link>
              <Link to="/signup">
                <button className="get-started">Get Started</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;


// "use client";
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "./AuthContext";
// import "../css/Header.css"; // Link to your CSS

// function Header() {
//   const { isAuthenticated, user, logout } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();

//   const isActive = (path) => {
//     return location.pathname === path ? "active-link" : "";
//   };

//   return (
//     <header className="header">
//       <div className="container">
//         <div className="logo-section">
//           <span className="logo-text">FileVault</span>
//           <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//             ☰
//           </button>
//         </div>

//         <nav className={`nav ${menuOpen ? "open" : ""}`}>
//           <ul className="nav-list">
//             <li><Link to="/" className={isActive("/")}>Home</Link></li>
//             {isAuthenticated && (
//               <li><Link to="/myfiles" className={isActive("/myfiles")}>My Files</Link></li>
//             )}
//             <li><Link to="/premium" className={isActive("/premium")}>Premium</Link></li>
//             <li><Link to="/faq" className={isActive("/faq")}>FAQ</Link></li>
//             <li><Link to="/contact" className={isActive("/contact")}>Contact</Link></li>
//           </ul>
//           <div className="auth-buttons">
//             {isAuthenticated ? (
//               <>
//                 <span className="user-email">{user?.email}</span>
//                 <button className="logout-btn" onClick={logout}>Log Out</button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login"><button className="sign-in">Sign In</button></Link>
//                 <Link to="/signup"><button className="get-started">Get Started</button></Link>
//               </>
//             )}
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Header;
