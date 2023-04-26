const { Router } = require('express');
const { getByName, getById, create } = require("../handlers/videogameHandlers");

const router = Router();

router.get("/", getByName);
router.get("/:id", getById);
router.post("/", create);

module.exports = router;