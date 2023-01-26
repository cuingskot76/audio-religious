import React, { useContext, useRef, useState } from "react";
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { AuthContext } from "../hooks/UseContext";
import MusicPlayer from "../components/MusicPlayer";

const BestAudio = () => {
  const trending = [
    {
      id: 1,
      artist: "Haneen Akira",
      title: "Tentang jodoh",
      track: "../public/constant/haneen-akira__tentang-jodoh.mp3",
      img: "../public/constant/woman.webp",
    },
    {
      id: 2,
      artist: "Hanan Ataki",
      title: "Bedanya jatuh hati sama jatuh cinta",
      track:
        "../public/constant/hanan-attaki__bedanya-jatuh-hati-sama-jatuh-cinta.mp3",
      img: "../public/constant/love.webp",
    },
    {
      id: 3,
      artist: "Hanan Ataki",
      title: "Bercanda dengan Allah",
      track: "../public/constant/hanan-attaki__bercanda-dengan-allah.mp3",
      img: "../public/constant/mosquee.webp",
    },
    {
      id: 4,
      artist: "Hanan Ataki",
      title: "Direject",
      track: "../public/constant/hanan-attaki__di-reject.mp3",
      img: "../public/constant/man-crying.webp",
    },
    {
      id: 5,
      artist: "Hanan Ataki",
      title: "Pernah sakit hati karena cinta",
      track:
        "../public/constant/hanan-attaki__pernah-sakit-hati-karena-cinta.mp3",
      img: "../public/constant/sakit-hati.webp",
    },
  ];

  const { musicPlayer, audioId, togglePlayPauseTrending, isPlaying } =
    useContext(AuthContext);

  return (
    <div className="px-[1rem] mt-5">
      <div className="flex items-center justify-between text-center mb-3">
        <h1 className="font-medium text-xl ">On Trending 🚀</h1>
        <p className="font-medium">See all</p>
      </div>
      <div className="flex gap-5 ">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          // modules={[Pagination]}
          className="mySwiper"
        >
          {trending.map((audio, i) => (
            <div key={i} className="relative overflow-hidden">
              <SwiperSlide>
                <img
                  src={audio.img}
                  className="rounded-br-md rounded-t-[30px] rounded-bl-[30px] border-b-8 border-r-8 border-t-4 border-l-4 border-black "
                />
                <div className=" absolute bottom-1 p-5 rounded-br-md  rounded-bl-[30px] text-white w-full flex justify-between items-center navbar ">
                  <div>
                    <h2 className="font-medium text-xl">{audio.title}</h2>
                    <h3 className="text-[#BBBBBB] ">{audio.artist}</h3>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={
                        audioId === audio.id && isPlaying
                          ? faPauseCircle
                          : faPlayCircle
                      }
                      className="text-[2rem]"
                      onClick={() => togglePlayPauseTrending(audio)}
                    />
                  </div>
                </div>
              </SwiperSlide>
            </div>
          ))}
          {/* {musicPlayer
            ? trending.map(
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
            : null} */}
        </Swiper>
      </div>
    </div>
  );
};

export default BestAudio;
