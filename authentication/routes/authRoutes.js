const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators.js");

let users = {};

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = users.hasOwnProperty(email);
    if (userExists) {
      return res.send("User exists");
    }

    if (!validateName(name)) {
      return res.send("Invalid name");
    }

    if (!validateEmail(email)) {
      return res.send("Invalid email");
    }

    if (!validatePassword(password)) {
      return res.send("Invalid Password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users[email] = { name, password: hashedPassword };

    return res.status(201).send(users[email]);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = users.hasOwnProperty(email);

    if (!userExists) {
      return res.send("User does not exist");
    }

    const passMatch = await bcrypt.compare(password, users[email].password);

    if (!passMatch) {
      return res.send("Password mismatch");
    }

    return res.send("Succcess");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
