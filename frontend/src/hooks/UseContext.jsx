import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";

export const AuthContext = createContext();

export const UseContextProvider = ({ children }) => {
  const [audios, setAudios] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioId, setAudioId] = useState(null);
  const [musicPlayer, setMusicPlayer] = useState(false);

  useEffect(() => {
    const getAllAudios = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/audios");
        setAudios(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllAudios();
  }, []);

  const audioPlayer = useRef();

  const togglePlayPause = async (currentAudio) => {
    const audioTrack = `./public/uploads/${currentAudio.track}`;
    const audio = new Audio(audioTrack);
    // get audio id
    setAudioId(currentAudio.id);

    setIsPlaying((prevValue) => !prevValue);
    if (!isPlaying) {
      audio.play();
      audioPlayer.current = audio;
      setMusicPlayer(true);
    } else {
      audioPlayer.current.pause();
    }
  };

  const togglePlayPauseTrending = async (currentAudio) => {
    const audio = new Audio(currentAudio.track);
    // get audio id
    setAudioId(currentAudio?.id);

    setIsPlaying((prevValue) => !prevValue);
    if (!isPlaying) {
      audio.play();
      audioPlayer.current = audio;
      setMusicPlayer(true);
    } else {
      audioPlayer.current.pause();
    }
  };

  const nextAudio = () => {
    const currentAudioIndex = audios.findIndex((audio) => audio.id === audioId);
    const nextAudio = audios[currentAudioIndex + 1];
    if (nextAudio) {
      togglePlayPause(nextAudio);
    }
  };

  const prevAudio = () => {
    const currentAudioIndex = audios.findIndex((audio) => audio.id === audioId);
    const prevAudio = audios[currentAudioIndex - 1];
    if (prevAudio) {
      togglePlayPause(prevAudio);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        audios,
        setAudios,
        togglePlayPause,
        togglePlayPauseTrending,
        isPlaying,
        setIsPlaying,
        audioId,
        musicPlayer,
        audioPlayer,
        nextAudio,
        prevAudio,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
