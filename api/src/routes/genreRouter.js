const { Router } = require('express');
const { getGenres } = require("../handlers/genreHandler");

const router = Router();

router.get("/", getGenres);

module.exports = router;