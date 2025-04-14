"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FlashcardProps = {
  title: string;
  content: string;
  index: number;
};

const Flashcard = ({ title, content, index }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-[280px] w-full cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full h-full transform-style-3d"
        initial={false}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: isHovered ? 1.03 : 1
        }}
        transition={{
          duration: 0.6,
          scale: {
            duration: 0.2
          }
        }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden premium-card flex flex-col items-center justify-center text-center p-8">
          <motion.div
            className="h-14 w-14 rounded-full premium-glass flex items-center justify-center mb-5"
            animate={{
              boxShadow: isHovered ? [
                "0 0 10px rgba(255, 255, 255, 0.2)",
                "0 0 20px rgba(255, 255, 255, 0.3)",
                "0 0 10px rgba(255, 255, 255, 0.2)"
              ] : "0 0 0px rgba(255, 255, 255, 0)"
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6V12L16 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
          <h3 className="text-xl font-medium mb-3 premium-text">{title}</h3>
          <motion.p
            className="text-white/70 text-sm"
            animate={{
              opacity: isHovered ? [0.7, 1, 0.7] : 0.7
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            Click to flip
          </motion.p>

          {/* Decorative edge light */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden premium-card p-8 flex flex-col items-center justify-center text-center rotateY-180">
          <p className="text-sm leading-relaxed text-white/90 overflow-y-auto max-h-full">
            {content}
          </p>

          {/* Flip back hint */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <motion.span
              className="text-xs text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Tap to flip back
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Flashcards() {
  const cards = [
    {
      title: "What is a Qubit?",
      content:
        "A qubit (quantum bit) is the fundamental unit of quantum information. Unlike classical bits that can only be 0 or 1, qubits can exist in a superposition of both states simultaneously. This property enables quantum computers to process vast amounts of information in parallel.",
    },
    {
      title: "Superposition vs. Entanglement",
      content:
        "Superposition allows quantum particles to exist in multiple states at once. Entanglement is a phenomenon where quantum particles become correlated in such a way that the quantum state of each cannot be described independently. Einstein called entanglement 'spooky action at a distance.'",
    },
    {
      title: "Quantum Gates 101",
      content:
        "Quantum gates are the building blocks of quantum circuits. They manipulate qubits to perform operations. Common gates include: Hadamard (creates superposition), Pauli-X (like classical NOT gate), CNOT (creates entanglement), and Toffoli (universal for quantum computation).",
    },
  ];

  return (
    <section id="flashcards" className="py-28 px-4 relative">
      {/* Premium section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-5 tube-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Quantum Flashcards
          </motion.h2>
          <motion.p
            className="text-white/70 max-w-2xl mx-auto premium-text"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Learn quantum concepts, one card at a time. Flip the cards to reveal
            explanations about fundamental quantum computing principles.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={`card-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Flashcard title={card.title} content={card.content} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
