const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

exports.signup = (req, res, next) => {
  const visiblePassword = req.body.password;
  bcrypt
    .hash(visiblePassword, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {};

exports.logout = (req, res, next) => {};
