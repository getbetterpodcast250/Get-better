// src/admin/component/BlogCanvas.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";

import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import "./BlogCanvas.css";

export default function BlogCanvas() {
  const [form, setForm] = useState({
    type: "Blog",
    title: "",
    thumbnail: "",
    link: "",
    description: "", // ✅ Added description field
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const { title, thumbnail, link, description } = form;

    if (!title.trim() || !thumbnail.trim() || !link.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleDeploy = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const { type, title, thumbnail, link, description } = form;

      const collectionName =
        type === "Announcement" ? "announcements" : "blogs";

      await addDoc(collection(db, collectionName), {
        type,
        title: title.trim(),
        thumbnail: thumbnail.trim(),
        link: link.trim(),
        description: description.trim(), // ✅ Save description to Firestore
        createdAt: serverTimestamp(),
      });

      alert("Content deployed successfully!");

      setForm({
        type: "Blog",
        title: "",
        thumbnail: "",
        link: "",
        description: "", // ✅ Reset description
      });
    } catch (error) {
      console.error("Error deploying blog:", error);
      alert("Failed to deploy, please try again.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="blog-canvas"
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -80, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Deploy New Content</h1>
      <p>Publish a blog or announcement by adding the required details.</p>

      {/* TYPE */}
      <div className="form-group">
        <label>Type of Content</label>
        <select
          value={form.type}
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <option value="Blog">Blog</option>
          <option value="Announcement">Announcement</option>
        </select>
      </div>

      {/* TITLE */}
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter title..."
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      {/* THUMBNAIL */}
      <div className="form-group">
        <label>Thumbnail Link</label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={form.thumbnail}
          onChange={(e) => handleChange("thumbnail", e.target.value)}
        />

        {/* ✅ LIVE THUMBNAIL PREVIEW */}
        {form.thumbnail.trim() !== "" && (
          <img
            src={form.thumbnail}
            alt="Thumbnail Preview"
            className="thumbnail-preview"
            onError={(e) => {
              e.target.src = "";
              e.target.style.display = "none";
            }}
          />
        )}
      </div>

      {/* LINK FIELD */}
      <div className="form-group">
        <label>
          {form.type === "Blog" ? "Blog Link" : "Announcement Link"}
        </label>
        <input
          type="text"
          placeholder={
            form.type === "Blog"
              ? "https://your-blog-link"
              : "https://your-announcement-link"
          }
          value={form.link}
          onChange={(e) => handleChange("link", e.target.value)}
        />
      </div>

      {/* DESCRIPTION FIELD */}
      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Write a short description..."
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
        />
      </div>

      <button className="deploy-btn" onClick={handleDeploy} disabled={loading}>
        {loading ? "Deploying..." : "Deploy"}
      </button>
    </motion.div>
  );
}