import React from "react";

const CoffeeLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coffee Cup Base */}
      <path
        d="M5 6h10c1.1 0 2 .9 2 2v7c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V8c0-1.1.9-2 2-2z"
        fill="currentColor"
        fillOpacity="0.6"
      />

      {/* Cup Handle */}
      <path
        d="M17 8h1c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Steam/Aroma */}
      <path
        d="M8 3.5C8.5 3 9.5 2 10 3.5M12 3C12.5 2.5 13.5 1.5 14 3"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Quantum Wave Line */}
      <path
        d="M7 10C7.5 9.5 8.5 9 9 10C9.5 11 10.5 11 11 10C11.5 9 12.5 9 13 10"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="0.5 0.5"
      />

      {/* Saucer */}
      <path
        d="M4 19h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CoffeeLogo;
