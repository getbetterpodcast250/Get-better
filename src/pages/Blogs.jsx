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

export default function Blogs({ openPayment }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const demoBlogs = [
    {
      id: 1,
      title: "10 Books That Will Change Your Life",
      description:
        "A curated list of must-read books for personal growth and development.",
      thumbnail: "https://images.pexels.com/photos/1557238/pexels-photo-1557238.jpeg",
      link: "#",
      author: "Jane Doe",
      date: "7/13/2024",
    },
    {
      id: 2,
      title: "How to Build a Morning Routine That Works",
      description:
        "Step-by-step guide to creating a morning ritual that sets you up for success.",
      thumbnail:
        "https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg",
      link: "#",
      author: "John Smith",
      date: "7/7/2024",
    },
    {
      id: 3,
      title: "Embracing Failure: The Key to Growth",
      description:
        "Why failure is not the opposite of success, but a part of it.",
      thumbnail:
        "https://images.pexels.com/photos/313690/pexels-photo-313690.jpeg",
      link: "#",
      author: "Emily White",
      date: "7/1/2024",
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
                item.label === "Blogs" ? "active-nav" : ""
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
        <h1 className="main-title">Blogs</h1>

        <div className="podcast-grid">
          {demoBlogs.map((blog) => (
            <div className="podcast-card" key={blog.id}>
              <a href={blog.link} target="_blank" rel="noreferrer">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="podcast-img"
                />
              </a>

              <div className="podcast-card-content">
                <h3>{blog.title}</h3>

                <p style={{ color: "#a1a1aa", marginBottom: "0.6rem" }}>
                  {blog.description}
                </p>

                <p style={{ fontSize: "0.85rem", color: "#777" }}>
                  By {blog.author} on {blog.date}
                </p>

                <button
                  className="tip-button"
                  onClick={openPayment}
                  style={{ marginTop: "1rem" }}
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
