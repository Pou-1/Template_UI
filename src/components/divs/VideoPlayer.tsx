import { useState, useRef, useEffect } from "react";
import PlayIcon from "../../assets/Icons/PlayIcon";
import PauseIcon from "../../assets/Icons/PauseIcon";
import SoundIcon from "../../assets/Icons/SoundIcon";
import FullscreenIcon from "../../assets/Icons/FullscreenIcon";
import "../../styles/input.css";

interface VideoPlayerProps {
  videoSources: { webm: string; mp4: string };
  classname: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSources,classname }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [timeOfVideo, setTimeOfVideo] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isMouseActive, setIsMouseActive] = useState(true);
  const [isSoundChanged, setisSoundChanged] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); 

  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Play/Pause toggle
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

  // Update video time
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setTimeOfVideo(videoRef.current.currentTime);
    }
  };

  // Seek functionality
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.currentTime = parseFloat(event.target.value);
    }
  };

  // Format time for display
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Toggle fullscreen
  const toggleFullScreen = () => {
    if (!isFullScreen && containerRef.current) {
      containerRef.current.requestFullscreen?.();
      setIsFullScreen(true);
    } else if (isFullScreen) {
      document.exitFullscreen?.();
      setIsFullScreen(false);
    }
  };

  const handleMouseMove = () => {
    setIsMouseActive(true);

    // Réinitialiser le timer
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    // Démarrer un nouveau timer pour détecter l'inactivité
    inactivityTimer.current = setTimeout(() => {
      setIsMouseActive(false);
    }, 1400);
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
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative mb-96 border-2 m-2 rounded-lg overflow-hidden ${classname} 
            ${!isPlaying
                ? "cursor-pointer"
                : isMouseActive && isPlaying ? "cursor-pointer"
                : 'cursor-none'
            }
        `}
      onMouseMove={handleMouseMove}
    >
      <video ref={videoRef} className="w-full" onClick={togglePlayPause}>
        <source src={videoSources.webm} type="video/webm" />
        <source src={videoSources.mp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay controlled by isMouseActive */}
      <div
        className={`absolute top-0 w-full h-full flex flex-col bg-transparent trans-fast 
            ${!isPlaying
                ? ""
                : isMouseActive && isPlaying ? ""
                : 'opacity-0 pointer-events-none trans-fast'
            }
        `}
      >
        <div
          className="w-full h-full flex-center"
          onClick={togglePlayPause}
        >
          <button
            className={`text-white p-10 bg-red-400 hover:bg-red-500 trans-fast text-8xl rounded-full overflow-hidden
                ${!isPlaying
                    ? "opacity-100"
                    : isMouseActive && isPlaying ? "opacity-100"
                    : 'opacity-0'
                }
            `}
          >
            {isPlaying ? (
              <PauseIcon classname="size-12" />
            ) : (
              <PlayIcon classname="size-12" />
            )}
          </button>
        </div>

        <div className={`gap-5 cursor-default m-4 flex-center rounded-lg bg-red-400 w-auto p-2 opacity-0  trans-fast 
                ${!isPlaying
                    ? "opacity-100"
                    : isMouseActive && isPlaying ? "opacity-100"
                    : 'opacity-0'
                }
            `}>
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
            <div className={`hover:bg-red-500 flex relative rounded-md`}>
                <button onClick={() => setisSoundChanged(!isSoundChanged)} className="p-2">
                    <SoundIcon classname="size-7"/>
                </button>
                <input
                    type="range"
                    className={`bg-transparent trans-fast ${isSoundChanged ? '!w-0 opacity-0 mx-0' : 'mx-2 w-fit opacity-100'}`}
                />
            </div>
          </div>
          <div className="w-full gap-5 flex-center mr-4">
            <span>{formatTime(timeOfVideo)}</span>
            <span>/</span>
            <span>{formatTime(videoDuration)}</span>
            <input
              type="range"
              min="0"
              max={videoDuration}
              step="0.1"
              value={timeOfVideo}
              onChange={handleSeek}
              className="w-full bg-transparent trans-fast"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
