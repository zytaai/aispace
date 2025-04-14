"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Loader2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
  id: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const API_KEY = "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";

  // Generate unique IDs for messages
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Effect to check if scroll button should be shown
  useEffect(() => {
    const checkScrollPosition = () => {
      if (!messagesContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;

      setShowScrollButton(isScrolledUp && messages.length > 0);
    };

    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [messages.length]);

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    // Only scroll automatically on new message if we're already at the bottom
    if (messages.length > 0 && messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 50;

      if (isScrolledToBottom) {
        scrollToBottom();
      } else if (messages.length === 1) {
        // Always scroll on first message
        scrollToBottom();
      }
    }
  }, [messages, scrollToBottom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      id: generateId(),
    };

    // Update messages state with user message
    setMessages((prev) => [...prev, userMessage]);
    setInput("");  // Clear input field
    setIsLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/llama-4.0-scout",
          messages: [...messages, userMessage].map(({role, content}) => ({role, content})),
        }),
      });

      const data = await response.json();

      if (data.choices?.[0]) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.choices[0].message.content,
          id: generateId(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Scroll to bottom after receiving reply
        setTimeout(scrollToBottom, 100);
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error) {
      console.error("Error calling the API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again later.",
          id: generateId(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chat" className="py-16 px-4">
      <motion.div
        className="mac-window max-w-5xl mx-auto shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="mac-window-header">
          <div className="mac-window-buttons">
            <div className="mac-dot mac-dot-red" />
            <div className="mac-dot mac-dot-yellow" />
            <div className="mac-dot mac-dot-green" />
          </div>
          <div className="flex justify-center w-full text-sm font-medium text-gray-300">
            Q-Brew AI Assistant
          </div>
        </div>

        <div className="p-4 md:p-6 flex flex-col h-[650px]">
          {/* Chat messages */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto pr-2 mb-4 font-sans custom-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="mb-6">
                  <svg viewBox="0 0 24 24" className="w-14 h-14 mx-auto mb-6 text-white/80 opacity-90">
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      fill="currentColor"
                      fillOpacity="0.7"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-medium mb-3 premium-text">
                  Unleash AI with Q-Brew: Chatbot-Driven
                </h2>
                <p className="text-quantum-secondary text-base max-w-md">
                  Ask anything about quantum computing. Powered by LLaMA 4.0 Scout with no login or data tracking.
                </p>
              </div>
            ) : (
              <div className="space-y-6 py-2">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`message-bubble ${
                          message.role === "user"
                            ? "message-bubble-user"
                            : "message-bubble-assistant"
                        }`}
                      >
                        <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="message-bubble message-bubble-assistant">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Q-Brew is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} className="h-2" />
              </div>
            )}
          </div>

          {/* Scroll to bottom button */}
          <AnimatePresence>
            {showScrollButton && (
              <motion.button
                className="absolute bottom-28 right-8 p-2 rounded-full premium-glass hover:bg-white/10 transition-all"
                onClick={scrollToBottom}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                aria-label="Scroll to bottom"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-3 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about quantum computing..."
              className="flex-1 bg-black/30 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all premium-glass"
              disabled={isLoading}
              autoComplete="off"
            />
            <button
              type="submit"
              className="p-4 rounded-xl button-ghost hover:bg-white/15 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
