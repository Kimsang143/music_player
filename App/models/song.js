const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    songLogo: { type: String, required: true },
    songFile: { type: String, required: true }
	},
    {
  	timestamps: true
});

module.exports = mongoose.model('Song', songSchema);