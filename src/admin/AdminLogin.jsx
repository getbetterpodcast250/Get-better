// src/admin/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetPrompt, setShowResetPrompt] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSignup = () => {
    navigate("/admin/signup");
  };

  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    setShowResetPrompt(true);
  };

  const handleResendResetLink = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        navigate("/admin/studio");
      } else {
        alert("User record not found in database.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box">
        <h1 className="login-title">GET BETTER STUDIO</h1>
        <p className="login-subtitle">
          Sign in to manage your podcast studio. Upload episodes, write blogs, and track performance.
        </p>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Password</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {!showResetPrompt ? (
            <div className="forgot-password" onClick={handleForgotPassword}>
              Forgot password?
            </div>
          ) : (
            <div className="reset-prompt">
              <p className="reset-message">
                Check your inbox and spam folder for a password reset link.
              </p>
              <button className="resend-btn" onClick={handleResendResetLink}>
                {resetSent ? "Link Sent ✔" : "Resend Reset Link"}
              </button>
            </div>
          )}

          <button type="submit" className="login-btn full-width-btn">Sign In</button>
        </form>

        <div className="or-separator">
          <span className="or-line" />
          <span className="or-text">or</span>
          <span className="or-line" />
        </div>

        <button className="signup-btn full-width-btn" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}