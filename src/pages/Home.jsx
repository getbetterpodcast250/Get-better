import React, { useState, useEffect } from "react";
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
  Instagram,
  Youtube,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";
import "../styles/Home.css";

import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Home() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [audio, setAudio] = useState([]);
  const [video, setVideo] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);

  // Scroll states for each section
  const [videoScroll, setVideoScroll] = useState(0);
  const [productsScroll, setProductsScroll] = useState(0);
  const [audioScroll, setAudioScroll] = useState(0);
  const [blogsScroll, setBlogsScroll] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch audio, video, and blogs
        const audioSnap = await getDocs(query(collection(db, "audio"), orderBy("createdAt", "desc")));
        const videoSnap = await getDocs(query(collection(db, "video"), orderBy("createdAt", "desc")));
        const blogSnap = await getDocs(query(collection(db, "blogs"), orderBy("createdAt", "desc")));
        
        // Fetch products - no ordering since there's no createdAt field in your structure
        const productsSnap = await getDocs(collection(db, "products"));

        setAudio(audioSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setVideo(videoSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setBlogs(blogSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setProducts(productsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  const sections = [
    { title: "Video Podcasts", data: video, type: "video", scroll: videoScroll, setScroll: setVideoScroll },
    { title: "Our Products", data: products, type: "products", scroll: productsScroll, setScroll: setProductsScroll },
    { title: "Audio Podcasts", data: audio, type: "audio", scroll: audioScroll, setScroll: setAudioScroll },
    { title: "Blogs", data: blogs, type: "blog", scroll: blogsScroll, setScroll: setBlogsScroll },
  ];

  const navItems = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: Mic, label: "Audio Podcasts", path: "/audio" },
    { icon: Video, label: "Video Podcasts", path: "/video" },
    { icon: FileText, label: "Blogs", path: "/blogs" },
    { icon: Bell, label: "Announcements", path: "/announcements" },
    { icon: PackageSearch, label: "Shop", path: "/shop" },
    { icon: Info, label: "About Us", path: "/about" },
  ];

  const contactIcons = [
    {
      icon: MessageCircle,
      href: "https://wa.me/250788598346",
      label: "WhatsApp",
      color: "hover:text-green-400"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/getbetterpodcast1/",
      label: "Instagram",
      color: "hover:text-pink-500"
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@lightdeen-c1s?si=yOyDbqAYi5AfSoT8",
      label: "YouTube",
      color: "hover:text-red-500"
    }
  ];

  const handleCardClick = (item, contentType) => {
    if (item.podcastLink || item.link) {
      window.open(item.podcastLink || item.link, '_blank', 'noopener,noreferrer');
    } else {
      switch (contentType) {
        case 'audio': navigate('/audio'); break;
        case 'video': navigate('/video'); break;
        case 'blog': navigate('/blogs'); break;
        case 'products': navigate('/shop'); break;
        default: navigate('/');
      }
    }
  };

  const handleTipClick = (e) => {
    e.stopPropagation();
    setShowPayment(true);
  };

  const scrollSection = (section, direction) => {
    const scrollAmount = 300;
    const newScroll = direction === 'right' 
      ? section.scroll + scrollAmount 
      : Math.max(0, section.scroll - scrollAmount);
    
    section.setScroll(newScroll);
  };

  const getVisibleItems = (data, scrollPosition) => {
    return data.slice(scrollPosition / 300, (scrollPosition / 300) + 5);
  };

  const showViewMore = (data, scrollPosition) => {
    return data.length > 5 && (scrollPosition / 300) + 5 >= data.length;
  };

  // Format WhatsApp number by removing spaces and special characters
  const formatWhatsAppNumber = (contactInfo) => {
    if (!contactInfo) return '';
    return contactInfo.replace(/\s+/g, '').replace('+', '');
  };

  return (
    <div className={`app-container ${showPayment ? 'modal-open' : ''}`}>

      {/* MOBILE SIDEBAR TOGGLE BUTTON */}
      <div
        className="mobile-sidebar-toggle"
        onClick={() => {
          document.querySelector(".sidebar").classList.toggle("mobile-open");
        }}
      >
        ☰
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!collapsed && <h1>GET BETTER</h1>}
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button key={item.label} className="nav-item" onClick={() => navigate(item.path)}>
              <item.icon className="w-5 h-5" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="hero-section">
          <h1 className="main-title">GET BETTER PODCAST</h1>
          <p className="subtitle">
            Everyday and in every way I am getting better and better and better.
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.title} className="section">
            <h2 className="section-title">{section.title}</h2>

            {section.data.length === 0 ? (
              <p className="empty">No Available Content</p>
            ) : (
              <div className="section-container">
                {/* Left Arrow */}
                {section.scroll > 0 && (
                  <button 
                    className="scroll-arrow left-arrow"
                    onClick={() => scrollSection(section, 'left')}
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Content */}
                <div className="scrollable-content">
                  <div className="podcast-grid">
                    {getVisibleItems(section.data, section.scroll).map((item) => (
                      <div
                        key={item.id}
                        className={`podcast-card ${section.type === 'products' ? 'product-card' : ''}`}
                        onClick={() => handleCardClick(item, section.type)}
                      >
                        <img 
                          src={section.type === 'products' ? item.ImageLink : item.thumbnail} 
                          alt={section.type === 'products' ? item.ProductName : item.title} 
                          className="podcast-img" 
                        />
                        <div className="podcast-card-content">
                          <h3>{section.type === 'products' ? item.ProductName : item.title}</h3>
                          <p className="podcast-description">
                            {section.type === 'products' ? `Price: ${item.Price}` : item.description}
                          </p>
                          {section.type === 'products' ? (
                            <a
                              href={`https://wa.me/${formatWhatsAppNumber(item.ContactInfo)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="contact-button"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MessageCircle size={17} />
                              Contact Seller
                            </a>
                          ) : (
                            <button onClick={handleTipClick} className="tip-button">
                              Tip Us
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* View More Card */}
                    {showViewMore(section.data, section.scroll) && (
                      <div 
                        className="view-more-card"
                        onClick={() => navigate(`/${section.type === 'products' ? 'shop' : section.type}`)}
                      >
                        <div className="view-more-content">
                          <h3>View More</h3>
                          <p>See all {section.title.toLowerCase()}</p>
                          <ArrowRight className="w-8 h-8 mt-2" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Arrow */}
                {section.data.length > 5 && (section.scroll / 300) + 5 < section.data.length && (
                  <button 
                    className="scroll-arrow right-arrow"
                    onClick={() => scrollSection(section, 'right')}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {/* About Section */}
        <div className="about-section">
          <h2>About Us</h2>
          <div className="about-content">
            <p>
              <strong>Our Mission:</strong> To empower individuals through insightful conversations
              that inspire growth, productivity, and self-improvement.
            </p>
            <p>
              <strong>Our Vision:</strong> To be the leading platform that helps people get better
              every day — mentally, emotionally, and professionally.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-icons">
            {contactIcons.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`contact-item ${contact.color}`}
                aria-label={contact.label}
              >
                <contact.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <p>© 2025 NAD PRODUCTION. Developed and All right is reserved</p>
        </footer>
      </main>

      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} />
    </div>
  );
}
