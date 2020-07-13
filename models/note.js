const mongoose = require("mongoose");

//creating the schema
const noteSchema = new mongoose.Schema({
	  username: { type: String, required: true },
	  content: { type: String, required: true },
	  date: { type: String, required: true },
	}, {
	  timestamps: true,
});

//creating the model
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;