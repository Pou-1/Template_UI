import React, { useEffect, useRef, useState } from "react";

interface ParallaxImageProps {
  imgSrc: string;
  altText?: string;
  className?: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ imgSrc, altText = "", className = "" }) => {
  const [offset, setOffset] = useState(-100);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        setOffset(0);
      } else {
        setOffset(-100);
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
        className="absolute top-0 left-0 w-full h-auto transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(${offset}%)`,
        }}
      />
    </div>
  );
};

export default ParallaxImage;
