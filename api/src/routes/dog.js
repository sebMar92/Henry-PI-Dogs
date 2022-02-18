const router = require("express").Router();
const { Dog } = require("../db.js");

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
  const doge = await Dog.create({
    name: name,
    minHeight: minHeight,
    maxHeight: maxHeight,
    minWeight: minWeight,
    maxWeight: maxWeight,
    lifespan: lifespan,
    image: image,
  });
  temperaments.forEach(async (t) => {
    console.log(t);
    await doge.addTemperament(t);
  });
  res.send(doge);
});

module.exports = router;
