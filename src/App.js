import React from 'react';
import './styles.css';  // 导入全局样式
import Navbar from './components/navbar';
import Content from './components/content';
import Footer from './components/footer';
import ToolsPage from './components/toolspage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        {/* 导航栏 */}
        <Navbar />

        {/* 内容区域 */}
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/tools" element={<ToolsPage />} />
        </Routes>

        {/* 页脚 */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;