const router = require('express').Router();
const { Dog } = require("../db.js");

router.post("", async function(req, res) {
    const { name, height, weight, lifespan, image, temperaments } = req.body;
    const doge = await Dog.create({
        name: name,
        height: height,
        weight: weight,
        lifespan: lifespan,
        image: image
    });
    temperaments.split(",").forEach(async (t) => {  
        await doge.addTemperament(t);     
    });
    res.send(doge)
});

module.exports = router;