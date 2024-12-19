import Carousel from "../components/carousels/TopBottomCarousel";
import VideoPlayer from "../components/divs/VideoPlayer";

function DivsPage() {
  const items = ["Élément 1", "Élément 2", "Élément 3", "Élément 4"];
  const items2 = ["Élément 1"];
  const videoSources = {
    webm: "/videos/GameOfLife.webm",
    mp4: "/videos/GameOfLife.mp4",
  };

  return (
    <div className="flex-center w-full h-screen flex-wrap gap-10">

      <VideoPlayer videoSources={videoSources} classname="w-1/2"/>

      <div className="border-style rounded-md relative mt-10 bg-red-400 h-32 w-1/2">
        <div>Brat Haj</div>
      </div>

      <div className="overflow-hidden flex flex-center w-40 h-40 rounded-md">
        <div className="rotate-45 w-32 h-40 rounded-md bg-red-400"></div>
      </div>

      <Carousel items={items2} />
    </div>
  );
}

export default DivsPage;
