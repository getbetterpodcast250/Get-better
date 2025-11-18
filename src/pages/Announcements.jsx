// src/pages/Announcements.jsx

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
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import PaymentModal from "../components/PaymentModal";
import "../styles/Home.css";

import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Announcements() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const q = query(
          collection(db, "announcements"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
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

        {announcements.length > 0 ? (
          <div className="card-grid">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="card-item bg-zinc-800 rounded-2xl p-6 shadow-md flex flex-col justify-between
                border border-white/20 shadow-lg shadow-white/5"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {item.createdAt?.toDate
                      ? item.createdAt.toDate().toLocaleDateString()
                      : ""}
                  </p>
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
