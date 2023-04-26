require("dotenv").config();
const { getGenresController } = require("../controllers/genreController");

const getGenres = async (req, res) => {
  try {
    const allGenres = await getGenresController();
    res.status(201).json(allGenres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getGenres };
