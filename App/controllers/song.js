const mongoose = require("mongoose");
const Song = require("../models/song");

exports.Songs_get_all = (req, res, next) => {
  Song.find()
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        Songs: docs
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
  Song.findById(id)
    .select()
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          Song: doc,
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


