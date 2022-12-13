const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const stuffRouter = require("./routes/stuff");
const userRouter = require("./routes/user");

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

app.use("/api/stuff", stuffRouter);
app.use("/api/auth", userRouter);

module.exports = app;
