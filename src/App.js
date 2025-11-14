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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/video" element={<Video />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
