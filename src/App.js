// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Audio from "./pages/Audio";
import Video from "./pages/Video";
import Blogs from "./pages/Blogs";
import Announcements from "./pages/Announcements";
import About from "./pages/About";

// Admin Studio
import Studio from "./admin/Studio";
import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import AdminResetPassword from "./admin/AdminResetPassword";

// Auth Protection
import ProtectedRoute from "./admin/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/video" element={<Video />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/about" element={<About />} />

        {/* Admin Auth Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />

        {/* Protected Studio Route */}
        <Route
          path="/admin/studio/*"
          element={
            <ProtectedRoute>
              <Studio />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
