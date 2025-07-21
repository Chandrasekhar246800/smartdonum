"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Cloud configs (unchanged except shadow isn't used anymore)
const CLOUD_CONFIGS = [
  {
    top: "2.5rem",
    left: -20,
    width: 352,
    height: 176,
    opacity: 0.95,
    blur: "blur-xl",
    float: "animate-cloudFloatSlow",
    z: 1,
    speed: 0.08,
  },
  {
    top: "8rem",
    left: -30,
    width: 480,
    height: 208,
    opacity: 0.98,
    blur: "blur-lg",
    float: "animate-cloudFloat",
    z: 1,
    speed: 0.06,
  },
  {
    bottom: "5rem",
    left: -25,
    width: 400,
    height: 160,
    opacity: 0.92,
    blur: "blur-xl",
    float: "animate-cloudFloat",
    z: 1,
    speed: 0.07,
  },
  {
    bottom: "2.5rem",
    left: -15,
    width: 288,
    height: 112,
    opacity: 0.95,
    blur: "blur-lg",
    float: "animate-cloudFloatSlow",
    z: 1,
    speed: 0.05,
  },
  {
    top: "4rem",
    left: -10,
    width: 240,
    height: 80,
    opacity: 0.9,
    blur: "blur-md",
    float: "animate-cloudFloat",
    z: 1,
    speed: 0.09,
  },
  {
    top: "50%",
    left: -18,
    width: 256,
    height: 96,
    opacity: 0.85,
    blur: "blur-xl",
    float: "animate-cloudFloatReverse",
    z: 1,
    speed: 0.07,
  },
  {
    top: "25%",
    left: -22,
    width: 208,
    height: 80,
    opacity: 0.9,
    blur: "blur-md",
    float: "animate-cloudFloat",
    z: 1,
    speed: 0.08,
  },
  {
    bottom: "33%",
    left: 10,
    width: 320,
    height: 128,
    opacity: 0.88,
    blur: "blur-lg",
    float: "animate-cloudFloatReverse",
    z: 1,
    speed: 0.06,
  },
  {
    top: "1.25rem",
    left: 30,
    width: 224,
    height: 80,
    opacity: 0.92,
    blur: "blur-lg",
    float: "animate-cloudFloat",
    z: 2,
    speed: 0.05,
  },
  {
    top: "33%",
    left: 20,
    width: 256,
    height: 112,
    opacity: 0.9,
    blur: "blur-lg",
    float: "animate-cloudFloatSlow",
    z: 2,
    speed: 0.04,
  },
  {
    bottom: "2.5rem",
    left: 60,
    width: 208,
    height: 80,
    opacity: 0.85,
    blur: "blur-lg",
    float: "animate-cloudFloat",
    z: 2,
    speed: 0.03,
  },
  {
    top: "66%",
    right: -30,
    width: 288,
    height: 128,
    opacity: 0.92,
    blur: "blur-lg",
    float: "animate-cloudFloatReverse",
    z: 1,
    speed: -0.06,
  },
  {
    bottom: "25%",
    right: -20,
    width: 224,
    height: 96,
    opacity: 0.88,
    blur: "blur-lg",
    float: "animate-cloudFloat",
    z: 1,
    speed: -0.05,
  },
  {
    top: "6rem",
    left: 45,
    width: 128,
    height: 48,
    opacity: 0.8,
    blur: "blur-md",
    float: "animate-cloudFloat",
    z: 3,
    speed: 0.11,
  },
  {
    top: "66%",
    left: 60,
    width: 144,
    height: 56,
    opacity: 0.82,
    blur: "blur-md",
    float: "animate-cloudFloatReverse",
    z: 3,
    speed: 0.1,
  },
  {
    bottom: "6rem",
    left: 80,
    width: 112,
    height: 40,
    opacity: 0.75,
    blur: "blur-md",
    float: "animate-cloudFloat",
    z: 3,
    speed: 0.09,
  },
  {
    top: "25%",
    left: 0,
    width: 160,
    height: 64,
    opacity: 0.78,
    blur: "blur-md",
    float: "animate-cloudFloatSlow",
    z: 3,
    speed: 0.08,
  },
  {
    top: "10rem",
    left: 0,
    width: 176,
    height: 64,
    opacity: 0.85,
    blur: "blur-md",
    float: "animate-cloudFloat",
    z: 3,
    speed: 0.07,
  },
  {
    bottom: "8rem",
    left: 0,
    width: 160,
    height: 56,
    opacity: 0.8,
    blur: "blur-md",
    float: "animate-cloudFloatReverse",
    z: 3,
    speed: 0.06,
  },
];

