// src/components/admin/SidebarAdmin.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./SidebarAdmin.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Audio Podcasts", path: "/audio" },
  { label: "Video Podcasts", path: "/video" },
  { label: "Blogs", path: "/blogs" },
  { label: "Studio", path: "/admin/studio" },
  { label: "Announcements", path: "/announcements" },
  { label: "About Us", path: "/about" },
];

export default function SidebarAdmin() {
  return (
    <aside className="sidebar-admin">
      <div className="sidebar-logo">
        <span className="logo-text">GET BETTER</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}