import db from "../config/db.js";

export const getAudios = (req, res) => {
  const q = req.query.genre
    ? "SELECT * FROM audios WHERE genre = ?"
    : "SELECT * FROM audios";
  db.query(q, [req.query.genre], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getAudio = (req, res) => {};

export const createAudio = (req, res) => {
  //   const { artist, title, genre } = req.body;
  //   const q = `INSERT INTO audios (artist, title, genre) VALUES (?, ?, ?)`;
  const q = "INSERT INTO audios SET ?";
  const audio = {
    title: req.body.title,
    genre: req.body.genre,
    artist: req.body.artist,
    track: req.body.track,
    duration: req.body.duration,
  };

  db.query(q, audio, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json("Audio added successfully");
  });
};
