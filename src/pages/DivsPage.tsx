import Carousel from "../components/carousels/TopBottomCarousel";
import Carousel2 from "../components/carousels/TopBottomCarousel2";
import LeftRightCarousel from "../components/carousels/LeftRightCarousel";
import VideoPlayer from "../components/divs/VideoPlayer";
import { useState } from "react";
import InputRange from "../components/inputs/InputRange";

function DivsPage() {
  const items = ["Élément 1", "Élément 2", "Élément 3", "Élément 4"];
  const items2 = ["Élément 1"];
  const videoSources = {
    webm: "/videos/GameOfLife.webm",
    mp4: "/videos/GameOfLife.mp4",
  };
  const [value, setValue] = useState(50);

  return (
    <div className="flex-center w-full h-screen flex-wrap gap-10">
      <VideoPlayer videoSources={videoSources} classname="w-1/2" />

      <InputRange
        min={0}
        max={100}
      />
      <p>Value: {value}</p>

      <div className="border-style rounded-md relative mt-10 bg-red-400 h-32 w-1/2">
        <div>Brat Haj</div>
      </div>

      <div className="overflow-hidden flex flex-center w-40 h-40 rounded-md">
        <div className="rotate-45 w-32 h-40 rounded-md bg-red-400"></div>
      </div>

      <Carousel items={items2} />
      <Carousel2 items={items2} />

      <LeftRightCarousel
        items={[
          <div className="bg-red-500 w-full h-full">Item 1</div>,
          <div className="bg-blue-500 w-full h-full">Item 2</div>,
          <div className="bg-green-500 w-full h-full">Item 3</div>,
        ]}
      />
    </div>
  );
}

export default DivsPage;
