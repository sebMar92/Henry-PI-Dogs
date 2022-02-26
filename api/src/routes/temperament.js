const router = require("express").Router();
const { Temperament } = require("../db.js");
const { getTemperaments } = require("../functions/functions.js");

router.get("", async function (req, res) {
  let dbTemperaments = await Temperament.findAll();
  if (dbTemperaments.length > 0) {
    return res.send(dbTemperaments);
  }
  dbTemperaments = await getTemperaments();
  res.send(dbTemperaments);
});

module.exports = router;
