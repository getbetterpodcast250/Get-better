// src/admin/AdminResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "../firebase";
import { confirmPasswordReset } from "firebase/auth";
import "./AdminResetPassword.css";

export default function AdminResetPassword() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oobCode, setOobCode] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (code) {
      setOobCode(code);
    } else {
      alert("Invalid or missing reset code.");
      navigate("/admin");
    }
  }, [searchParams, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      alert("Password reset successful!");
      navigate("/admin");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="admin-reset-wrapper">
      <div className="admin-reset-box">
        <h1 className="reset-title">Reset Your Password</h1>
        <p className="reset-subtitle">
          Enter your new password to regain access to your studio.
        </p>

        <form className="reset-form" onSubmit={handleReset}>
          <label>New Password</label>
          <div className="input-wrapper">
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={() => setShowNew(!showNew)}>
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <label>Confirm Password</label>
          <div className="input-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button type="submit" className="reset-btn">Reset Password</button>
        </form>
      </div>
    </div>
  );
}