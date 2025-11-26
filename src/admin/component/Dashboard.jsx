import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Video,
  Mic,
  FileText,
  PackageSearch,
} from "lucide-react";

import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Dashboard() {
  const [audio, setAudio] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);

  // Expand/collapse states
  const [expanded, setExpanded] = useState({
    audio: false,
    video: false,
    blogs: false,
    products: false,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const audioSnap = await getDocs(query(collection(db, "audio"), orderBy("createdAt", "desc")));
        const videoSnap = await getDocs(query(collection(db, "video"), orderBy("createdAt", "desc")));
        const blogSnap = await getDocs(query(collection(db, "blogs"), orderBy("createdAt", "desc")));

        // Products: unordered (no createdAt)
        const productsSnap = await getDocs(collection(db, "products"));

        setAudio(audioSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setVideoData(videoSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setBlogs(blogSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setProducts(productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchAllData();
  }, []);

  const toggleSection = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    { key: "video", icon: Video, title: "Video Podcasts", data: videoData },
    { key: "products", icon: PackageSearch, title: "Our Products", data: products },
    { key: "audio", icon: Mic, title: "Audio Podcasts", data: audio },
    { key: "blogs", icon: FileText, title: "Blogs", data: blogs },
  ];

  return (
    <motion.div
      className="studio-panel"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Dashboard</h1>
      <p>An overview of your podcast's performance.</p>

      <div className="dashboard-sections">
        {sections.map((sec) => (
          <div key={sec.key} className="dashboard-section">

            {/* HEADER ROW */}
            <div className="section-header" onClick={() => toggleSection(sec.key)}>
              <sec.icon className="w-5 h-5" />
              <h2>{sec.title}</h2>
              {expanded[sec.key] ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>

            {/* COLLAPSIBLE CONTENT */}
            <motion.div
              initial={false}
              animate={{
                height: expanded[sec.key] ? "auto" : 0,
                opacity: expanded[sec.key] ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="section-content-wrapper"
            >
              <div className="section-content">
                {sec.data.length === 0 ? (
                  <p className="empty">No Data</p>
                ) : (
                  sec.data.map((item) => (
                    <div key={item.id} className="row-item">
                      <img
                        src={
                          sec.key === "products"
                            ? item.ImageLink
                            : item.thumbnail
                        }
                        alt="thumb"
                        className="row-thumb"
                      />

                      <div className="row-text">
                        <h4>
                          {sec.key === "products" ? item.ProductName : item.title}
                        </h4>

                        <p className="row-desc">
                          {sec.key === "products" ? `Price: ${item.Price}` : item.description}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: "40px", fontStyle: "italic" }}>
        Dashboard content coming soon.
      </p>
    </motion.div>
  );
}