// MovableCloud without shadow
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
      setPos((prev) => {
        if (prev.dragging) return prev;
        let x = (prev.x ?? 0) + config.speed * dt;
        if (config.speed > 0 && x > 120) x = -40;
        if (config.speed < 0 && x < -40) x = 120;
        return { ...prev, x };
      });
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [config.speed]);

  function onDown(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    e.preventDefault();
    setPos((prev) => ({
      ...prev,
      dragging: true,
      dragStartX:
        "touches" in e
          ? (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX
          : (e as React.MouseEvent<HTMLDivElement>).clientX,
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
      const clientX =
        "touches" in e && e.touches && e.touches.length > 0
          ? (e as TouchEvent).touches[0].clientX
          : (e as MouseEvent).clientX;
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

  const style: React.CSSProperties = {
    position: "absolute" as const,
    width: config.width,
    height: config.height,
    zIndex: config.z,
    opacity: 1,
    cursor: "grab",
    top: config.top,
    bottom: config.bottom,
    left: config.left !== undefined ? `calc(${pos.x}vw)` : undefined,
    right: config.right !== undefined ? `calc(${pos.x}vw)` : undefined,
    transition: pos.dragging ? "none" : "box-shadow 0.2s",
    touchAction: "none",
  };

  return (
    <div ref={cloudRef} style={style} className="group select-none">
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

export default function AboutUs() {
  return (
    <>
      {/* Font link moved to app/layout.tsx or pages/_document.js */}
      {/* Cloud Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
        id="cloud-bg-parallax"
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
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          {CLOUD_CONFIGS.map((cfg, i) => (
            <MovableCloud key={i} config={cfg} idx={i} />
          ))}
        </div>
      </div>
      <div className="h-24"></div>

      {/* Main Content */}
      <div
        className="min-h-screen flex flex-col items-center justify-start px-0 py-0 relative z-10"
        style={{ background: "transparent" }}
      >
        {/* HERO IMAGE & heading */}
        <div
          className="w-full relative"
          style={{ marginTop: 0, paddingTop: 0 }}
        >
          <Image
            src="/images/aboutus1.jpg"
            alt="Group of children showing peace signs"
            className="w-full h-[38vh] sm:h-[48vh] md:h-[56vh] lg:h-[62vh] xl:h-[70vh] 2xl:h-[80vh] object-cover rounded-2xl"
            width={1920}
            height={600}
            style={{
              display: "block",
              margin: 0,
              padding: 0,
              borderRadius: 0,
              boxShadow: "0 8px 32px 0 rgba(2,132,199,0.12)",
            }}
            priority
          />
          <div className="absolute inset-0 flex items-end justify-start">
            <span
              className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold drop-shadow-lg px-8 py-4 mb-0 ml-6 tracking-wide uppercase"
              style={{ letterSpacing: "0.08em" }}
            >
              ABOUT US
            </span>
          </div>
        </div>

        {/* OUR MISSION SECTION */}
        <section className="w-full flex flex-col items-center justify-center mt-8 mb-4 px-6">
          <h2 className="w-full text-3xl sm:text-4xl md:text-5xl font-bold text-sky-700 tracking-wide mb-8 text-center">
            Our Mission
          </h2>
          <div className="w-full flex items-center justify-center">
            <div className="bg-white/70 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-4xl">
              <div className="flex flex-col items-center md:items-start justify-center flex-1">
                <div className="w-full flex justify-center mb-4">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    className="w-20 h-20 md:w-28 md:h-28"
                    width={112}
                    height={112}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl text-center">
                  At SmartDonum, we aim to make giving easier and smarter. We
                  connect donors with those in need using technology—so every
                  donation makes a real difference.
                </p>
              </div>
              <div className="hidden md:flex h-auto mx-4">
                <div
                  className="w-px bg-sky-200 h-full"
                  style={{ minHeight: "120px" }}
                ></div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src="/images/mission.jpg"
                  alt="Donation box"
                  className="w-full max-w-xs md:max-w-sm rounded-2xl shadow-lg object-cover"
                  width={320}
                  height={220}
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* OUR TEAM */}
        <section className="w-full flex flex-col items-center justify-center mb-8 px-4">
          <div className="w-full max-w-5xl rounded-2xl shadow-2xl bg-white/65 backdrop-blur-md py-10 px-6 md:py-14 md:px-12">
            <h2 className="w-full text-3xl sm:text-4xl md:text-5xl font-bold text-sky-700 tracking-wide mb-10 text-center">
              Our Team
            </h2>
            {/* TEAM MEMBER 1 */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto mb-10">
              <div className="flex-1 flex items-center justify-center order-1 md:order-1 mb-6 md:mb-0">
                <Image
                  src="/images/shushmapic.jpg"
                  alt="Aarav Patel"
                  className="w-32 h-32 md:w-44 md:h-44 rounded-full shadow-md object-cover"
                  width={176}
                  height={176}
                  style={{ display: "block", objectFit: "cover" }}
                />
              </div>
              <div className="hidden md:flex h-auto mx-4 order-2">
                <div
                  className="w-px bg-sky-200 opacity-40 h-full"
                  style={{ minHeight: 120 }}
                ></div>
              </div>
              <div className="flex-1 flex items-center justify-center order-3">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold text-sky-600 mb-2">
                    Shushma
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    Aarav has more than a decade of experience in social
                    entrepreneurship and digital access. He’s passionate about
                    making generosity easier and smarter for everyone, every
                    day.
                  </p>
                </div>
              </div>
            </div>
            {/* TEAM MEMBER 2 */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
              <div className="flex-1 flex items-center justify-center order-2 md:order-1">
                <div className="text-center md:text-right">
                  <h3 className="text-xl font-semibold text-sky-600 mb-2">
                    Abdul
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    Ishita leads our community outreach. Her energy and
                    compassion have empowered hundreds of volunteers. She
                    believes every act of kindness creates a ripple of hope.
                  </p>
                </div>
              </div>
              <div className="hidden md:flex h-auto mx-4 order-2">
                <div
                  className="w-px bg-sky-200 opacity-40 h-full"
                  style={{ minHeight: 120 }}
                ></div>
              </div>
              <div className="flex-1 flex items-center justify-center order-1 md:order-3 mb-6 md:mb-0">
                <Image
                  src="/images/abdulpic.jpg"
                  alt="Ishita Verma"
                  className="w-32 h-32 md:w-44 md:h-44 rounded-full shadow-md object-cover"
                  width={176}
                  height={176}
                  style={{ display: "block", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CO-FOUNDERS */}
        <section className="w-full flex flex-col items-center justify-center mb-12 px-4">
          <div className="w-full max-w-5xl rounded-2xl shadow-2xl bg-white/60 backdrop-blur-md py-10 px-6 md:py-14 md:px-12">
            <h2 className="w-full text-3xl sm:text-4xl md:text-5xl font-bold text-sky-700 tracking-wide mb-8 text-center">
              Co - Founders
            </h2>
            <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-8">
              {/* Founder 1 */}
              <div className="flex-1 flex flex-col items-center justify-end p-4 bg-white/80 rounded-xl shadow hover:shadow-lg backdrop-blur-md">
                <Image
                  src="/images/chandrapic.jpg"
                  alt="Co-founder 1"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full shadow-md object-cover mb-2"
                  width={128}
                  height={128}
                  style={{ objectFit: "cover" }}
                />
                <h4 className="text-lg font-bold text-sky-700 mt-2">Chandra</h4>
                <p className="mt-1 text-gray-600 text-center text-base">
                  Tech enthusiast and product lead, building digital bridges for
                  giving.
                </p>
              </div>
              {/* Divider */}
              <div className="hidden md:flex items-stretch">
                <div
                  className="w-px h-full bg-sky-200 opacity-40 mx-4"
                  style={{ minHeight: 140 }}
                ></div>
              </div>
              {/* Founder 2 */}
              <div className="flex-1 flex flex-col items-center justify-end p-4 bg-white/80 rounded-xl shadow hover:shadow-lg backdrop-blur-md">
                <Image
                  src="/images/sidpic.jpg"
                  alt="Co-founder 2"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full shadow-md object-cover mb-2"
                  width={128}
                  height={128}
                  style={{ objectFit: "cover" }}
                />
                <h4 className="text-lg font-bold text-sky-700 mt-2">
                  Sidhartha
                </h4>
                <p className="mt-1 text-gray-600 text-center text-base">
                  Community mentor, enabling inclusion and social change every
                  step.
                </p>
              </div>
              {/* Divider */}
              <div className="hidden md:flex items-stretch">
                <div
                  className="w-px h-full bg-sky-200 opacity-40 mx-4"
                  style={{ minHeight: 140 }}
                ></div>
              </div>
              {/* Founder 3 */}
              <div className="flex-1 flex flex-col items-center justify-end p-4 bg-white/80 rounded-xl shadow hover:shadow-lg backdrop-blur-md">
                <Image
                  src="/images/saipic.jpg"
                  alt="Co-founder 3"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full shadow-md object-cover mb-2"
                  width={128}
                  height={128}
                  style={{ objectFit: "cover" }}
                />
                <h4 className="text-lg font-bold text-sky-700 mt-2">
                  Sai Teja
                </h4>
                <p className="mt-1 text-gray-600 text-center text-base">
                  Operations expert and optimizer, making sure every act of
                  giving counts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DEAR DONORS CARD */}
        <section className="w-full flex flex-col items-center justify-center mb-12 px-4">
          <div
            className="w-full max-w-3xl rounded-2xl shadow-2xl bg-white/60 backdrop-blur-md py-10 px-6 md:py-14 md:px-12 mx-auto relative"
            style={{ fontFamily: "inherit" }}
          >
            <h2
              className="w-full text-2xl sm:text-3xl md:text-4xl font-bold text-sky-600 mb-6 text-center"
              style={{
                fontFamily: "'Pacifico', cursive",
                letterSpacing: "2px",
                textShadow: "0 2px 8px rgba(56,161,198,0.08)",
              }}
            >
              Dear Donors
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center font-medium">
              Your generosity is not just a drop in the ocean—it&#39;s a{" "}
              <span className="text-sky-600 font-semibold">
                wave of kindness
              </span>{" "}
              that changes countless lives.
              <br />
              <br />
              Every time you give, you create ripples of hope, write new stories
              of joy, and light up hearts everywhere. Thank you for believing in
              a better tomorrow and inspiring us all with your compassion. The
              world is truly a brighter, warmer place because of{" "}
              <span className="text-sky-700 font-semibold">you</span>.
              <br />
              <br />
              Together, we are changing the world, one act of love at a time.
            </p>
            <div
              className="absolute right-8 bottom-6 text-base sm:text-lg text-gray-600"
              style={{
                fontFamily: "'Pacifico', cursive",
                textAlign: "right",
                color: "#3182ce",
                fontWeight: 500,
                letterSpacing: "1.5px",
              }}
            >
              ~Sidhartha
            </div>
          </div>
        </section>

        {/* SMARTDONUM COMMITMENT SECTION - 2 COLUMN (Pale, Blended Theme) */}
        <section className="w-full flex flex-col items-center justify-center mb-12 px-4">
          <div className="w-full max-w-6xl flex flex-col md:flex-row gap-0 items-stretch">
            {/* Left card (pale blue) */}
            <div className="flex-1 bg-[#e5f4fb]/70 rounded-[40px] md:rounded-r-none p-12 flex flex-col justify-center shadow-lg backdrop-blur-md">
              <h2 className="text-4xl font-extrabold text-sky-700 mb-6 leading-tight">
                Our Commitment
                <br />
                to Impact
              </h2>
              <p className="text-xl text-sky-900 leading-relaxed">
                Every day, we strive to bridge the gap between compassion and
                real-world change. Your support empowers SmartDonum to reach
                more communities, deliver vital resources, and make hope
                possible in places it’s needed most.
              </p>
            </div>
            {/* Right card (pale lavender) */}
            <div className="flex-1 bg-[#e4e8fc]/70 rounded-[40px] md:rounded-l-none p-12 flex flex-col justify-center shadow-lg backdrop-blur-md">
              <h2 className="text-4xl font-extrabold text-indigo-700 mb-6 leading-tight">
                Our Promise
                <br />
                to You
              </h2>
              <p className="text-xl text-indigo-900 leading-relaxed">
                We vow to honor your generosity with transparency, care, and
                gratitude. Your donation is not just a one-time gift—it becomes
                a legacy of kindness, empowering brighter tomorrows for
                countless lives.
              </p>
            </div>
          </div>
        </section>
        {/* OUR TEAM */}
        <section className="w-full flex flex-col items-center justify-center mb-8 px-4">
          <div className="w-full max-w-5xl rounded-2xl shadow-2xl bg-white/65 backdrop-blur-md py-10 px-6 md:py-14 md:px-12">
            <h2 className="w-full text-3xl sm:text-4xl md:text-5xl font-bold text-sky-700 tracking-wide mb-10 text-center">
              Our Advisors
            </h2>
            {/* TEAM MEMBER 1 */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto mb-10">
              <div className="flex-1 flex items-center justify-center order-1 md:order-1 mb-6 md:mb-0">
                <Image
                  src="/images/ushapic.jpg"
                  alt="Aarav Patel"
                  className="w-32 h-32 md:w-44 md:h-44 rounded-full shadow-md object-cover"
                  width={176}
                  height={176}
                  style={{ display: "block", objectFit: "cover" }}
                />
              </div>
              <div className="hidden md:flex h-auto mx-4 order-2">
                <div
                  className="w-px bg-sky-200 opacity-40 h-full"
                  style={{ minHeight: 120 }}
                ></div>
              </div>
              <div className="flex-1 flex items-center justify-center order-3">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold text-sky-600 mb-2">
                    Dr.D.Usha Nandhini
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    Aarav has more than a decade of experience in social
                    entrepreneurship and digital access. He’s passionate about
                    making generosity easier and smarter for everyone, every
                    day.
                  </p>
                </div>
              </div>
            </div>
            {/* TEAM MEMBER 2 */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
              <div className="flex-1 flex items-center justify-center order-2 md:order-1">
                <div className="text-center md:text-right">
                  <h3 className="text-xl font-semibold text-sky-600 mb-2">
                    Dr.J.Albert Mayan
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    Ishita leads our community outreach. Her energy and
                    compassion have empowered hundreds of volunteers. She
                    believes every act of kindness creates a ripple of hope.
                  </p>
                </div>
              </div>
              <div className="hidden md:flex h-auto mx-4 order-2">
                <div
                  className="w-px bg-sky-200 opacity-40 h-full"
                  style={{ minHeight: 120 }}
                ></div>
              </div>
              <div className="flex-1 flex items-center justify-center order-1 md:order-3 mb-6 md:mb-0">
                <Image
                  src="/images/albertpic.jpg"
                  alt="Ishita Verma"
                  className="w-32 h-32 md:w-44 md:h-44 rounded-full shadow-md object-cover"
                  width={176}
                  height={176}
                  style={{ display: "block", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* cloud float keyframes */}
      <style jsx>{`
        .animate-cloudFloat {
          animation: cloudFloat 7s ease-in-out infinite;
        }
        .animate-cloudFloatSlow {
          animation: cloudFloatSlow 11s ease-in-out infinite;
        }
        .animate-cloudFloatReverse {
          animation: cloudFloatReverse 9s ease-in-out infinite;
        }
        @keyframes cloudFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-18px);
          }
        }
        @keyframes cloudFloatSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(12px);
          }
        }
        @keyframes cloudFloatReverse {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(14px);
          }
        }
      `}</style>
    </>
  );
}
