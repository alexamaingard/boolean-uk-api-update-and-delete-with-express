const express = require("express");

const { createOne, getAll, getOneById, getFictionBooks, getNonFictionBooks, getBooksByAuthor } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/fiction", getFictionBooks);

router.get("/non-fiction", getNonFictionBooks);

router.get("/author/:author", getBooksByAuthor);

router.get("/:id", getOneById);


module.exports = router;