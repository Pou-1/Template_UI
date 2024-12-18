import { useState, useRef, useEffect } from "react";
import PlayIcon from "../../assets/Icons/PlayIcon";
import PauseIcon from "../../assets/Icons/PauseIcon";

interface VideoPlayerProps {
  videoSources: { webm: string; mp4: string };
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSources }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeOfVideo, setTimeOfVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setTimeOfVideo(videoRef.current.currentTime);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.currentTime = parseFloat(event.target.value);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  return (
    <div className="relative w-full mb-96 border-2 m-2 rounded-md">
      <video ref={videoRef} className="w-full" onClick={togglePlayPause}>
        <source src={videoSources.webm} type="video/webm" />
        <source src={videoSources.mp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        className={`absolute flex-center top-0 cursor-pointer w-full h-full bg-transparent group transition-fast 
            ${isPlaying ? "hover:backdrop-blur-md" : ""}
        `}
        onClick={togglePlayPause}
      >
        <button
          
          className={`text-white p-10 bg-black text-8xl rounded-2xl overflow-hidden opacity-0 transition-fast group-hover:opacity-100`}
        >
          {isPlaying ? <PauseIcon classname="size-14"/> : <PlayIcon classname="size-14"/>}
        </button>

        <input
          type="range"
          min="0"
          max={videoRef.current ? videoRef.current.duration : 0}
          value={timeOfVideo}
          onChange={handleSeek}
          className="absolute bottom-10 w-11/12"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
