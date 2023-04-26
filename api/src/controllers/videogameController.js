require("dotenv").config();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const getApiInfo = async () => {
  const rawGames = (
    await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=15`)
  ).data.results;

  const gamesClean = rawGames.map(el => {
    const genres = el.genres.map(genre => {
      return genre.name;
    })
    return {
      imagen: el.background_image,
      nombre: el.name,
      generos: genres
    }
  })

  return gamesClean
};

const getDbInfo = async () => {
  const dbRaw = await Videogame.findAll({
    include: [
      {
        model: Genre,
        through: {
          attributes: [],
        },
      },
    ],
  });

  const dbClean = dbRaw.map((e) => {
    
    return {
      id: e.dataValues.id,
      name: e.dataValues.name,
      description: e.dataValues.description,
      platforms: e.dataValues.platforms,
      image: e.dataValues.image,
      release_date: e.dataValues.release_date,
      rating: e.dataValues.rating,
    };
  });

  return dbClean;
};

const getAll = async () => {
  const dbInfo = await getDbInfo();
  const apiInfo = await getApiInfo();

  const all = dbInfo.concat(apiInfo);

  return all;
};

const searchByName = async (name) => {
  const dbInfo = await Videogame.findAll({
    where: { name },
  });

  const apiInfo = await getApiInfo();

  const filteredApi = apiInfo.filter((game) =>
    game.name.toLowerCase().includes(name.toLowerCase())
  );

  return [...filteredApi, ...dbInfo];
};

const searchById = async (id, source) => {
  const game =
    source === "db"
      ? await Videogame.findByPk(id, {
          include: {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        })
      : (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}/${id}`)).data;
  return game;
};

const createVideogame = async (
  id,
  name,
  description,
  platforms,
  image,
  release_date,
  rating,
  genres
) => {
  const newGame = (
    await Videogame.create({
      id,
      name,
      description,
      platforms,
      image,
      release_date,
      rating,
    })
  ).addGenre(genres);

  return newGame;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAll,
  searchByName,
  searchById,
  createVideogame,
};
