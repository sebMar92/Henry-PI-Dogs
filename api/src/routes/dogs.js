const router = require('express').Router();
const { Dog, Temperament } = require("../db.js");
const { YOUR_API_KEY } = process.env;
const { getAllDogs } = require("../functions/getDogs.js")
const db = require('../db.js');

router.get("", async function(req, res) {
    const { name } = req.query;
    if (name) {
        const allDogs = await getAllDogs();
        const dogos = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        return dogos.length > 0 ? res.send(dogos) : res.status(404).send({error: "No se encuentra la raza buscada."});
    }
    res.send(await getAllDogs());
});

router.get("/:id", async function(req, res) {
    const { id } = req.params;
    const allDogs = await getAllDogs();
    const dogo = allDogs.find(d => d.id = id);
    return dogo ? res.send(dogo) : res.status(404).send({error: "El id no corresponde a ninguna raza."});
});

module.exports = router;