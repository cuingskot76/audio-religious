import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "boring-avatars";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [audios, setAudios] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioId, setAudioId] = useState(null);

  const audioPlayer = useRef();

  useEffect(() => {
    const getAllAudios = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/audios");
        console.log(res?.data);
        setAudios(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllAudios();
  }, []);

  const togglePlayPause = async (currentAudio) => {
    const audioTrack = `./public/uploads/${currentAudio.track}`;
    const audio = new Audio(audioTrack);
    // get audio id
    setAudioId(currentAudio.id);

    // const prevValue = isPlaying;
    setIsPlaying((prevValue) => !prevValue);
    if (!isPlaying) {
      audio.play();
      audioPlayer.current = audio;
    } else {
      audioPlayer.current.pause();
    }
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs * 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes}:${returnedSeconds}`;
  };

  return (
    <div>
      <div>
        {audios?.length === 0 ? (
          <h1>No audio</h1>
        ) : (
          audios.map((audio) => (
            <div className="flex items-center mb-5 gap-5" key={audio.id}>
              <Avatar
                size={40}
                name={audio.artist}
                variant="pixel"
                colors={["#FFAD08", "#EDD75A", "#73B06F", "#0C8F8F", "#405059"]}
              />
              <div className="flex items-center gap-5">
                <div>
                  <h2>
                    {audio.title.length > 25
                      ? `${audio.title.substring(0, 25)} ...`
                      : audio.title}
                  </h2>
                  <h3>{audio.artist}</h3>
                  <p>{audio.genre}</p>
                </div>

                <FontAwesomeIcon
                  // icon={isPlaying ? faPauseCircle : faPlayCircle}
                  icon={
                    audioId === audio.id && isPlaying
                      ? faPauseCircle
                      : faPlayCircle
                  }
                  onClick={() => togglePlayPause(audio)}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <Link to="/create">
        <button>Create</button>
      </Link>
    </div>
  );
};

export default Home;
