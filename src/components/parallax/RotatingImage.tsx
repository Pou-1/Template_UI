import React, { useEffect, useRef, useState } from "react";

interface RotatingImageProps {
  imgSrc: string;
  altText?: string;
  className?: string;
}

const RotatingImage: React.FC<RotatingImageProps> = ({ imgSrc, altText = "", className = "" }) => {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visiblePercentage = Math.min(
          Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
          1
        );
        setRotation(visiblePercentage * 360);
      }
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden h-80 ${className}`}
    >
      <img
        src={imgSrc}
        alt={altText}
        className="absolute top-0 left-0 w-52 h-auto transition-transform duration-500 ease-out"
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center",
        }}
      />
    </div>
  );
};

export default RotatingImage;
