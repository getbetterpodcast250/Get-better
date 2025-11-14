import React, { useState } from "react";
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

export default function Audio() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const navItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: Mic, label: "Audio Podcasts", path: "/audio" },
    { icon: Video, label: "Video Podcasts", path: "/video" },
    { icon: FileText, label: "Blogs", path: "/blogs" },
    { icon: Bell, label: "Announcements", path: "/announcements" },
    { icon: Info, label: "About Us", path: "/about" },
  ];

  const mockAudio = [
    {
      title: "The Art of Daily Improvement",
      thumbnail: "https://plus.unsplash.com/premium_photo-1726711239865-4b354428bb98?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#",
      description: "Explore the small habits that lead to big changes.",
    },
    {
      title: "Mindset Shifts for Success",
      thumbnail: "https://images.unsplash.com/photo-1587440871875-191322ee64b0",
      link: "#",
      description: "How to think like a winner and overcome self-doubt.",
    },
    {
      title: "Productivity Hacks for the Modern…",
      thumbnail: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42",
      link: "#",
      description: "Tips and tricks to get more done in less time.",
    },
    {
      title: "Financial Freedom Starter Guide",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      link: "#",
      description: "Build a strong financial base for your future.",
    },
  ];

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!collapsed && <h1>GET BETTER</h1>}
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`nav-item ${
                item.label === "Audio Podcasts" ? "active-nav" : ""
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
        <h1 className="main-title">Audio Podcasts</h1>

        {mockAudio.length === 0 ? (
          <p className="empty">No Available Content</p>
        ) : (
          <div className="podcast-grid">
            {mockAudio.map((item, i) => (
              <div key={i} className="podcast-card">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img src={item.thumbnail} alt={item.title} className="podcast-img" />
                </a>
                <div className="podcast-card-content">
                  <h3>{item.title}</h3>
                  <p className="podcast-description">{item.description}</p>
                  <button onClick={() => setShowPayment(true)} className="tip-button">
                    Tip Us
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* PAYMENT MODAL */}
      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
    </div>
  );
}