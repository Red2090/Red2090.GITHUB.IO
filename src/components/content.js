// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles.css';  // 导入样式

// const Content = () => {
//   return (
//     <div className="content">
//       <img src="/tools_image.jpg" alt="Tools Image" className="content-image" />
//         <button className="rounded-button">?</button>
//     </div>
//   );
// };

// export default Content;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';  // 导入样式

const Content = () => {
  return (
    <div className="content">
      <img src="/tools_image.jpg" alt="Tools Image" className="content-image" />
      <Link to="/tools" rel="noopener noreferrer">
        <button className="rounded-button">?</button>
      </Link>
    </div>
  );
};

export default Content;