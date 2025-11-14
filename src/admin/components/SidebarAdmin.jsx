import React from "react";
import {
  LayoutDashboard,
  Mic,
  Video,
  FileText,
  Bell,
  Settings,
} from "lucide-react";

export default function SidebarAdmin({ activeTab, setActiveTab }) {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
    { icon: Mic, label: "Audio", key: "audio" },
    { icon: Video, label: "Video", key: "video" },
    { icon: FileText, label: "Blogs", key: "blogs" },
    { icon: Bell, label: "Announcements", key: "announcements" },
    { icon: Settings, label: "Settings", key: "settings" },
  ];

  return (
    <aside className="sidebar-admin">
      <h2 className="studio-title">🎙️ Admin Studio</h2>
      <nav>
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`admin-nav-item ${activeTab === item.key ? "active" : ""}`}
            onClick={() => setActiveTab(item.key)}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}