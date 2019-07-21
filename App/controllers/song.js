const mongoose = require("mongoose");
const SongGet = require("../models/song");

exports.Songs_get_all = (req, res, next) => {
  SongGet.find()
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        songs: docs
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.Songs_get_Song = (req, res, next) => {
  const id = req.params.SongId;
  SongGet.findById(id)
    .select()
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          song: doc,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};


