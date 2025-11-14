import React, { useState } from "react";
import { X } from "lucide-react";
import "../styles/PaymentModal.css";

export default function PaymentModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("MTN Mobile Money");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! Tip sent: ${amount} RWF via ${method}`);
    setAmount("");
    setPhone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 hover:text-gray-300"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-2 text-center">Send a Tip</h2>
        <p className="text-gray-400 text-sm text-center mb-4">
          Your support helps us create more content. Thank you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm">Amount</label>
            <input
              type="number"
              placeholder="e.g., 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-zinc-800 rounded-lg focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <input
              type="tel"
              placeholder="Your mobile money number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-zinc-800 rounded-lg focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm">Method</label>
            <div className="flex justify-between mt-2">
              {["MTN Mobile Money", "MOMO PAY", "AIRTEL MONEY"].map((m) => (
                <label key={m} className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="method"
                    value={m}
                    checked={method === m}
                    onChange={() => setMethod(m)}
                  />
                  <span className="text-sm">{m}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Send Tip
          </button>
        </form>
      </div>
    </div>
  );
}
