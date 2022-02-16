const router = require('express').Router();
const { Temperament } = require("../db.js");
const { getApiDogs } = require("../functions/getDogs.js")

router.get("", async function(req, res) {
    let dbTemperaments = await Temperament.findAll();
    if (dbTemperaments.length > 0) {
        return res.send(dbTemperaments);
    }
    const allDogs = await getApiDogs();
    let allTemperaments = [];
    for (d of allDogs) {
        if (d.temperament){
            for (t of d.temperament) {
                if (!allTemperaments.includes(t)){
                    allTemperaments.push(t);
                    await Temperament.create({name: t});
                }
            }
        }
      };
    dbTemperaments = await Temperament.findAll({
        attributes: ["id", "name"]
    });
    res.send(dbTemperaments);
});

module.exports = router;