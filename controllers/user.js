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

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login / mot de passe incorrecte!" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login / mot de passe incorrecte!" });
          }

          res.status(200).json({
            userId: user._id,
            token: "TOKEN",
          });
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
};

exports.logout = (req, res, next) => {};
