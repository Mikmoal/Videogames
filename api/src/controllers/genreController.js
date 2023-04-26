require("dotenv").config();
const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getGenresController = async () => {
  // Primero busca la info en la DB
  const dbInfo = await Genre.findAll();

  //Si no hay datos, trae la info de la api y guarda en la DB
  if (!dbInfo.length) {
    const apiData = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;

    const genres = apiData.map((g) => g.name); //array de names de genres ["dwd","dwdwd"]

    genres
      .filter((t) => t !== "")
      .forEach((el) => {
        let i = el.trim();
        Genre.findOrCreate({
          where: { name: i },
        });
      });
  }

  return await Genre.findAll();
};

module.exports = { getGenresController };
