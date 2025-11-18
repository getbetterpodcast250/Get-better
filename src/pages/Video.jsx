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

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import PaymentModal from "../components/PaymentModal";
import "../styles/Home.css";

export default function Video() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showPayment, setShowPayment] = useState(false);

  const navItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: Mic, label: "Audio Podcasts", path: "/audio" },
    { icon: VideoIcon, label: "Video Podcasts", path: "/video" },
    { icon: FileText, label: "Blogs", path: "/blogs" },
    { icon: Bell, label: "Announcements", path: "/announcements" },
    { icon: Info, label: "About Us", path: "/about" },
  ];

  // ------------ FETCH VIDEO PODCASTS FROM FIRESTORE ------------
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "video"));
        const videoData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVideos(videoData);
      } catch (err) {
        console.error("Error fetching video podcasts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="app-container">

      {/* ============================
          MOBILE SIDEBAR TOGGLE BUTTON
      ============================= */}
      <div
        className="mobile-sidebar-toggle"
        onClick={() => {
          document.querySelector(".sidebar").classList.toggle("mobile-open");
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

        {/* LOADING */}
        {loading && <p className="empty">Loading videos...</p>}

        {/* EMPTY STATE */}
        {!loading && videos.length === 0 && (
          <p className="empty">No video podcasts available</p>
        )}

        {/* CONTENT */}
        {!loading && videos.length > 0 && (
          <div className="podcast-grid">
            {videos.map((video) => (
              <div className="podcast-card" key={video.id}>
                <a
                  href={video.podcastLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="podcast-img"
                  />
                </a>

                <div className="podcast-card-content">
                  <h3>{video.title}</h3>

                  <p className="podcast-description">
                    {video.description}
                  </p>

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
