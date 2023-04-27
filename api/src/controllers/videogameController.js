require("dotenv").config();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const getApiInfo = async () => {
  const rawGames = (
    await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=15`)
  ).data.results;

  const gamesClean = rawGames.map((el) => {
    const genres = el.genres.map((genre) => genre.name);
    return {
      imagen: el.background_image,
      nombre: el.name,
      generos: genres,
    };
  });

  return gamesClean;
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

  if (dbRaw) {
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
  } else return [];
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

  const apiInfo = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)).data.results;
  //console.log(apiInfo);

  const apiInfoClean = apiInfo.map(el => {
    const genres = el.genres.map((genre) => genre.name);
    return {
      imagen: el.background_image,
      nombre: el.name,
      generos: genres,
    };
  })
  // const filteredApi = apiInfo.filter((game) =>
  //   game.nombre.toLowerCase().includes(name.toLowerCase())
  // );

  return [...apiInfoClean, ...dbInfo];
  //return apiInfoClean;
};

const getDetail = async (id) => {
  const gameRaw = (
    await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
  ).data;
  
  const platforms = gameRaw.parent_platforms.map((platform) => platform.platform.name);
  const genres = gameRaw.genres.map((genre) => genre.name);

  return {
    id: gameRaw.id,
    nombre: gameRaw.name,
    imagen: gameRaw.background_image,
    plataformas: platforms,
    fecha_lanzamiento: gameRaw.released,
    rating: gameRaw.rating,
    generos: genres,
  };
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
      : getDetail(id);

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
