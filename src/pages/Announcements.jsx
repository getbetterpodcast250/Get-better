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

import PaymentModal from "../components/PaymentModal";
import "../styles/Home.css";

export default function Announcements() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Example announcements
  const mockAnnouncements = [
    {
      title: "New Studio Equipment Arrived!",
      date: "Feb 2, 2025",
      description:
        "We just upgraded our studio with new microphones and production tools for even better podcast quality.",
      link: "https://example.com",
    },
    {
      title: "Weekly Motivation Series Launch",
      date: "Jan 28, 2025",
      description:
        "A new series of short motivational audio clips is coming this week. Stay tuned!",
      link: "https://example.com",
    },
    {
      title: "Community Q&A This Saturday",
      date: "Jan 20, 2025",
      description:
        "Join our live Q&A session and ask anything about self-improvement, productivity, and creativity.",
      link: "https://example.com",
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
                item.label === "Announcements" ? "active-nav" : ""
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
        <h1 className="main-title">Announcements</h1>

        {mockAnnouncements.length > 0 ? (
          <div className="card-grid">
            {mockAnnouncements.map((item, index) => (
              <div
                key={index}
                className="card-item bg-zinc-800 rounded-2xl p-6 shadow-md flex flex-col justify-between
                border border-white/20 shadow-lg shadow-white/5"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{item.date}</p>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>

                <div className="mt-4">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 text-sm hover:underline"
                    >
                      Read More →
                    </a>
                  )}

                  <button
                    onClick={() => setShowPayment(true)}
                    className="tip-button mt-4"
                  >
                    Tip Us
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-box">
            <h2>No Announcements Yet</h2>
            <p>Check back later for updates and news.</p>
          </div>
        )}
      </main>

      {/* PAYMENT MODAL */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
      />
    </div>
  );
}
