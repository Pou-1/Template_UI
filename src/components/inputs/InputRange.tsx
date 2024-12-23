import React, { useState, useEffect, useRef } from "react";

interface AnimatedRangeProps {
  min: number;
  max: number;
  step?: number;
  className?: string;
}

const AnimatedRange: React.FC<AnimatedRangeProps> = ({
  min,
  max,
  step = 1,
  className = "",
}) => {
  const [value, setValue] = useState<number>(min);
  const [textSuperPosition, setTextSuperPosition] = useState<number>(min);
  const [rangeWidth, setRangeWidth] = useState<number>(0);
  const rangeRef = useRef<HTMLInputElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rangeRef.current) {
      setRangeWidth(rangeRef.current.offsetWidth);
    }
  }, []);

  const lerp = (start: number, end: number, amt: number) => {
    return (1 - amt) * start + amt * end;
  };

  const updateCounter = () => {
    setTextSuperPosition((prev) => lerp(prev, value, 0.1));

    const range = (value - min) / (max - min);

    if (counterRef.current && lineRef.current) {
      const newPosition = lerp(
        parseFloat(counterRef.current.style.getPropertyValue("--position") || "0"),
        rangeWidth * range,
        0.1
      );
      const newSize = lerp(
        parseFloat(lineRef.current.style.getPropertyValue("--size") || "0"),
        range,
        0.1
      );

      counterRef.current.textContent = `${Math.floor(
        Math.abs(value - textSuperPosition) < 1 ? value : textSuperPosition
      )}`;
      counterRef.current.style.setProperty("--position", `${newPosition}`);
      lineRef.current.style.setProperty("--size", `${newSize}`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      requestAnimationFrame(updateCounter);
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [value, rangeWidth, textSuperPosition]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className={`relative w-full h-10 ${className}`}>
      <input
        ref={rangeRef}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 z-10"
      />
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 h-1 bg-blue-500 transform origin-left scale-x-0"
        style={{ transform: `scaleX(var(--position, 0))` }}
      ></div>
      <div
        ref={counterRef}
        className="absolute top-[-2rem] left-0 bg-gray-200 text-blue-600 text-center rounded-full w-8 h-8 flex items-center justify-center"
        style={{ transform: `translateX(calc(var(--position, 0) * 1px))` }}
      ></div>
    </div>
  );
};

export default AnimatedRange;
