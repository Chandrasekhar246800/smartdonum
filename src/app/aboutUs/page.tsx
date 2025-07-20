"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

// Cloud configs (unchanged)
const CLOUD_CONFIGS = [
  { top: '2.5rem', left: -20, width: 352, height: 176, opacity: 0.95, blur: 'blur-xl', float: 'animate-cloudFloatSlow', z: 1, speed: 0.08 },
  { top: '8rem', left: -30, width: 480, height: 208, opacity: 0.98, blur: 'blur-lg', float: 'animate-cloudFloat', z: 1, speed: 0.06 },
  { bottom: '5rem', left: -25, width: 400, height: 160, opacity: 0.92, blur: 'blur-xl', float: 'animate-cloudFloat', z: 1, speed: 0.07 },
  { bottom: '2.5rem', left: -15, width: 288, height: 112, opacity: 0.95, blur: 'blur-lg', float: 'animate-cloudFloatSlow', z: 1, speed: 0.05 },
  { top: '4rem', left: -10, width: 240, height: 80, opacity: 0.90, blur: 'blur-md', float: 'animate-cloudFloat', z: 1, speed: 0.09 },
  { top: '50%', left: -18, width: 256, height: 96, opacity: 0.85, blur: 'blur-xl', float: 'animate-cloudFloatReverse', z: 1, speed: 0.07 },
  { top: '25%', left: -22, width: 208, height: 80, opacity: 0.90, blur: 'blur-md', float: 'animate-cloudFloat', z: 1, speed: 0.08 },
  { bottom: '33%', left: 10, width: 320, height: 128, opacity: 0.88, blur: 'blur-lg', float: 'animate-cloudFloatReverse', z: 1, speed: 0.06 },
  { top: '1.25rem', left: 30, width: 224, height: 80, opacity: 0.92, blur: 'blur-lg', float: 'animate-cloudFloat', z: 2, speed: 0.05 },
  { top: '33%', left: 20, width: 256, height: 112, opacity: 0.90, blur: 'blur-lg', float: 'animate-cloudFloatSlow', z: 2, speed: 0.04 },
  { bottom: '2.5rem', left: 60, width: 208, height: 80, opacity: 0.85, blur: 'blur-lg', float: 'animate-cloudFloat', z: 2, speed: 0.03 },
  { top: '66%', right: -30, width: 288, height: 128, opacity: 0.92, blur: 'blur-lg', float: 'animate-cloudFloatReverse', z: 1, speed: -0.06 },
  { bottom: '25%', right: -20, width: 224, height: 96, opacity: 0.88, blur: 'blur-lg', float: 'animate-cloudFloat', z: 1, speed: -0.05 },
  { top: '6rem', left: 45, width: 128, height: 48, opacity: 0.80, blur: 'blur-md', float: 'animate-cloudFloat', z: 3, speed: 0.11 },
  { top: '66%', left: 60, width: 144, height: 56, opacity: 0.82, blur: 'blur-md', float: 'animate-cloudFloatReverse', z: 3, speed: 0.10 },
  { bottom: '6rem', left: 80, width: 112, height: 40, opacity: 0.75, blur: 'blur-md', float: 'animate-cloudFloat', z: 3, speed: 0.09 },
  { top: '25%', left: 0, width: 160, height: 64, opacity: 0.78, blur: 'blur-md', float: 'animate-cloudFloatSlow', z: 3, speed: 0.08 },
  { top: '10rem', left: 0, width: 176, height: 64, opacity: 0.85, blur: 'blur-md', float: 'animate-cloudFloat', z: 3, speed: 0.07 },
  { bottom: '8rem', left: 0, width: 160, height: 56, opacity: 0.80, blur: 'blur-md', float: 'animate-cloudFloatReverse', z: 3, speed: 0.06 },
];

