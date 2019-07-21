const express = require("express");
const router = express.Router();
const multer = require('multer');
const SongsController = require('../controllers/Song');

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: 'love4kh',
    api_key: '332223379812156',
    api_secret: 'jZkFI1ojsA5QC33of3OnbmMOP20'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "music",
    allowedFormats: ["jpg", "png", "mp3","audio"]
});

const upload = multer({ storage: storage });

router.get("/", SongsController.Songs_get_all);

router.post("/", upload.any(), SongsController.Songs_create_Song);

router.get("/:SongId", SongsController.Songs_get_Song);

router.patch("/:SongId", upload.any() ,SongsController.Songs_update_Song);

router.delete("/:SongId", SongsController.Songs_delete);

module.exports = router;
