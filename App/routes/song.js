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
    allowedFormats: ["jpg", "png"]
});

const upload = multer({ storage: storage });

router.get("/", SongsController.Songs_get_all);

router.get("/:SongId", SongsController.Songs_get_Song);



module.exports = router;
