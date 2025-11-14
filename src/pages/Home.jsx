import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Mic,
  Video,
  FileText,
  Bell,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [trending, setTrending] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  const mockAudio = [];
  const mockVideo = [];
  const mockBlogs = [];

  useEffect(() => {
    const combined = [...mockAudio, ...mockVideo];
    const top = combined.sort((a, b) => b.plays - a.plays).slice(0, 5);
    setTrending(top);
  }, []);

  const sections = [
    { title: "Recent Audio Podcasts", data: mockAudio },
    { title: "Recent Video Podcasts", data: mockVideo },
    { title: "Trending Podcasts", data: trending },
    { title: "Recent Blogs", data: mockBlogs },
  ];

  // --- Sidebar Navigation Items ---
  const navItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: Mic, label: "Audio Podcasts", path: "/audio" },
    { icon: Video, label: "Video Podcasts", path: "/video" },
    { icon: FileText, label: "Blogs", path: "/blogs" },
    { icon: Bell, label: "Announcements", path: "/announcements" },
    { icon: Info, label: "About Us", path: "/about" },
  ];

  return (
    <div className="app-container">
      
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!collapsed && <h1>GET BETTER</h1>}
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="nav-item"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">GET BETTER PODCAST</h1>
        <p className="subtitle">
          Everyday and in every way I am getting better and better and better.
        </p>

        {sections.map((section) => (
          <div key={section.title} className="section">
            <h2 className="section-title">{section.title}</h2>

            {section.data.length === 0 ? (
              <p className="empty">No Available Content</p>
            ) : (
              <div className="podcast-grid">
                {section.data.map((item, index) => (
                  <div key={index} className="podcast-card">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="podcast-img"
                      />
                    </a>

                    <div className="podcast-card-content">
                      <h3>{item.title}</h3>

                      <button
                        onClick={() => setShowPayment(true)}
                        className="tip-button"
                      >
                        Tip Us
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="about-section">
          <h2>About Us</h2>
          <p>
            <strong>Our Mission:</strong> To empower individuals through
            insightful conversations that inspire growth, productivity, and
            self-improvement.
          </p>
          <p>
            <strong>Our Vision:</strong> To be the leading platform that helps
            people get better every day — mentally, emotionally, and
            professionally.
          </p>
        </div>
      </main>

      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)} 
      />
    </div>
  );
}
