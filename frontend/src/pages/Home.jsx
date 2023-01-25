import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "boring-avatars";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import MusicPlayer from "../components/MusicPlayer";
import { AuthContext } from "../hooks/UseContext";

const Home = () => {
  const {
    audios,
    setAudios,
    togglePlayPause,
    audioId,
    isPlaying,
    musicPlayer,
  } = useContext(AuthContext);
  // console.log(isPlaying);

  const calculateTime = (time) => {
    if (time >= 60) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `0${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    } else {
      return `0:${time < 10 ? `0${time}` : time}`;
    }

    // const minutes = Math.floor(time / 60);
    // const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    // const seconds = Math.floor(time * 60);
    // const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    // return `${returnedMinutes}:${returnedSeconds}`;
  };

  // const x = audios[5]?.duration;
  // console.log(calculateTime(x));

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
        {musicPlayer
          ? audios.map(
              (audio) =>
                audio.id === audioId && (
                  // <MusicPlayer {...audio} playing={isPlaying} key={audio.id} />
                  <MusicPlayer
                    audio={audio}
                    playing={isPlaying}
                    key={audio.id}
                  />
                )
            )
          : null}
      </div>
      <Link to="/create">
        <button>Create</button>
      </Link>
    </div>
  );
};

export default Home;
