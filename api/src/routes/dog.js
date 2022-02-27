const router = require("express").Router();
const { Dog, Temperament } = require("../db.js");
const { getTemperaments } = require("../functions/functions.js");

router.post("", async function (req, res) {
  const {
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    lifespan,
    image,
    temperaments,
  } = req.body;
  if (name && minHeight && maxHeight && minWeight && maxWeight && lifespan) {
    const doge = await Dog.create({
      name: name,
      minHeight: minHeight,
      maxHeight: maxHeight,
      minWeight: minWeight,
      maxWeight: maxWeight,
      lifespan: lifespan,
      image: image,
    });
    if (temperaments) {
      let dbTemperaments = await Temperament.findAll();
      if (dbTemperaments.length < 1) {
        await getTemperaments();
      }
      temperaments.forEach(async (t) => {
        await doge.addTemperament(t);
      });
    }
    return res.send({ msg: "Dog breed succesfully created" });
  } else {
    return res.send({ error: "Missing necessary data to create a dog" });
  }
});

module.exports = router;
