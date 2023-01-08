const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const createDB = require("../config/db");
const User = require("../models/userModels");

const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators.js");
const { create } = require("../models/userModels");


//To run the database -> connect db

createDB.sync().then(() => {
    console.log("DB is running")
})

//To check if a user already exists
let users = {

}
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({
        where: {
           email
        }
    })

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
  
    // users[email] = { name, password: hashedPassword };
    
    const saveToDB = {
        name, email, password: hashedPassword
    }

    const createdUser = await User.create(saveToDB);

    return res.status(201).send(createdUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // const userExists = users.hasOwnProperty(email);
    const userExists = await User.findOne({
        where: {
            email
        }
    })
   
    const userData = await User.findOne({
        raw: true,
        where: {
            email
        }
    });


    if (!userExists) {
      return res.send("User does not exist");
    }

    const passMatch = await bcrypt.compare(password, userData.password)

    if (!passMatch) {
      return res.send("Password mismatch");
    }

    return res.send("Succcess");
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports = router;
