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

exports.Songs_create_Song = (req, res, next) => {
  const body = req.body;
  const song = new Song({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    songLogo: req.files[0].url,
    songFile: req.files[1].url
  });
  song
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Song successfully",
        createdSong: {
          _id: result._id,
          name: result.name,
        }
      });
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

exports.Songs_update_Song = (req, res, next) => {
  const id = req.params.SongId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Song.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Song updated",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.Songs_delete = (req, res, next) => {
  const id = req.params.SongId;
  Song.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Song deleted",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
