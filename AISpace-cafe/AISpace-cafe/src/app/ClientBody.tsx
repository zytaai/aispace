"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Configure body styles and enable particle interaction
  useEffect(() => {
    // Set base classes
    document.body.className = "antialiased dark";

    // Enable particle interaction by setting pointer-events to auto on particles container
    const enableParticlesInteraction = () => {
      const particlesContainer = document.getElementById('particles-js');
      if (particlesContainer) {
        particlesContainer.style.pointerEvents = 'auto';
      }
    };

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Initial check and MutationObserver to ensure particles are interactive
    enableParticlesInteraction();
    const observer = new MutationObserver(enableParticlesInteraction);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <body
      className="antialiased dark bg-[#0D0D0D] min-h-screen overflow-x-hidden"
      suppressHydrationWarning
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0D0D0D 70%)'
      }}
    >
      {children}
    </body>
  );
}
