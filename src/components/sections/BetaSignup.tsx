"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function BetaSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Clear form
      setEmail("");
    }, 1500);
  };

  return (
    <section id="beta" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-hero-glow opacity-30" />

      <motion.div
        className="max-w-lg mx-auto glass rounded-xl p-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Get Quantum Daily Drops</h2>
          <p className="text-quantum-secondary">
            Join the Beta for updates, flashcards, and early AI Space Cafe AI access.
          </p>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-6">
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">You're on the list!</h3>
            <p className="text-quantum-secondary text-center">
              Thank you for joining the quantum revolution. We'll send you updates soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-quantum-card text-white rounded-md border border-white/10 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-gray-500"
                  disabled={isSubmitting}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-md button-gradient font-medium flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-quantum-dark/50 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Join Beta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
