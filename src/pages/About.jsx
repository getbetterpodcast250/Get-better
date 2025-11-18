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
  Instagram,
  Youtube,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../styles/Home.css";

export default function About() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      {/* MOBILE TOGGLE */}
      <div
        className="mobile-sidebar-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={26} /> : <Menu size={26} />}
      </div>

      {/* SIDEBAR */}
      <aside
        className={`sidebar 
          ${collapsed ? "collapsed" : ""} 
          ${mobileOpen ? "mobile-open" : ""}
        `}
      >
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
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
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
            Our mission is to empower individuals...
          </p>
        </div>

        <div className="about-section mt-16">
          <h2 className="section-title text-center mb-6">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-center text-lg">
            Our vision is to become the leading platform...
          </p>
        </div>

        <div className="about-section mt-20">
          <h2 className="section-title text-center mb-6">What We Believe</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-center text-lg">
            We believe that everyone has the potential...
          </p>
        </div>

        {/* CONTACT */}
        <div className="about-section mt-24">
          <h2 className="section-title text-center mb-8">Contact Us</h2>

          <div className="contact-grid flex flex-wrap justify-center items-center gap-10 text-gray-300 text-md">
            <a
             href="https://wa.me/250788598346"
             target="_blank"
             rel="noreferrer"
             className="contact-item flex items-center gap-3 hover:opacity-80"
            >
             <MessageCircle className="w-6 h-6 text-green-400" />
              <span className="hover:underline">WhatsApp</span>
             </a>


            <a
              href="https://www.instagram.com/getbetterpodcast1/"
              target="_blank"
              rel="noreferrer"
              className="contact-item flex items-center gap-3"
            >
              <Instagram className="w-6 h-6 text-pink-500" />
              <span className="hover:underline">Instagram</span>
            </a>

            <a
              href="https://youtube.com/@lightdeen-c1s?si=yOyDbqAYi5AfSoT8"
              target="_blank"
              rel="noreferrer"
              className="contact-item flex items-center gap-3"
            >
              <Youtube className="w-6 h-6 text-red-500" />
              <span className="hover:underline">YouTube</span>
            </a>
          </div>
        </div>

        <footer className="text-center text-sm text-gray-500 mt-16 mb-6">
          © 2025 NAD PRODUCTION. Developed and All right is reserved
        </footer>
      </main>
    </div>
  );
}
