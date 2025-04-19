"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import CoffeeLogo from "../ui/CoffeeLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CoffeeLogo className="w-8 h-8" />
          </motion.div>
          <motion.span
            className="text-xl font-bold premium-text"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AI Space Cafe
          </motion.span>
        </Link>

        {/* Center Navigation - Desktop */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 hidden md:flex"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center premium-glass rounded-full px-5 py-2.5 border border-white/10">
            <Link href="/" className="text-sm text-white hover:text-white transition-colors px-4 py-1">
              Home
            </Link>
            <Link href="#features" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-1">
              Features
            </Link>
            <Link href="#flashcards" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-1">
              Flashcards
            </Link>
            <Link href="#contact" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-1">
              About
            </Link>
          </div>
        </motion.div>

        {/* Right Side Buttons - Desktop */}
        <motion.div
          className="hidden md:flex items-center gap-3 z-10"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="#chat"
            className="px-5 py-2.5 text-sm rounded-xl button-ghost hover:bg-white/15 transition-all duration-300"
          >
            Learn More
          </Link>
          <Link
            href="#chat"
            className="px-5 py-2.5 text-sm rounded-xl button-gradient font-medium transition-all duration-300"
          >
            Try It Now
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="md:hidden flex items-center z-10"
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden absolute top-full left-0 right-0 p-5 premium-glass backdrop-blur-xl mt-px"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-5 py-3">
            <Link
              href="/"
              className="text-base font-medium premium-text"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-base font-medium text-white/80"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#flashcards"
              className="text-base font-medium text-white/80"
              onClick={() => setIsOpen(false)}
            >
              Flashcards
            </Link>
            <Link
              href="#contact"
              className="text-base font-medium text-white/80"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            <div className="flex flex-col space-y-3 pt-3">
              <Link
                href="#chat"
                className="px-4 py-3 text-sm rounded-xl button-ghost text-center"
                onClick={() => setIsOpen(false)}
              >
                Learn More
              </Link>
              <Link
                href="#chat"
                className="px-4 py-3 text-sm rounded-xl button-gradient font-medium text-center"
                onClick={() => setIsOpen(false)}
              >
                Try It Now
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
