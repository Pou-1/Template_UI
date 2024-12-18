import React, { useEffect, useRef, useState, useCallback } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  className2?: string;
  delay?: number; // Délai entre l'apparition des lettres en millisecondes
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  className2 = "",
  delay = 50, // Délai par défaut de 150 ms entre les lettres
}) => {
  const [visibleLetters, setVisibleLetters] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fonction pour vérifier si l'élément est visible dans la fenêtre
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementVisible = rect.top < windowHeight && rect.bottom > 0;

      // Lorsque l'élément est visible dans la fenêtre de défilement, commence l'animation
      if (elementVisible) {
        let currentLetter = visibleLetters;
        const intervalID = setInterval(() => {
          currentLetter = Math.min(currentLetter + 1, text.length);
          setVisibleLetters(currentLetter);
          if (currentLetter === text.length) {
            clearInterval(intervalID); // Arrête l'intervalle quand toutes les lettres sont visibles
          }
        }, delay);
      } else {
        setVisibleLetters(0);
      }
    }
  }, [text.length, visibleLetters, delay]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
              transform: index < visibleLetters ? "translateY(0px)" : "translateY(-50px)",
              transition: `opacity ${delay}ms ease-in-out, transform ${delay}ms ease-in-out`,
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
