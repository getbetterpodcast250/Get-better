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

import "../styles/Home.css";

export default function About() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

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
                item.label === "About Us" ? "active-nav" : ""
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
        <h1 className="main-title">About Us</h1>
        <p className="subtitle">
          Learn more about our purpose, why we exist, and where we are going.
        </p>

        <div className="about-section mt-12">
          <h2 className="section-title text-center mb-6">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-center text-lg">
            Our mission is to empower individuals through insightful conversations
            that inspire growth, discipline, productivity, and self-improvement.
            Every episode, video, and article is created with one purpose — helping
            you become a better version of yourself.
          </p>
        </div>

        <div className="about-section mt-16">
          <h2 className="section-title text-center mb-6">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-center text-lg">
            Our vision is to become the leading platform for personal development —
            a place where millions of people around the world come to learn, grow,
            and improve every single day. We aim to create a global community of
            individuals committed to becoming better in mind, body, and spirit.
          </p>
        </div>

        <div className="about-section mt-20">
          <h2 className="section-title text-center mb-6">What We Believe</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-center text-lg">
            We believe that everyone has the potential to grow. With the right
            knowledge, motivation, and consistency, anybody can rewrite their story.
            Through our podcasts, videos, blogs, and announcements — we exist to
            guide you on that journey of becoming better every day.
          </p>
        </div>
      </main>
    </div>
  );
}
