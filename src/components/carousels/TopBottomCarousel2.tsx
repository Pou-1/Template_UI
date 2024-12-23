import React, { useRef } from "react";
import '../../styles/carousel.css'

const Carousel: React.FC<{ items: string[] }> = ({ items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <div className="carousel w-full">
      <div className="flex-center bg-white rounded-md h-40">100px</div>
      <div className="bg-white"></div>
      <div className="flex-center bg-white rounded-md h-40">100px</div>
    </div>
  );
};

export default Carousel;
