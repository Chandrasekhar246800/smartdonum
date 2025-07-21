"use client";
import React, { useRef } from "react";
import { Plus, Minus } from "lucide-react";

// Cloud configs
const CLOUD_CONFIGS = [
  // ...[keep as in your question, omitted here for brevity]...
  {
    top: "2.5rem",
    left: -20,
    width: 352,
    height: 176,
    blur: "blur-xl",
    float: "animate-cloudFloatSlow",
    z: 1,
    speed: 0.08,
    opacity: 0.95,
  },
  // ... (rest unchanged) ...
  {
    bottom: "8rem",
    left: 0,
    width: 160,
    height: 56,
    blur: "blur-md",
    float: "animate-cloudFloatReverse",
    z: 3,
    speed: 0.06,
    opacity: 0.8,
  },
];

// FAQ Array
const FAQ_LIST = [
  {
    q: "What is SmartDonum and what is its main mission?",
    a: "SmartDonum is a technology platform that connects individuals and organizations with surplus goods to verified NGOs and community programs that need them. Our mission is to make giving simple, smart, and sustainable by redirecting surplus items like food, clothes, and books from potential waste to those who can benefit most, fostering a culture of mindful giving.",
  },
  {
    q: "How does the process of donating items through your platform work from start to finish?",
    a: "Our process is designed to be simple and transparent: 1. List Your Donation: A donor signs up and describes the items. 2. NGOs See Your Offer: Nearby, verified NGOs are notified and can accept the offer. 3. Pickup is Confirmed: You'll receive a notification with the NGO's details. 4. Donation is Collected: An NGO representative will arrive at the scheduled time. 5. Track to Delivery: You can track the status on your dashboard until the donation is marked as delivered.",
  },
  {
    q: "Is there any cost for donors or NGOs to use the SmartDonum service?",
    a: "The SmartDonum platform is completely free to use for both individual donors and our partner NGOs. Our operations are supported through corporate partnerships and grants, allowing us to focus entirely on our social mission.",
  },
  {
    q: "What specific types of items can I donate (e.g., food, clothes, books, toys)?",
    a: "We facilitate the donation of a wide range of goods. Our primary categories are: Cooked Food, Packaged Food, Clothes, Books, and Toys.",
  },
  {
    q: "How do I sign up and get my account verified as a donor or an NGO?",
    a: "For donors, simply sign up on our website or app with your email or phone number; verification is instant. For NGOs, you must submit an application with your organization's registration documents and mission statement. Our team reviews each application before activating the account.",
  },
  {
    q: "What are the essential hygiene and safety guidelines for donating cooked food?",
    a: "Food safety is our highest priority. Please donate food that was prepared within the last 4-6 hours, avoid easily spoiled ingredients (like mayonnaise or raw fish), and label containers with the dish name and preparation time.",
  },
  {
    q: "How should I package my donation to ensure it is safe and ready for pickup?",
    a: "Please use clean, food-safe, and securely sealed containers for food. Clothes should be washed and packed in durable bags or boxes. Books and toys should be packed in boxes to protect them from damage.",
  },
  {
    q: "How do I schedule a convenient time and location for my donation to be picked up?",
    a: "When you list your donation on the platform, you will be presented with a calendar and time slots. You can select a date, a time window (e.g., 2 PM - 4 PM), and confirm your address for the pickup.",
  },
  {
    q: "Can I choose the specific NGO that will receive my donation?",
    a: "Currently, our system broadcasts your donation offer to all relevant NGOs in your vicinity to ensure the quickest possible pickup. This helps get your donation to where it's needed most, fast.",
  },
  {
    q: "How are the NGOs on your platform vetted to ensure they are legitimate and trustworthy?",
    a: "We have a strict, multi-step vetting process for all our NGO partners. This includes verifying their legal registration documents, reviewing their history and operational capacity, and confirming they have a genuine, on-the-ground presence.",
  },
  {
    q: "What condition should clothes, books, and toys be in to be accepted?",
    a: 'A good rule of thumb is the "dignity rule": donate items you would be comfortable giving to a friend. Clothes should be washed and without major damage. Books and toys should be clean, intact, and functional.',
  },
  {
    q: "How can my restaurant or company arrange for large-scale or recurring donations?",
    a: "We offer a dedicated partnership program for organizations. You can sign up for a corporate account, which allows you to schedule large, one-time donations or set up a recurring pickup schedule for regular surplus.",
  },
  {
    q: "As an NGO, how can I list my specific, current needs on the platform?",
    a: 'Your NGO dashboard features a "Needs" section where you can post specific, real-time requests. These requests are then shown to donors in your area, encouraging more targeted and impactful giving.',
  },
  {
    q: "Will I receive an acknowledgement or receipt after my donation has been successfully delivered?",
    a: 'Yes. Once the NGO receives your donation and marks it as "Delivered" in the system, you will receive a final confirmation notification and a thank you note, which is also logged in your donation history.',
  },
  {
    q: "How can I track the status of my donation after scheduling a pickup?",
    a: 'Your personal dashboard provides real-time status updates for your donation. You will see its progress change from "Awaiting NGO Approval" → "Pickup Scheduled" → "Out for Pickup" → "Delivered."',
  },
  {
    q: "What should I do if a scheduled pickup is missed or delayed?",
    a: "If a pickup is significantly delayed, please check the platform for updates. If there is no update, use the in-app support feature to report the issue. Our team will immediately coordinate with the NGO to resolve it.",
  },
  {
    q: "How is my personal information as a donor or NGO representative kept private and secure?",
    a: "We take data privacy very seriously. Your personal information, such as your full address, is only shared with the confirmed NGO representative for the sole purpose of coordinating the pickup. We never sell your data.",
  },
  {
    q: "What happens if an NGO receives a donation that doesn't meet the quality standards?",
    a: "Our partner NGOs have the right to decline a donation at the point of pickup if it does not meet the safety or quality guidelines. This is crucial for ensuring the well-being of the end recipients.",
  },
  {
    q: "Can I donate money through SmartDonum, or is it only for physical goods?",
    a: "SmartDonum's primary focus is on facilitating the donation of physical goods. We do not process monetary transactions directly. However, you can find links to our partner NGOs' official donation pages in their profiles.",
  },
  {
    q: "Who should I contact if I encounter a technical problem on the website or have an issue with a donation?",
    a: 'For any issues, our support team is ready to help. You can visit our "Help Center" for articles on common issues or submit a support ticket directly through the app or website. For urgent matters, you can email us at support@smartdonum.com.',
  },
];

