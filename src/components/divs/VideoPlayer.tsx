import { useState, useRef, useEffect } from "react";
import PlayIcon from "../../assets/Icons/PlayIcon";
import PauseIcon from "../../assets/Icons/PauseIcon";
import SoundIcon from "../../assets/Icons/SoundIcon";
import FullscreenIcon from "../../assets/Icons/FullscreenIcon";
import "../../styles/input.css";

interface VideoPlayerProps {
  videoSources: { webm: string; mp4: string };
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSources }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [timeOfVideo, setTimeOfVideo] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // Référence pour le conteneur

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

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const toggleFullScreen = () => {
    if (!isFullScreen && containerRef.current) {
      containerRef.current.requestFullscreen?.();
      setIsFullScreen(true);
    } else if (isFullScreen) {
      document.exitFullscreen?.();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.onloadedmetadata = () => {
        setVideoDuration(videoElement.duration);
      };
    }

    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full mb-96 border-2 m-2 rounded-lg overflow-hidden"
    >
      <video ref={videoRef} className="w-full" onClick={togglePlayPause}>
        <source src={videoSources.webm} type="video/webm" />
        <source src={videoSources.mp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        className={`absolute top-0 w-full h-full flex flex-col bg-transparent group transition-fast 
            ${
              isPlaying
                ? "hover:backdrop-blur-md backdrop-blur-0 trans-fast"
                : ""
            }
        `}
      >
        <div
          className="w-full h-full flex-center cursor-pointer"
          onClick={togglePlayPause}
        >
          <button
            className={`text-white p-10 bg-red-400 hover:bg-red-500 trans-fast text-8xl rounded-2xl overflow-hidden opacity-0 transition-fast group-hover:opacity-100`}
          >
            {isPlaying ? (
              <PauseIcon classname="size-14" />
            ) : (
              <PlayIcon classname="size-14" />
            )}
          </button>
        </div>

        <div className="gap-5 flex-center rounded-lg bg-red-400 w-full p-4 opacity-0 translate-y-3 group-hover:translate-y-0 trans-fast group-hover:opacity-100">
          <div className="flex text-white px-2">
            <button
              className="hover:bg-red-500 rounded-md p-2"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <PauseIcon classname="size-7" />
              ) : (
                <PlayIcon classname="size-7" />
              )}
            </button>
            <button
              className="hover:bg-red-500 rounded-md p-2"
              onClick={toggleFullScreen}
            >
              <FullscreenIcon classname="size-7" />
            </button>
            <div
              className="hover:bg-red-500 relative rounded-md p-2"
            >
              <SoundIcon classname="size-7" />
              <div className="absolute bottom-12 w-full p-2 h-16 rounded-md bg-black">
                <input type="range" className="h-20 w-20 rotate-90 bg-transparent"/>
              </div>
            </div>
          </div>
          <div className="w-full gap-5 flex-center">
            <span>{formatTime(timeOfVideo)}</span>
            <input
              type="range"
              min="0"
              max={videoDuration}
              step="0.1"
              value={timeOfVideo}
              onChange={handleSeek}
              className="w-full bg-transparent"
            />
            <span>{formatTime(videoDuration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
