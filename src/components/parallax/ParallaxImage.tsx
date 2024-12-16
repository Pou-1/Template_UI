import React, { useEffect, useRef, useState } from "react";

interface ParallaxImageProps {
  imgSrc: string;
  altText?: string;
  className?: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ imgSrc, altText = "", className = "" }) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      const elementVisible = rect.top < windowHeight && rect.bottom > 0;

      if (elementVisible) {
        const parallaxOffset = ((windowHeight - rect.top) / (windowHeight + elementHeight)) * 100;
        setOffset(parallaxOffset);
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
        className="absolute top-0 left-0 w-full h-auto transform"
        style={{
          transform: `translateY(-${offset / 2}%)`,
        }}
      />
    </div>
  );
};

export default ParallaxImage;
