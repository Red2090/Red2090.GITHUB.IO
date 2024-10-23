// import React from 'react';
// import '../styles.css';  // 导入样式

// const Footer = () => {
//   return (
//     <div className="footer">
//       <div className="footer-left">
//         <p>"陆品宏"的个人网页</p>
//       </div>
//       <div className="footer-right">
//         <a href="https://steamcommunity.com/profiles/76561199230499717/" target="_blank" rel="">
//           <img src="/Steam_icon_logo.svg.png" alt="Steam"  className="icon" />
//         </a>
//         <a href="https://x.com/Red40602025" target="_blank" rel="">
//           <img src="/new-2023-twitter-logo-x-icon-design_1017-45418.avif" alt="Twitter"className="icon" />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React from 'react';
import '../styles.css';  // 导入样式

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>"陆品宏"的个人网页</p>
      </div>
      <div className="footer-right">
        <a href="https://steamcommunity.com/profiles/76561199230499717/" target="_blank" rel="noopener noreferrer">
          <img src="/Steam_icon_logo.svg.png" alt="Steam" className="icon" />
        </a>
        <a href="https://x.com/Red40602025" target="_blank" rel="noopener noreferrer">
          <img src="/new-2023-twitter-logo-x-icon-design_1017-45418.avif" alt="Twitter" className="icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;