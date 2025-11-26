import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Mic,
  Video,
  FileText,
  Bell,
  PackageSearch,
  Info,
  Instagram,
  Youtube,
  MessageCircle,
  Target,
  Eye,
  Heart,
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
    { icon: PackageSearch, label: "Shop", path: "/shop" },
    { icon: Info, label: "About Us", path: "/about" },
  ];

  return (
    <div className="appContainer">
      {/* MOBILE TOGGLE */}
      <div
        className="mobile-sidebar-toggle"
        onClick={() => {
          document.querySelector(".sidebar")?.classList.toggle("mobile-open");
        }}
      >
        ☰
      </div>

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
              className="nav-item"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="pageContainer">
        <h1 className="main-title">About Us</h1>
        <p className="subtitle">
          Learn more about our purpose, why we exist, and where we are going.
        </p>

        {/* OUR MISSION */}
        <div className="about-section mt-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Target className="w-8 h-8 text-blue-400" />
            <h2 className="section-title">Our Mission</h2>
          </div>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-center text-lg">
            To empower individuals through insightful conversations that inspire growth, 
            productivity, and self-improvement.
          </p>
        </div>

        {/* OUR VISION */}
        <div className="about-section mt-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Eye className="w-8 h-8 text-purple-400" />
            <h2 className="section-title">Our Vision</h2>
          </div>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-center text-lg">
            To be the leading platform that helps people get better every day — 
            mentally, emotionally, and professionally.
          </p>
        </div>

        {/* OUR MOTTO */}
        <div className="about-section mt-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-red-400" />
            <h2 className="section-title">Our Motto</h2>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-white text-xl font-semibold text-center leading-relaxed italic">
              "Everyday and in every way I am getting better and better and better."
            </p>
          </div>
        </div>

        {/* WHAT WE BELIEVE */}
        <div className="about-section mt-20">
          <h2 className="section-title text-center mb-6">What We Believe</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-center text-lg">
            We believe that everyone has the potential to transform their lives through 
            consistent learning, self-reflection, and actionable insights. Every conversation, 
            every episode, and every resource we create is designed to help you become 
            the best version of yourself.
          </p>
        </div>

        {/* CONTACT */}
        <div className="about-section mt-24">
          <h2 className="section-title text-center mb-8">Connect With Us</h2>

          <div className="contact-grid flex flex-wrap justify-center items-center gap-10 text-gray-300 text-md">
            <a
              href="https://wa.me/250788598346"
              target="_blank"
              rel="noreferrer"
              className="contact-item flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <MessageCircle className="w-6 h-6 text-green-400" />
              <span className="hover:underline">WhatsApp</span>
            </a>

            <a
              href="https://www.instagram.com/getbetterpodcast1/"
              target="_blank"
              rel="noreferrer"
              className="contact-item flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Instagram className="w-6 h-6 text-pink-500" />
              <span className="hover:underline">Instagram</span>
            </a>

            <a
              href="https://youtube.com/@lightdeen-c1s?si=yOyDbqAYi5AfSoT8"
              target="_blank"
              rel="noreferrer"
              className="contact-item flex items-center gap-3 hover:opacity-80 transition-opacity"
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