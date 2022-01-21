const express = require("express");

const { createOne, getAll, getOneById, getPetTypes, getPetByType, getNonMicrochipedPets } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/types", getPetTypes);

router.get("/dog", getPetByType);

router.get("/cat", getPetByType);

router.get("/snake", getPetByType);

router.get("/horse", getPetByType);

router.get("/bird", getPetByType);

router.get("/rabbit", getPetByType);

router.get("/pets?microchip=false", getNonMicrochipedPets);

router.get("/:id", getOneById);

module.exports = router;