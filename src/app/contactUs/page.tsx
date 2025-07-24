"use client";
export default ContactUs;
// Contact form component
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you can add API call to send the message
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sky-700 font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sky-700 font-semibold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sky-700 font-semibold mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-sky-600 text-white font-bold rounded-lg shadow hover:bg-sky-700 transition-colors"
        disabled={submitted}
      >
        {submitted ? "Thank you!" : "Send Message"}
      </button>
    </form>
  );
}
// Animated cloud background imports
import React, { useRef, useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
// Import cloud images if needed

// Cloud configs (copied from main page)
const CLOUD_CONFIGS = [
  {
    top: "2.5rem",
    left: 5,
    width: 120,
    height: 60,
    opacity: 0.7,
    blur: "blur-md",
    float: "animate-cloudFloat",
    z: 2,
    speed: 0.08,
  },
  {
    top: "6rem",
    left: 60,
    width: 100,
    height: 50,
    opacity: 0.5,
    blur: "blur-lg",
    float: "animate-cloudFloatSlow",
    z: 1,
    speed: 0.06,
  },
  {
    top: "12rem",
    left: 30,
    width: 80,
    height: 40,
    opacity: 0.6,
    blur: "blur-md",
    float: "animate-cloudFloatReverse",
    z: 2,
    speed: 0.07,
  },
  {
    top: "18rem",
    left: 80,
    width: 110,
    height: 55,
    opacity: 0.4,
    blur: "blur-lg",
    float: "animate-cloudFloat",
    z: 1,
    speed: 0.05,
  },
  {
    top: "24rem",
    left: 15,
    width: 90,
    height: 45,
    opacity: 0.5,
    blur: "blur-md",
    float: "animate-cloudFloatSlow",
    z: 2,
    speed: 0.09,
  },
  {
    top: "30rem",
    left: 70,
    width: 100,
    height: 50,
    opacity: 0.6,
    blur: "blur-lg",
    float: "animate-cloudFloatReverse",
    z: 1,
    speed: 0.08,
  },
  {
    top: "36rem",
    left: 40,
    width: 120,
    height: 60,
    opacity: 0.7,
    blur: "blur-md",
    float: "animate-cloudFloat",
    z: 2,
    speed: 0.06,
  },
  {
    top: "42rem",
    left: 85,
    width: 80,
    height: 40,
    opacity: 0.5,
    blur: "blur-lg",
    float: "animate-cloudFloatSlow",
    z: 1,
    speed: 0.05,
  },
];

type CloudConfig = {
  top?: string;
  bottom?: string;
  left?: number;
  right?: number;
  width: number;
  height: number;
  opacity: number;
  blur: string;
  float: string;
  z: number;
  speed: number;
};

function MovableCloud({ config, idx }: { config: CloudConfig; idx: number }) {
  const [pos, setPos] = useState(() => ({
    x: config.left !== undefined ? config.left : config.right,
    y: 0,
    dragging: false,
    dragStartX: 0,
    dragOffset: 0,
  }));
  const cloudRef = useRef(null);
  useEffect(() => {
    let raf: number;
    let lastTime = performance.now();
    function animate(now: number) {
      const dt = (now - lastTime) / 16.67;
      lastTime = now;
      if (!pos.dragging) {
        setPos((prev) => {
          let x = (prev.x ?? 0) + config.speed * dt;
          if (config.speed > 0 && x > 120) x = -40;
          if (config.speed < 0 && x < -40) x = 120;
          return { ...prev, x };
        });
      }
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [config.speed, pos.dragging]);
  function onDown(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    e.preventDefault();
    setPos((prev) => ({
      ...prev,
      dragging: true,
      dragStartX: "touches" in e ? e.touches[0].clientX : e.clientX,
      dragOffset: prev.x ?? 0,
    }));
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
  }
  function onMove(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    setPos((prev) => {
      let clientX: number;
      if ("touches" in e && (e as TouchEvent).touches.length > 0) {
        clientX = (e as TouchEvent).touches[0].clientX;
      } else {
        clientX = (e as MouseEvent).clientX;
      }
      let x = prev.dragOffset + (clientX - prev.dragStartX) / 8;
      if (x < -40) x = -40;
      if (x > 120) x = 120;
      return { ...prev, x };
    });
  }
  function onUp() {
    setPos((prev) => ({ ...prev, dragging: false }));
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("mouseup", onUp);
    window.removeEventListener("touchend", onUp);
  }
  const style = {
    position: "absolute",
    width: config.width,
    height: config.height,
    zIndex: config.z,
    opacity: 1,
    cursor: "grab",
    top: config.top,
    bottom: config.bottom,
    left: config.left !== undefined ? `${pos.x}%` : undefined,
    right: config.right !== undefined ? `${pos.x}%` : undefined,
    transition: pos.dragging ? "none" : "box-shadow 0.2s",
    touchAction: "none",
  };
  return (
    <div
      ref={cloudRef}
      style={style as React.CSSProperties}
      className="group select-none"
    >
      <div
        className={`w-full h-full bg-white rounded-full ${config.blur} ${config.float}`}
        style={{ opacity: config.opacity, position: "absolute" }}
        onMouseDown={onDown}
        onTouchStart={onDown}
        tabIndex={0}
        aria-label={`Cloud ${idx + 1}`}
      />
    </div>
  );
}

function ContactUs() {
  // Parallax state for movable clouds
  const cloudsParallaxRef = useRef(null);
  const parallaxOffset = useRef(0);
  useEffect(() => {
    const bg = document.getElementById("cloud-bg-parallax-contact");
    if (!bg || !cloudsParallaxRef.current) return;
    const clouds = cloudsParallaxRef.current;
    let dragging = false;
    let startX = 0;
    let lastOffset = 0;
    function setTransform(offset: number) {
      parallaxOffset.current = offset;
      if (clouds && "style" in clouds) {
        (clouds as HTMLElement).style.transform = `translateX(${offset}px)`;
      }
    }
    function onDown(e: MouseEvent | TouchEvent) {
      dragging = true;
      if ("touches" in e && (e as TouchEvent).touches.length > 0) {
        startX = (e as TouchEvent).touches[0].clientX;
      } else {
        startX = (e as MouseEvent).clientX;
      }
      lastOffset = parallaxOffset.current || 0;
      if (bg) {
        bg.style.cursor = "grabbing";
      }
    }
    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging) return;
      let x: number;
      if ("touches" in e && (e as TouchEvent).touches.length > 0) {
        x = (e as TouchEvent).touches[0].clientX;
      } else {
        x = (e as MouseEvent).clientX;
      }
      let offset = lastOffset + (x - startX);
      offset = Math.max(Math.min(offset, 200), -200);
      setTransform(offset);
    }
    function onUp() {
      if (bg) {
        bg.style.cursor = "";
      }
      dragging = false;
    }
    bg.addEventListener("mousedown", onDown);
    bg.addEventListener("touchstart", onDown, { passive: false });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      bg.removeEventListener("mousedown", onDown);
      bg.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <>
      {/* Animated cloud background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "auto",
          overflow: "hidden",
          cursor: "grab",
        }}
        id="cloud-bg-parallax-contact"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            background:
              "linear-gradient(180deg, #b3e0ff 0%, #87ceeb 40%, #e0f7fa 100%)",
            zIndex: 0,
          }}
        />
        <div
          ref={cloudsParallaxRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
            pointerEvents: "auto",
          }}
        >
          {CLOUD_CONFIGS.map((cfg, i) => (
            <MovableCloud key={i} config={cfg as CloudConfig} idx={i} />
          ))}
        </div>
      </div>

      {/* Main contact form content */}
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-10 pt-24 relative overflow-x-hidden overflow-y-auto z-10 animate-fadeInUpOnce"
        style={{ background: "transparent" }}
      >
        <div className="max-w-2xl w-full bg-white/80 rounded-2xl p-8 shadow-xl border border-sky-200">
          <h1 className="text-3xl font-extrabold text-sky-700 mb-4 text-center drop-shadow">
            Contact Us
          </h1>
          <p className="text-sky-800 text-center mb-8">
            We&apos;d love to hear from you! Fill out the form below and
            we&apos;ll get back to you soon.
          </p>
          {/* Contact form is defined above ContactUs for correct reference */}
          <ContactForm />
          <div className="mt-10 text-center text-sky-700">
            <h2 className="text-xl font-bold mb-2">Other ways to reach us</h2>
            <p>
              Email:{" "}
              <a
                href="mailto:info@smartdonum.com"
                className="text-sky-500 underline"
              >
                info@smartdonum.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+1234567890" className="text-sky-500 underline">
                +1 234 567 890
              </a>
            </p>
            <p>Address: 123 SmartDonum Lane, City, Country</p>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 50,
          background: "rgba(255,255,255,0.98)",
          marginBottom: "2rem",
        }}
      >
        <Footer />
      </div>
      <style>{`
        @keyframes fadeInUpOnce { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } } .animate-fadeInUpOnce { animation: fadeInUpOnce 1.1s cubic-bezier(0.23, 1, 0.32, 1) both; } .card-hover-effect { transition: transform 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s cubic-bezier(0.4,0,0.2,1); } .card-hover-effect:hover { transform: scale(1.035); box-shadow: 0 12px 36px 0 rgba(2,132,199,0.18), 0 2px 8px 0 rgba(0,0,0,0.09); } @keyframes cloudFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-18px); } } @keyframes cloudFloatSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } } @keyframes cloudFloatReverse { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(14px); } } .animate-cloudFloat { animation: cloudFloat 7s ease-in-out infinite; } .animate-cloudFloatSlow { animation: cloudFloatSlow 11s ease-in-out infinite; } .animate-cloudFloatReverse { animation: cloudFloatReverse 9s ease-in-out infinite; }
      `}</style>
    </>
  );
}
