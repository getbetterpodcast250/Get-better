import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Mic,
  Video as VideoIcon,
  FileText,
  Bell,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Video({ openPayment }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const demoVideos = [
    {
      id: 1,
      title: "Interview with a Tech Innovator",
      description: "A deep dive into the future of technology.",
      thumbnail: "https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg",
      link: "https://youtu.be/abcd123",
    },
    {
      id: 2,
      title: "The Science of Well-Being",
      description: "An expert discusses happiness and mental health.",
      thumbnail: "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg",
      link: "https://youtu.be/efgh456",
    },
    {
      id: 3,
      title: "Live Q&A: Your Questions Answered",
      description: "We answer your most pressing questions about self-improvement.",
      thumbnail: "https://images.pexels.com/photos/952437/pexels-photo-952437.jpeg",
      link: "https://youtu.be/xyz789",
    },
  ];

  const navItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: Mic, label: "Audio Podcasts", path: "/audio" },
    { icon: VideoIcon, label: "Video Podcasts", path: "/video" },
    { icon: FileText, label: "Blogs", path: "/blogs" },
    { icon: Bell, label: "Announcements", path: "/announcements" },
    { icon: Info, label: "About Us", path: "/about" },
  ];

  return (
    <div className="app-container">
      {/* SIDEBAR */}
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
              onClick={() => navigate(item.path)}
              className={`nav-item ${
                item.label === "Video Podcasts" ? "active-nav" : ""
              }`}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <h1 className="main-title">Video Podcasts</h1>

        <div className="podcast-grid">
          {demoVideos.map((video) => (
            <div className="podcast-card" key={video.id}>
              <a href={video.link} target="_blank" rel="noreferrer">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="podcast-img"
                />
              </a>

              <div className="podcast-card-content">
                <h3>{video.title}</h3>
                <p style={{ color: "#a1a1aa", marginBottom: "1rem" }}>
                  {video.description}
                </p>

                <button
                  onClick={openPayment}
                  className="tip-button"
                >
                  Tip Us
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
