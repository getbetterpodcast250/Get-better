import React from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
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
      <p>Dashboard content coming soon.</p>
    </motion.div>
  );
}