import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

import {
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Mic,
  Video,
  FileText,
  Bell,
  PackageSearch,
  Info,
  MessageCircle,
} from "lucide-react";

import "../styles/Shop.css";

export default function Shop() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [products, setProducts] = useState([]);

  const navItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: Mic, label: "Audio Podcasts", path: "/audio" },
    { icon: Video, label: "Video Podcasts", path: "/video" },
    { icon: FileText, label: "Blogs", path: "/blogs" },
    { icon: Bell, label: "Announcements", path: "/announcements" },
    { icon: PackageSearch, label: "Shop", path: "/shop" },
    { icon: Info, label: "About Us", path: "/about" },
  ];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snap) => {
      setProducts(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, []);

  return (
    <div className="appContainer">

      {/* MOBILE TOGGLE */}
      <div
        className="mobile-sidebar-toggle"
        onClick={() => {
          document.querySelector(".sidebar")?.classList.toggle("mobile-open");
        }}
      >
        ☰
      </div>

      {/* SIDEBAR */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">

          {!collapsed && <h1>GET BETTER</h1>}

          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>

        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="nav-item"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* PAGE BODY */}
      <main className="pageContainer">
        <h1>Shop</h1>

        {products.length === 0 ? (
          <div className="emptyBox">
            <h2>Coming Soon!</h2>
            <p>Our shop is under construction. Check back later.</p>
          </div>
        ) : (
          <div className="productGrid">
            {products.map((prod) => (
              <div className="productCard" key={prod.id}>
                <img src={prod.ImageLink} alt={prod.ProductName} />

                <h3>{prod.ProductName}</h3>

                <p className="price">{prod.Price}</p>

                <a
                  className="contactButton"
                  href={`https://wa.me/${prod.ContactInfo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={17} />
                  Contact Seller
                </a>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}