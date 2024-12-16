import React, { useEffect, useRef, useState, useCallback } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  className2?: string;
}

const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", className2 = "" }) => {
  const [visibleLetters, setVisibleLetters] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementVisible = rect.top < windowHeight && rect.bottom > 0;

      if (elementVisible) {
        setVisibleLetters((prev) => Math.min(prev + 1, text.length));
      } else {
        setVisibleLetters(0);
      }
    }
  }, [text.length]);

  useEffect(() => {
    handleScroll();
    const interval = setInterval(() => {
      handleScroll();
    }, 50);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [handleScroll]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        className={`text-center text-4sl transition-all duration-500 ${className2}`}
      >
        {text.split("").map((letter, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              opacity: index < visibleLetters ? 1 : 0,
              transform: index < visibleLetters ? "translateY(0px)" : "translateY(-20px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextReveal;
