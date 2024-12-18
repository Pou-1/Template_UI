import React, { useRef } from "react";

const Carousel: React.FC<{ items: string[] }> = ({ items }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-full flex px-14 relative flex-center">
      <div
        ref={carouselRef}
        className="overflow-hidden h-full w-full scroll-smooth flex"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex flex-col w-full h-full">
          {items.map((item, index) => (
            <div className="flex-center">
              <div
                key={index}
                className="w-full h-64 flex justify-center items-center bg-red-400 rounded-md"
              >
                {item}
              </div>
              <div className="bg-white h-1 w-10"></div>
              <div className="rounded-full w-3 h-3 bg-white"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-300 w-1 rounded-full h-full absolute"></div>

      <div
        ref={carouselRef}
        className="overflow-hidden h-full w-full scroll-smooth flex"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex flex-col w-full h-full">
          {items.map((item, index) => (
            
            <div className="flex-center">
              <div className="rounded-full w-3 h-3 bg-white"></div>
              <div className="bg-white h-1 w-10"></div>
              <div
                key={index}
                className="w-full h-64 flex justify-center items-center bg-red-400 rounded-md"
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
