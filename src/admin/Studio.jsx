// Studio.jsx
import React, { useRef, useEffect, useState } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import SidebarAdmin from "./component/SidebarAdmin";
import Dashboard from "./component/Dashboard";
import Upload from "./component/Upload";
import BlogCanvas from "./component/BlogCanvas";
import Market from "./component/Market";

import "./Studio.css";

export default function Studio() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const order = [
      "/admin/studio",
      "/admin/studio/upload",
      "/admin/studio/blog",
      "/admin/studio/market",
    ];

    const prevIndex = order.indexOf(prevPath.current);
    const currentIndex = order.indexOf(location.pathname);

    setDirection(currentIndex > prevIndex ? 1 : -1);
    prevPath.current = location.pathname;
  }, [location.pathname]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <div className="studio-wrapper">
      <SidebarAdmin />

      <div className="studio-main">
        <div className="studio-header">
          <h2 className="studio-title">Studio</h2>

          <div className="studio-tabs">
            <NavLink to="/admin/studio" end className="tab-link">
              Dashboard
            </NavLink>

            <NavLink to="/admin/studio/upload" className="tab-link">
              Upload
            </NavLink>

            <NavLink to="/admin/studio/blog" className="tab-link">
              Blog Canvas
            </NavLink>

            <NavLink to="/admin/studio/market" className="tab-link">
              Market
            </NavLink>
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <Routes location={location} key={location.pathname}>

            <Route
              index
              element={
                <motion.div
                  className="studio-inner"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                >
                  <Dashboard />
                </motion.div>
              }
            />

            <Route
              path="upload"
              element={
                <motion.div
                  className="studio-inner"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                >
                  <Upload />
                </motion.div>
              }
            />

            <Route
              path="blog"
              element={
                <motion.div
                  className="studio-inner"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                >
                  <BlogCanvas />
                </motion.div>
              }
            />

            <Route
              path="market"
              element={
                <motion.div
                  className="studio-inner"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                >
                  <Market />
                </motion.div>
              }
            />

          </Routes>
        </AnimatePresence>

      </div>
    </div>
  );
}