// MovableCloud WITHOUT shadow
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
  const [pos, setPos] = React.useState(() => ({
    x: config.left !== undefined ? config.left : config.right,
    y: 0,
    dragging: false,
    dragStartX: 0,
    dragOffset: 0,
  }));

  React.useEffect(() => {
    let raf: number = 0;
    let lastTime = performance.now();
    function animate(now: number) {
      const dt = (now - lastTime) / 16.67;
      lastTime = now;
      if (!pos.dragging) {
        setPos(prev => {
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

  function onDown(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
    e.preventDefault();
    setPos(prev => ({
      ...prev,
      dragging: true,
      dragStartX: 'touches' in e ? (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX : (e as React.MouseEvent<HTMLDivElement>).clientX,
      dragOffset: typeof prev.x === 'number' ? prev.x : 0,
    }));
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
  }
  function onMove(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    setPos(prev => {
      const clientX =
        (e as TouchEvent).touches && (e as TouchEvent).touches.length > 0
          ? (e as TouchEvent).touches[0].clientX
          : (e as MouseEvent).clientX;
      let x = prev.dragOffset + (clientX - prev.dragStartX) / 8;
      if (x < -40) x = -40;
      if (x > 120) x = 120;
      return { ...prev, x };
    });
  }
  function onUp() {
    setPos(prev => ({ ...prev, dragging: false }));
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchend', onUp);
  }
  const style = {
    position: 'absolute' as const,
    width: config.width,
    height: config.height,
    zIndex: config.z,
    opacity: 1,
    cursor: 'grab',
    top: config.top,
    bottom: config.bottom,
    left: config.left !== undefined ? `${pos.x}%` : undefined,
    right: config.right !== undefined ? `${pos.x}%` : undefined,
    transition: pos.dragging ? 'none' : 'box-shadow 0.2s',
    touchAction: 'none' as const,
  };

  return (
    <div style={style} className="group select-none">
      {/* SHADOWS REMOVED! */}
      <div
        className={`w-full h-full bg-white rounded-full ${config.blur} ${config.float}`}
        style={{ opacity: config.opacity, position: 'absolute' }}
        onMouseDown={onDown}
        onTouchStart={onDown}
        tabIndex={0}
        aria-label={`Cloud ${idx + 1}`}
      />
    </div>
  );
}

export default function AboutUs() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleNavigate = (path: string) => {
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Cloud Background */}
      <div
        style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
        id="cloud-bg-parallax"
      >
        <div style={{
          position: 'absolute', inset: 0, width: '100vw', height: '100vh',
          background: 'linear-gradient(180deg, #b3e0ff 0%, #87ceeb 40%, #e0f7fa 100%)', zIndex: 0
        }} />
        <div style={{
          position: 'absolute', inset: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none'
        }}>
          {CLOUD_CONFIGS.map((cfg, i) => (
            <MovableCloud key={i} config={cfg} idx={i} />
          ))}
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between px-4 py-3 bg-sky-100/80 backdrop-blur-sm shadow-lg fixed top-0 left-0 z-30">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <Image
            src="/images/logo.png"
            alt="SmartDonum Logo"
            className="md:h-[70px] md:w-[70px] w-[50px] h-[50px] object-contain"
            width={70}
            height={70}
            priority
            style={{ display: 'block' }}
          />
          <span className="md:text-2xl text-[20px] font-bold text-sky-700">SmartDonum</span>
        </div>
        <div className="hidden md:flex items-center gap-0">
          <div className="flex items-center bg-gradient-to-r from-sky-100 via-white to-amber-100 bg-opacity-80 rounded-xl shadow border border-sky-100 px-2 py-1">
            <button className="px-5 py-2 text-sky-700 font-semibold text-lg hover:bg-green-100 hover:underline focus:outline-none rounded-l-xl transition-all" onClick={() => handleNavigate('/')}>Home</button>
            <div className="w-px h-8 bg-sky-200 mx-2" />
            <button className="px-5 py-2 text-sky-700 font-semibold text-lg hover:bg-sky-200 hover:underline focus:outline-none transition-all" onClick={() => handleNavigate('/about')}>About Us</button>
            <div className="w-px h-8 bg-sky-200 mx-2" />
            <button className="px-5 py-2 text-sky-700 font-semibold text-lg hover:bg-amber-100 hover:underline focus:outline-none transition-all" onClick={() => handleNavigate('/faq')}>FAQ</button>
            <div className="w-px h-8 bg-sky-200 mx-2" />
            <button className="px-5 py-2 bg-sky-200 hover:bg-sky-300 text-sky-700 text-lg font-semibold rounded-r-xl shadow transition-all transform hover:scale-105 hover:shadow-xl focus:outline-none" onClick={() => handleNavigate('/loginPage')}>Login</button>
          </div>
        </div>
        {/* Mobile view */}
        <div className="md:hidden flex items-center gap-2 w-full justify-end">
          <button className="px-5 py-2 bg-sky-200 hover:bg-sky-300 text-sky-700 text-lg font-semibold rounded-xl shadow transition-all focus:outline-none" onClick={() => handleNavigate('/landing')}>Login</button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-sky-700 focus:outline-none p-2" aria-label="Open menu">
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay and panel */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-xl font-bold text-sky-700">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-gray-900 p-2" aria-label="Close menu">
            <X size={28} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-3">
          <button className="text-left w-full px-4 py-3 text-lg text-sky-700 font-semibold hover:bg-green-100 rounded-lg transition-colors" onClick={() => handleNavigate('/')}>Home</button>
          <button className="text-left w-full px-4 py-3 text-lg text-sky-700 font-semibold hover:bg-sky-50 rounded-lg transition-colors" onClick={() => handleNavigate('/about')}>About Us</button>
          <button className="text-left w-full px-4 py-3 text-lg text-sky-700 font-semibold hover:bg-amber-100 rounded-lg transition-colors" onClick={() => handleNavigate('/faq')}>FAQ</button>
        </div>
      </div>

      {/* Spacer for the navbar */}
      <div className="h-24"></div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-start px-0 py-0 relative z-10" style={{ background: 'transparent' }}>
        <div className="w-full relative" style={{ marginTop: 0, paddingTop: 0 }}>
          <Image
            src="/images/aboutus1.jpg"
            alt="Group of children showing peace signs"
            className="w-full h-[38vh] sm:h-[48vh] md:h-[56vh] lg:h-[62vh] xl:h-[70vh] 2xl:h-[80vh] object-cover rounded-2xl"
            width={1920}
            height={600}
            style={{ display: 'block', margin: 0, padding: 0, borderRadius: 0, boxShadow: '0 8px 32px 0 rgba(2,132,199,0.12)' }}
            priority
          />
          <div className="absolute inset-0 flex items-end justify-start">
            <span className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold drop-shadow-lg px-8 py-4 mb-0 ml-6 tracking-wide uppercase" style={{ letterSpacing: '0.08em' }}>
              ABOUT US
            </span>
          </div>
        </div>
        <section className="w-full flex flex-col  items-center justify-center mt-8 mb-4 px-6 ">
          <h2 className="w-full text-3xl sm:text-4xl md:text-5xl font-bold text-sky-700 tracking-wide mb-8 text-center">Our Mission</h2>
          <div className="w-full flex items-center justify-center">
            <div className="bg-white/70 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-4xl">
              <div className="flex flex-col items-center md:items-start justify-center flex-1">
                <div className="w-full flex justify-center mb-4">
                  <Image src="/images/logo.png" alt="Logo" className="w-20 h-20 md:w-28 md:h-28" width={112} height={112} style={{ objectFit: 'contain' }} />
                </div>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl text-center">
                  At SmartDonum, we aim to make giving easier and smarter. We connect donors with those in need using technology—so every donation makes a real difference.
                </p>
              </div>
              <div className="hidden md:flex h-auto mx-4">
                <div className="w-px bg-sky-200 h-full" style={{ minHeight: '120px' }}></div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src="/images/mission.jpg"
                  alt="Donation box"
                  className="w-full max-w-xs md:max-w-sm rounded-2xl shadow-lg object-cover"
                  width={320}
                  height={220}
                  style={{ display: 'block' }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Cloud animation keyframes */}
      <style jsx>{`
        @keyframes fadeInUpOnce {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUpOnce {
          animation: fadeInUpOnce 1.1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .animate-cloudFloat { animation: cloudFloat 7s ease-in-out infinite; }
        .animate-cloudFloatSlow { animation: cloudFloatSlow 11s ease-in-out infinite; }
        .animate-cloudFloatReverse { animation: cloudFloatReverse 9s ease-in-out infinite; }
        @keyframes cloudFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes cloudFloatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
        @keyframes cloudFloatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(14px); }
        }
      `}</style>
    </>
  );
}
