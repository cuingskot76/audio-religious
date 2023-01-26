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

  return (
    <div className=" my-10">
      <h1 className=" px-[1rem] mb-5 font-medium text-xl ">
        Recommendations 🔥
      </h1>
      <div>
        {audios?.length === 0 ? (
          <h1>No audio</h1>
        ) : (
          audios.map((audio) => (
            <div
              className={`flex px-[1rem] py-3 items-center mb-2 gap-5 ${
                audio.id === audioId && isPlaying ? "bg-[#F4F4F4]" : null
              }`}
              key={audio.id}
            >
              <Avatar
                size={70}
                name={audio.artist + audio.title}
                variant="pixel"
                colors={["#FFAD08", "#EDD75A", "#73B06F", "#0C8F8F", "#405059"]}
              />
              <div className="flex items-center gap-5 justify-between w-full">
                <div>
                  <h2 className="font-medium">
                    {audio.title.length > 25
                      ? `${audio.title.substring(0, 25)} ...`
                      : audio.title}
                  </h2>
                  <h3 className="text-sm text-[#494949] mb-1">
                    {audio.artist}
                  </h3>
                  <div className="flex">
                    <p
                      className={`text-sm ${
                        audio.genre?.toLowerCase() === "mood booster"
                          ? "bg-[#DEE7E8] text-[#4CB9D1]"
                          : null
                      } ${
                        audio.genre?.toLowerCase() === "percintaan"
                          ? "bg-[#FFDDD2] text-[#FF8787]"
                          : null
                      } ${
                        audio.genre?.toLowerCase() === "love"
                          ? "bg-[#FFE1E1] text-[#F675A8]"
                          : null
                      }
                  } ${
                    audio.genre?.toLowerCase() === "comedy"
                      ? "bg-[#EEF1FF] text-[#B1B2FF]"
                      : null
                  }
                  py-1 px-2 rounded-md`}
                    >
                      {audio.genre}
                    </p>
                  </div>
                </div>

                <FontAwesomeIcon
                  className="text-2xl"
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
