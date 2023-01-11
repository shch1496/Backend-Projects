const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const createDB = require("../config/db");
const Url = require("../models/urlModel");
const baseUrl = "http://localhost:1337/urlapi";

createDB.sync().then(() => {
  console.log("DB is running");
});
// Make a post api call

router.post("/", async (req, res) => {
  try {
    const { longUrl } = req.body;
    //convert this long url into an id
    // put the id after website domain
    // http://localhost:1337/urlapi/uuid

    const shortId = nanoid(4);
    //  const shortId = Math.random();
    //Store it in the database
    const shortUrl = await Url.create({
      longUrl,
      shortUrl: shortId,
    });

    return res.status(200).json({
      status: "ok",
      shortUrl: `${baseUrl}/${shortId}`,
    });
  } catch (e) {
    console.error(e);
  }
});

//Make a get api call

router.get("/:short", async (req, res) => {
  let shortId = req.params.short;
  try {
    //get the long url from database
    let url = await Url.findOne({
      where: {
        shortUrl: shortId,
      },
    });

    console.log(url);
    if (!url) {
      return res.status(400).send("Invalid short url");
    }
    return res.status(301).redirect(url.longUrl);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
