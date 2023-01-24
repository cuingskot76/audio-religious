import React from "react";

import { useState } from "react";
import axios from "axios";
const NewAudio = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData
      );
      // console.log(res?.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const audioUrl = await handleUpload();
      const { getFilename, duration } = audioUrl;
      const response = await axios.post("http://localhost:8000/api/audios", {
        title,
        genre,
        artist,
        track: getFilename,
        duration,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="genre"
        name="genre"
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="text"
        placeholder="artist"
        name="artis"
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        // accept="audio/*"
      />
      <button onClick={handleSubmit}>Upload</button>

      {/* <audio controls>
      <source src="http://localhost:8000/api/audios" type="audio/mpeg" />
    </audio> */}
    </form>
  );
};

export default NewAudio;
