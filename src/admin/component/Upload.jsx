// src/admin/component/Upload.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase"; 
import "./Upload.css";

export default function Upload() {
  const [form, setForm] = useState({
    type: "Audio",
    title: "",
    thumbnail: "",
    podcastLink: "",
    description: "", // ✅ Added description to state
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { type, title, thumbnail, podcastLink, description } = form;

    // ✅ Validate description field
    if (!title || !thumbnail || !podcastLink || !description) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Determine collection name (lowercase)
      const collectionName = type.toLowerCase(); // "audio" or "video"

      // Auto-creates the collection if it does not exist
      await addDoc(collection(db, collectionName), {
        type,
        title,
        thumbnail,
        podcastLink,
        description, // ✅ Save description to Firestore
        createdAt: serverTimestamp(),
      });

      alert(`Episode saved successfully to ${collectionName} collection!`);

      // Reset form
      setForm({
        type: "Audio",
        title: "",
        thumbnail: "",
        podcastLink: "",
        description: "", // ✅ Reset description
      });
    } catch (error) {
      console.error("Error saving document:", error);
      alert("An error occurred while saving the episode.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="upload-panel"
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -80, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Upload New Episode</h1>
      <p>Submit a new audio or video podcast.</p>

      <div className="form-group">
        <label>Content Type</label>
        <select
          value={form.type}
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <option value="Audio">Audio</option>
          <option value="Video">Video</option>
        </select>
      </div>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Your episode title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Thumbnail Link</label>
        <input
          type="text"
          placeholder="https://example.com/thumbnail.jpg"
          value={form.thumbnail}
          onChange={(e) => handleChange("thumbnail", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Podcast Link</label>
        <input
          type="text"
          placeholder="https://example.com/podcast.mp3"
          value={form.podcastLink}
          onChange={(e) => handleChange("podcastLink", e.target.value)}
        />
      </div>

      {/* ✅ ADDED DESCRIPTION FIELD */}
      <div className="form-group">
        <label>Description</label>
        <textarea
          placeholder="Write a short description regarding the episode..."
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
        />
      </div>

      <button className="upload-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Uploading..." : "Upload Episode"}
      </button>
    </motion.div>
  );
}