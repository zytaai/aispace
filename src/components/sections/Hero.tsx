"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const Hero = () => {
  const controls = useAnimation();

  // Animation for the glowing tube effect
  useEffect(() => {
    controls.start({
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-4">
      {/* Enhanced Spotlight Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="spotlight"></div>
      </div>

      {/* Premium LED Tube Light Effect - Top Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500/20 via-white/70 to-blue-500/20"
        style={{
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(82, 158, 228, 0.8)"
        }}
        animate={controls}
      />

      {/* Background Tube Light Glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/10 to-blue-500/0"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        className="z-10 text-center max-w-5xl px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.span
            className="tube-light inline-block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90"
            animate={{
              textShadow: [
                "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4), 0 0 40px rgba(82, 158, 228, 0.6)",
                "0 0 15px rgba(255, 255, 255, 0.9), 0 0 25px rgba(255, 255, 255, 0.7), 0 0 35px rgba(255, 255, 255, 0.5), 0 0 45px rgba(82, 158, 228, 0.7)",
                "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4), 0 0 40px rgba(82, 158, 228, 0.6)",
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Brew Intelligence with<br /> AI Space Cafe AI Assistant
          </motion.span>
        </motion.h1>

        <p className="text-lg md:text-xl text-quantum-secondary max-w-3xl mx-auto mb-10 premium-text">
          Powered by LLaMA 4.0 Scout — designed for quantum learners.
          <br />
          <span className="text-white/90">No login, no user data — full privacy.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="#chat"
            className="px-8 py-3.5 rounded-xl button-gradient font-medium text-sm md:text-base min-w-[180px]"
            style={{
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
            }}
          >
            Start Chatting
          </Link>
          <Link
            href="#beta"
            className="px-8 py-3.5 rounded-xl button-ghost font-medium text-sm md:text-base min-w-[180px]"
          >
            Join Beta
          </Link>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-7 h-12 border-2 border-white/20 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div
            className="w-2 h-2 bg-white/80 rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
