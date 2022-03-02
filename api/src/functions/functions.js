const { Dog, Temperament } = require("../db.js");
const { YOUR_API_KEY } = process.env;
const axios = require("axios");

const inchesToCentimeters = function (value) {
  return value * 2.54;
};

const poundsToKilograms = function (value) {
  return value * 0.45;
};

const parseData = function ([min, max]) {
  let parseMin = parseFloat(min);
  let parseMax = parseFloat(max);
  parseMin = isNaN(parseMin) ? parseMax : parseMin;
  parseMax = isNaN(parseMax) ? parseMin : parseMax;

  return [parseMin, parseMax];
};
//-----get api dogs
const getApiDogs = async function () {
  const apiInfo = await axios.get(
    `https://api.thedogapi.com/v1/breeds?apikey=${YOUR_API_KEY}`
  );

  const apiDogs = await apiInfo.data.map((e) => {
    const [minWeight, maxWeight] = parseData(e.weight.imperial.split(" - "));
    const [minHeight, maxHeight] = parseData(e.height.imperial.split(" - "));

    return {
      name: e.name,
      id: e.id,
      maxHeight: Math.round(inchesToCentimeters(maxHeight)),
      minHeight: Math.round(inchesToCentimeters(minHeight)),
      minWeight: Math.round(poundsToKilograms(minWeight)),
      maxWeight: Math.round(poundsToKilograms(maxWeight)),
      lifespan: e.life_span,
      image: e.image.url,
      temperament: e.temperament,
    };
  });
  const dogsWithTemperamentsAsArray = apiDogs.map((dog) => {
    const temperamentSplit = dog.temperament && dog.temperament.split(", ");
    return { ...dog, temperament: temperamentSplit };
  });
  return dogsWithTemperamentsAsArray;
};
//-----get database dogs
const getDbDogs = async function () {
  const dbDogs = await Dog.findAll({
    attributes: [
      "name",
      "id",
      "minHeight",
      "maxHeight",
      "minWeight",
      "maxWeight",
      "lifespan",
      "image",
      "fromDatabase",
    ],
    include: {
      model: Temperament,
      as: "temperament",
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const dbDogstoJson = dbDogs.map((dog) => dog.toJSON());
  const dbDogsWithTemperamentStrings = dbDogstoJson.map((dog) => {
    const temperamentName = dog.temperament.map(
      (temperament) => temperament.name
    );
    return { ...dog, temperament: temperamentName };
  });
  return dbDogsWithTemperamentStrings;
};

const getAllDogs = async function () {
  const [apiDogs, dbDogs] = await Promise.all([getApiDogs(), getDbDogs()]);
  return dbDogs.concat(apiDogs);
};

const getTemperaments = async function () {
  const allDogs = await getApiDogs();
  let allTemperamentsAux = [];
  for (const dog of allDogs) {
    if (dog.temperament) {
      for (const single_temperament of dog.temperament) {
        if (!allTemperamentsAux.includes(single_temperament)) {
          allTemperamentsAux.push(single_temperament);
          await Temperament.create({ name: single_temperament });
        }
      }
    }
  }
  const dbTemperaments = await Temperament.findAll({
    attributes: ["id", "name"],
  });
  return dbTemperaments;
};
module.exports = {
  getApiDogs,
  getDbDogs,
  getAllDogs,
  getTemperaments,
};
