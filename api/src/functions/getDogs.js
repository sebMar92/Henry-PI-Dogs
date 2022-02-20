const { Dog, Temperament } = require("../db.js");
const { YOUR_API_KEY } = process.env;
const axios = require("axios");

const inchesToCentimeter = function(value){
  return value * 2.54;
};

const poundsToKilograms = function(value){
  return value * 0.45; 
};

const parseData = function ([min, max]){
  let parseMin = parseFloat(min);
  let parseMax = parseFloat(max);
  parseMin = isNaN(parseMin) ? parseMax : parseMin;
  parseMax = isNaN(parseMax) ? parseMin : parseMax;

  return [parseMin, parseMax]
};

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
      maxHeight: Math.round(inchesToCentimeter(maxHeight)),
      minHeight: Math.round(inchesToCentimeter(minHeight)),
      minWeight: Math.round(poundsToKilograms(minWeight)),
      maxWeight: Math.round(poundsToKilograms(maxWeight)),
      lifespan: e.life_span,
      image: e.image.url,
      temperament: e.temperament,
    };
  });
  const temperamentsToArray = apiDogs.map((dog) => {
    const temperamentSplit = dog.temperament && dog.temperament.split(", ");
    return { ...dog, temperament: temperamentSplit };
  });
  return temperamentsToArray;
};
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
  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  return dbDogs.concat(apiDogs);
};

module.exports = {
  getApiDogs,
  getDbDogs,
  getAllDogs,
};
