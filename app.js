const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Thing = require("./models/Thing");

dotenv.config();

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à la base de donée réussie"))
  .catch(() => console.log("Connexion échouée"));

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/api/stuff", async (req, res, next) => {
  delete req.body._id;

  const thing = new Thing({
    ...req.body,
  });

  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré ! " }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) =>
      res.status(404).json({ message: "no ressource found!", error })
    );
});

app.get("/api/stuff/:id", (req, res, next) => {
  const thingToGet = req.params.id;
  Thing.findById({ _id: thingToGet })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

app.put("/api/stuff/:id", (req, res, next) => {
  const thingToUpdate = req.params.id;
  Thing.updateOne({ _id: thingToUpdate }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(404).json({ error }));
});

app.delete("/api/stuff/:id", (req, res, next) => {
  const thingToDelete = req.params.id;
  Thing.deleteOne({ _id: thingToDelete })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(404).json({ error }));
});

module.exports = app;
