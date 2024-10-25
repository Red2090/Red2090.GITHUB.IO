// src/components/Navbar.js
// import React from 'react';
// import '../styles.css';  // 导入样式

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-left">Red2090.github.io</div>
//       <div className="navbar-right">Right Element</div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';  // 导入样式

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Red2090.github.io</Link>
      </div>
      <div className="navbar-right">
        <Link to="">Right Element</Link>
      </div>
    </nav>
  );
};

export default Navbar;