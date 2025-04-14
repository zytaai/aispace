"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";

// Import components with dynamic loading for better performance
const Navbar = dynamic(() => import("@/components/sections/Navbar"), {
  ssr: false,
});
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
});
const ChatWindow = dynamic(() => import("@/components/sections/ChatWindow"), {
  ssr: false,
});
const Flashcards = dynamic(() => import("@/components/sections/Flashcards"), {
  ssr: false,
});
const BetaSignup = dynamic(() => import("@/components/sections/BetaSignup"), {
  ssr: false,
});

// Add type definition for particlesJS
type ParticlesOptions = {
  particles: {
    number: { value: number; density: { enable: boolean; value_area: number } };
    color: { value: string };
    opacity: { value: number; random: boolean; anim?: { enable: boolean; speed: number; opacity_min: number; sync: boolean } };
    size: { value: number; random: boolean; anim?: { enable: boolean; speed: number; size_min: number; sync: boolean } };
    line_linked: { enable: boolean; distance: number; color: string; opacity: number; width: number };
    move: {
      enable: boolean;
      speed: number;
      direction: string;
      random: boolean;
      straight: boolean;
      out_mode: string;
      bounce?: boolean;
      attract?: { enable: boolean; rotateX: number; rotateY: number }
    };
    interactivity?: {
      detect_on: string;
      events: {
        onhover: { enable: boolean; mode: string };
        onclick: { enable: boolean; mode: string };
        resize: boolean;
      };
      modes: {
        grab: { distance: number; line_linked: { opacity: number } };
        bubble: { distance: number; size: number; duration: number };
        repulse: { distance: number; duration: number };
        push: { particles_nb: number };
        remove: { particles_nb: number };
      };
    };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: { enable: boolean; mode: string };
      onclick: { enable: boolean; mode: string };
      resize: boolean;
    };
    modes: {
      grab: { distance: number; line_linked: { opacity: number } };
      bubble: { distance: number; size: number; duration: number };
      repulse: { distance: number; duration: number };
      push: { particles_nb: number };
      remove: { particles_nb: number };
    };
  };
};

declare global {
  interface Window {
    particlesJS?: (id: string, options: ParticlesOptions) => void;
  }
}

export default function Home() {
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  // Apply the background styles and initialize particles
  useEffect(() => {
    // Add some particle effects on the background
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (typeof window !== 'undefined' && window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            opacity: {
              value: 0.2,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.3,
                sync: false
              }
            },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.12, width: 1 },
            move: {
              enable: true,
              speed: 1.2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 }
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "grab" },
              onclick: { enable: true, mode: "push" },
              resize: true
            },
            modes: {
              grab: { distance: 140, line_linked: { opacity: 0.4 } },
              bubble: { distance: 400, size: 4, duration: 2 },
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 }
            }
          }
        });
        setParticlesLoaded(true);
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Premium background with particles effect */}
      <div
        id="particles-js"
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/70 via-black to-black/90"
        style={{ pointerEvents: "auto" }} // Critical fix: ensure particles can be interactive
      />

      <Navbar />
      <Hero />
      <ChatWindow />
      <Flashcards />
      <BetaSignup />

      <footer className="py-16 px-4 text-center text-quantum-secondary text-sm border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="tube-light text-3xl md:text-5xl font-bold text-white mb-6">
            Quantum Café
          </h2>
          <p className="text-white/70 text-base premium-text">
            © {new Date().getFullYear()} Quantum Café — No login, no user data — full privacy.
          </p>
        </div>
      </footer>

      <Toaster position="top-right" />
    </main>
  );
}
