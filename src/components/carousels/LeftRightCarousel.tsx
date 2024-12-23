import React, { useRef, useState } from "react";
import "tailwindcss/tailwind.css";

type CarouselItemProps = {
  children: React.ReactNode;
};

type CarouselProps = {
  items: React.ReactNode[];
};

const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
  return <div className="shrink-0 w-full h-full px-2">{children}</div>;
};

const LeftRightCarousel: React.FC<CarouselProps> = ({ items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    snapToClosestItem();
  };

  const snapToClosestItem = () => {
    if (!carouselRef.current) return;
    const scrollPosition = carouselRef.current.scrollLeft;
    const itemWidth = carouselRef.current.offsetWidth;

    const index = Math.round(scrollPosition / itemWidth);
    carouselRef.current.scrollTo({
      left: index * itemWidth,
      behavior: "smooth",
    });
  };

  const scrollToItem = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.offsetWidth;
    const currentScroll = carouselRef.current.scrollLeft;
    const newScroll =
      direction === "next"
        ? currentScroll + itemWidth
        : currentScroll - itemWidth;
    carouselRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!carouselRef.current) return;
  
    // Prévenir la propagation si on peut encore scroller dans le carrousel
    const atStart = carouselRef.current.scrollLeft === 0;
    const atEnd =
      carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >=
      carouselRef.current.scrollWidth;
  
    if ((e.deltaY < 0 && !atStart) || (e.deltaY > 0 && !atEnd)) {
      e.preventDefault();
      e.stopPropagation(); // Bloque la propagation de l'événement à la page
  
      const itemWidth = carouselRef.current.offsetWidth;
      const newScroll = carouselRef.current.scrollLeft + (e.deltaY > 0 ? itemWidth : -itemWidth);
      carouselRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };
  
  
  
  return (
    <div className="relative w-full h-full">
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll snap-x snap-mandatory w-full h-full cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={(e) => handleMouseDown(e.nativeEvent as unknown as React.MouseEvent)}
        onTouchMove={(e) => handleMouseMove(e.nativeEvent as unknown as React.MouseEvent)}
        onTouchEnd={handleMouseUpOrLeave}
        onWheel={handleWheel}
      >
        {items.map((item, index) => (
          <CarouselItem key={index}>{item}</CarouselItem>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => scrollToItem("prev")}
      >
        &#8592;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => scrollToItem("next")}
      >
        &#8594;
      </button>
    </div>
  );
};

export default LeftRightCarousel;