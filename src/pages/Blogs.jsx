// src/pages/Blogs.jsx

import React, { useState, useEffect } from "react";
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

import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Blogs({ openPayment }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const blogData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

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
      {/* MOBILE TOGGLE */}
      <div
        className="mobile-sidebar-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
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
                setMobileOpen(false); // close on mobile
              }}
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
          {blogs.length === 0 ? (
            <p style={{ color: "#999" }}>No blogs available yet.</p>
          ) : (
            blogs.map((blog) => (
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
                    {blog.author ? `By ${blog.author}` : "By Admin"}{" "}
                    {blog.createdAt?.toDate
                      ? `on ${blog.createdAt.toDate().toLocaleDateString()}`
                      : ""}
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
            ))
          )}
        </div>
      </main>
    </div>
  );
}
