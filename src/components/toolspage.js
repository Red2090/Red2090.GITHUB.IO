import React from 'react';
import '../styles.css';  // 导入样式

const ToolsPage = () => {
  return (
    <div className="content">
      <div className="image-container">
        <img src="/hacker.webp" alt="Hacker Image" width="650" height="auto" />
      </div>
      <h1>我的密码泄露了吗？</h1>
      <h1><a href="https://haveibeenpwned.com/" target="_blank" rel="noopener noreferrer">haveibeenpwned.com</a></h1>

      <div className="image-container">
        <img src="/ipadress.jpg" alt="IP Address Image" width="650" height="auto" />
      </div>
      <h1>IP地址查找</h1>
      <h1><a href="https://zoomeye.org/" target="_blank" rel="noopener noreferrer">zoomeye.org</a></h1>

      <div className="image-container">
        <img src="/lksweb.png" alt="LKS Web Image" width="650" height="auto" />
      </div>
      <h1>有趣网站合集（作者：lks）</h1>
      <h1><a href="https://lkssite.vip/" target="_blank" rel="noopener noreferrer">lkssite.vip</a></h1>

      <div className="image-container">
        <img src="/krunker.png" alt="Krunker Image" width="650" height="auto" />
      </div>
      <h1>电脑课摸鱼枪战游戏</h1>
      <h1><a href="https://krunker.io" target="_blank" rel="noopener noreferrer">krunker.io</a></h1>

      <div className="image-container">
        <img src="./HKU logo.jpg" alt="HKU Logo" width="650" height="auto" />
      </div>
      <h1>报考香港大学</h1>
      <h1><a href="https://admissions.hku.hk/" target="_blank" rel="noopener noreferrer">做梦（？</a></h1>
    </div>
  );
};

export default ToolsPage;