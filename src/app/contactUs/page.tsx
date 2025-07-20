'use client'; // Only if you're in /app directory

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    // If connected to API endpoint, you can POST here
    setTimeout(() => {
      setStatus("Message sent! Thank you 💙");
      setForm({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 py-8">
      <form onSubmit={handleSubmit} className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-sky-800 mb-3 text-center">Contact Us</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          required
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your message..."
          className="w-full p-3 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg hover:bg-sky-700 transition"
        >
          Send Message
        </button>
        <div className="text-center text-sm mt-2 text-green-700">{status}</div>
      </form>
    </div>
  );
}
