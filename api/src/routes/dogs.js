const router = require("express").Router();
const { getAllDogs } = require("../functions/functions.js");

router.get("", async function (req, res) {
  const { name } = req.query;
  if (name) {
    const allDogs = await getAllDogs();
    const searchedDogs = allDogs.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );

    return searchedDogs.length > 0
      ? res.send(searchedDogs)
      : res.send({
          error: `There aren't any dog breeds that include "${name}" in their name.`,
        });
  }

  res.send(await getAllDogs());
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const allDogs = await getAllDogs();
  const dogById = allDogs.find((dog) => dog.id == id);

  return dogById
    ? res.send(dogById)
    : res.send({ error: "The id doesn't match any dog breed." });
});

module.exports = router;
