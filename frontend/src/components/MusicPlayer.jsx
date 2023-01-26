import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "boring-avatars";
import {
  faBackwardStep,
  faForwardStep,
  faPauseCircle,
  faPlayCircle,
  faRepeat,
  faShuffle,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../hooks/UseContext";

const MusicPlayer = (audio) => {
  const {
    togglePlayPause,
    audioPlayer,
    isPlaying,
    setIsPlaying,
    nextAudio,
    prevAudio,
  } = useContext(AuthContext);

  const [second, setSecond] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentSec = Math.round(audioPlayer.current.currentTime);
      const duration = Math.round(audioPlayer.current.duration);
      const currProgress = (currentSec / duration) * 100;
      setSecond(currentSec);
      setDuration(duration);
      setProgress(currProgress);
    };

    audioPlayer.current.addEventListener("timeupdate", updateProgress);

    return () => {
      return audioPlayer.current.removeEventListener(
        "timeupdate",
        updateProgress
      );
    };
  }, [second, duration, progress]);

  const handleSliderChange = (e) => {
    const currTime = (e.target.value / 100) * audioPlayer.current.duration;
    audioPlayer.current.currentTime = currTime;
    setProgress(e.target.value);
  };

  const animationRef = useRef();
  const progressBarRef = useRef();

  const playPause = () => {
    setIsPlaying((prev) => !prev);

    if (isPlaying) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }

    togglePlayPause();
  };

  const whilePlaying = () => {
    progressBarRef.current.values = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changePlayerCurrentTime = () => {
    progressBarRef.current.style.setProperty(
      "--seek-before-width",
      `${
        (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
      }%`
    );
  };

  return (
    <div className="fixed bottom-0 navbar w-full justify-center items-center">
      <div className="flex justify-between py-3 px-[1rem] items-center">
        <div className="flex items-center gap-5">
          <Avatar
            size={40}
            // name={audio.audio.artist}
            name={audio.audio.artist + audio.audio.title}
            variant="pixel"
            colors={["#FFAD08", "#EDD75A", "#73B06F", "#0C8F8F", "#405059"]}
          />
          <div className="flex flex-col">
            <h2 className="font-medium">
              {audio.audio.title.length > 25
                ? `${audio.audio.title.substring(0, 25)} ...`
                : audio.audio.title}
            </h2>
            <h3 className="text-sm">{audio.audio.artist}</h3>
          </div>
          {/* <FontAwesomeIcon icon={faVolumeHigh} /> */}
        </div>
        <div className="flex gap-5">
          {/* <FontAwesomeIcon icon={faShuffle} /> */}
          <FontAwesomeIcon
            icon={faBackwardStep}
            onClick={prevAudio}
            className="text-xl"
          />
          <FontAwesomeIcon
            icon={audio.playing ? faPauseCircle : faPlayCircle}
            onClick={() => playPause()}
            className="text-xl"
          />
          <FontAwesomeIcon
            icon={faForwardStep}
            onClick={nextAudio}
            className="text-xl"
          />
          {/* <FontAwesomeIcon icon={faRepeat} /> */}
        </div>
      </div>
      {/* <div className="relative pt-1">
        <p>{second < 10 ? `0:0${second}` : `0:${second}`}</p>
        <p>{duration < 60 ? `0:${duration}` : `0${duration / 60}:00`}</p>
        <input
          type="range"
          className="form-range appearance-none w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
          id="customRange1"
          min="0"
          max="100"
          value={progress}
          onChange={handleSliderChange}
        />
      </div> */}
    </div>
  );
};

export default MusicPlayer;
