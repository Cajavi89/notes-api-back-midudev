require("dotenv").config();

require("./mongo"); //conexion a la DB

const express = require("express");
const cors = require("cors");
const app = express();
const Note = require("./models/Note");
const notFound = require("./middleware/notFound");
const handleError = require("./middleware/handleError");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hola Mundo</h1>");
});

app.get("/api/notes", (req, res, next) => {
  Note.find({})
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => next(err));
});

app.get("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.put("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;
  const note = req.body;

  const noteToUpdate = {
    content: note.content,
    important: note.important,
  };
  Note.findByIdAndUpdate(id, noteToUpdate, { new: true }).then(
    (result) => res.status(result),
    end()
  );
});

app.delete("/api/notes/:id", (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.post("/api/notes", (req, res, next) => {
  const note = req.body;
  console.log(note);

  if (!note || !note.content) {
    return res.status(400).json({
      error: "note.content is missing",
    });
  }

  const noteDB = new Note({
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== "undefined" ? note.important : false,
  });

  noteDB
    .save()
    .then((savedNote) => {
      res.status(201).json(savedNote);
    })
    .catch((err) => next(err));
});

//manejo de errores

app.use(notFound);
app.use(handleError);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
