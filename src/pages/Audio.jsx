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
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import PaymentModal from "../components/PaymentModal";
import "../styles/Home.css";

export default function Audio() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Firestore state
  const [audioList, setAudioList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: Mic, label: "Audio Podcasts", path: "/audio" },
    { icon: Video, label: "Video Podcasts", path: "/video" },
    { icon: FileText, label: "Blogs", path: "/blogs" },
    { icon: Bell, label: "Announcements", path: "/announcements" },
    { icon: Info, label: "About Us", path: "/about" },
  ];

  // ------------ FETCH AUDIO FROM FIRESTORE ------------
  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "audio"));
        const audioData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAudioList(audioData);
      } catch (err) {
        console.error("Error fetching audio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAudio();
  }, []);

  return (
    <div className="app-container">
      {/* MOBILE SIDEBAR BUTTON */}
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
                setMobileOpen(false); // auto close on mobile
              }}
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

        {loading && <p className="empty">Loading...</p>}
        {!loading && audioList.length === 0 && (
          <p className="empty">No Available Content</p>
        )}

        {!loading && audioList.length > 0 && (
          <div className="podcast-grid">
            {audioList.map((item) => (
              <div key={item.id} className="podcast-card">
                <a
                  href={item.podcastLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="podcast-img"
                  />
                </a>

                <div className="podcast-card-content">
                  <h3>{item.title}</h3>
                  <p className="podcast-description">{item.description}</p>

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
      </main>

      {/* PAYMENT MODAL */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
      />
    </div>
  );
}
