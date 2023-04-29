const {
  getAll,
  searchByName,
  searchById,
  createVideogame,
} = require("../controllers/videogameController");

const getByName = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name ? await searchByName(name) : await getAll();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  const source = typeof id === "string" ? "api" : "db";

  try {
    const game = await searchById(id, source);
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const {
      name,
      description,
      platforms,
      image,
      release_date,
      rating,
      genres,
    } = req.body;
    const newGame = await createVideogame(
      name,
      description,
      platforms,
      image,
      release_date,
      rating,
      genres
    );
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getByName,
  getById,
  create,
};
