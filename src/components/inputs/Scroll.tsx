import { useState, useRef, useEffect } from "react";

function Scroll() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const [blueBoxStyle, setBlueBoxStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const handleButtonClick = (index: number) => {
    const currentButton = buttonRefs.current[activeIndex];
    const targetButton = buttonRefs.current[index];

    if (currentButton && targetButton) {
      const currentRect = currentButton.getBoundingClientRect();
      const targetRect = targetButton.getBoundingClientRect();

      const parentRect = currentButton.offsetParent!.getBoundingClientRect();

      setBlueBoxStyle((prevStyle) => ({
        top: targetRect.top - parentRect.top,
        left: Math.min(currentRect.left, targetRect.left) - parentRect.left,
        width: Math.abs(currentRect.left - targetRect.left) + targetRect.width,
        height: targetRect.height,
      }));

      setTimeout(() => {
        setBlueBoxStyle({
          top: targetRect.top - parentRect.top,
          left: targetRect.left - parentRect.left,
          width: targetRect.width,
          height: targetRect.height,
        });
      }, 300);
    }

    setActiveIndex(index);
  };

  useEffect(() => {
    const firstButton = buttonRefs.current[0];
    if (firstButton) {
      const rect = firstButton.getBoundingClientRect();
      const parentRect = firstButton.offsetParent!.getBoundingClientRect();
      setBlueBoxStyle({
        top: rect.top - parentRect.top,
        left: rect.left - parentRect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute bg-blue-500 rounded-full transition-all duration-300"
        style={{
          top: `${blueBoxStyle.top}px`,
          left: `${blueBoxStyle.left}px`,
          width: `${blueBoxStyle.width}px`,
          height: `${blueBoxStyle.height}px`,
        }}
      ></div>

      <div className="flex-center relative gap-x-4 mt-20">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            ref={(el) => (buttonRefs.current[index] = el!)}
            className={`w-5 h-5 rounded-full trans-fast ${
              activeIndex === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
            }`}
            onClick={() => handleButtonClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Scroll;