// MovableCloud with NO shadow
type CloudConfig = {
  top?: string;
  bottom?: string;
  left?: number;
  right?: number;
  width: number;
  height: number;
  blur: string;
  float: string;
  z: number;
  speed: number;
  opacity: number;
};

interface MovableCloudProps {
  config: CloudConfig;
  idx: number;
}

function MovableCloud({ config, idx }: MovableCloudProps) {
  const [pos, setPos] = React.useState(() => ({
    x: config.left !== undefined ? config.left : config.right,
    y: 0,
    dragging: false,
    dragStartX: 0,
    dragOffset: 0,
  }));
  const cloudRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
    window.addEventListener("touchmove", onMove as EventListener, {
      passive: false,
    });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
  }
  function onMove(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    setPos((prev) => {
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
    setPos((prev) => ({ ...prev, dragging: false }));
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("mouseup", onUp);
    window.removeEventListener("touchend", onUp);
  }
  const style: React.CSSProperties = {
    position: "absolute",
    width: config.width,
    height: config.height,
    zIndex: config.z,
    opacity: 1,
    cursor: "default",
    top: config.top,
    bottom: config.bottom,
    left: config.left !== undefined ? `${pos.x}%` : undefined,
    right: config.right !== undefined ? `${pos.x}%` : undefined,
    transition: pos.dragging ? "none" : "box-shadow 0.2s",
    touchAction: "none",
  };
  return (
    <div ref={cloudRef} style={style} className="group select-none">
      {/* No shadow base, no shadow-cloud class! */}
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

// FAQ Accordion
type FAQ = { q: string; a: string };

interface FAQAccordionProps {
  faqs: FAQ[];
}

function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(idx === openIndex ? null : idx);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-lg border border-sky-200 bg-white/70 shadow hover:shadow-md transition-shadow"
        >
          <button
            className="flex w-full items-center justify-between px-4 py-4 text-left focus:outline-none"
            onClick={() => handleToggle(i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
          >
            <span className="font-semibold text-sky-800 text-lg">{faq.q}</span>
            <span>
              {openIndex === i ? <Minus size={28} /> : <Plus size={28} />}
            </span>
          </button>
          {openIndex === i && (
            <div
              id={`faq-answer-${i}`}
              className="px-6 pb-4 text-sky-700 text-base animate-fadeInUpOnce"
            >
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FAQ() {
  return (
    <div>
      {/* Cloud BG */}
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
      {/* Spacer */}
      <div className="h-24"></div>
      {/* FAQ Content */}
      <div
        className="min-h-screen flex flex-col justify-center items-center px-4 py-8 relative overflow-x-hidden overflow-y-auto z-10"
        style={{ background: "transparent" }}
      >
        <div className="max-w-2xl w-full bg-white/80 border-2 border-sky-200 rounded-2xl shadow-xl p-8 flex flex-col gap-6 animate-fadeInUp relative">
          <h2 className="text-3xl font-extrabold text-sky-700 mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={FAQ_LIST} />
        </div>
      </div>
      {/* Cloud animation keyframes */}
      <style jsx>{`
        @keyframes fadeInUpOnce {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUpOnce {
          animation: fadeInUpOnce 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
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
        .animate-cloudFloat {
          animation: cloudFloat 7s ease-in-out infinite;
        }
        .animate-cloudFloatSlow {
          animation: cloudFloatSlow 11s ease-in-out infinite;
        }
        .animate-cloudFloatReverse {
          animation: cloudFloatReverse 9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
