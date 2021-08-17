const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/comics", async (req, res) => {
  let title = req.query.title;

  let page = Number(req.query.page);
  let skip = 100;

  if (page === 1 || !page) {
    skip = 0;
  } else if (page > 1) {
    skip = (page - 1) * skip;
  }

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&skip=${skip}&page=${page}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    let characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
