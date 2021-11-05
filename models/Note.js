const mongoose = require("mongoose");

//Schema

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  importante: Boolean,
});

//darle formato al objeto como lo necesitamos, borrando el _id, y el __v
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//modelo para crear Notas
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
