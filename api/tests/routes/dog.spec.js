/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Pug",
  minHeight: 12,
  maxHeight: 15,
  minWeight: 12,
  maxWeight: 15,
  lifespan: "12 - 14 years",
  temperaments: [1, 2, 3],
  image:
    "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
};

describe("Routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));
  });
  describe("POST /dog", () => {
    it("should get a message that says 'Dog breed succesfully created' when sent all the dog's information", () =>
      agent
        .post("/dog")
        .send(dog)
        .expect({ msg: "Dog breed succesfully created" }));

    it("should get an error that says 'Missing necessary data to create a dog' when there's missing information", () =>
      agent
        .post("/dog")
        .send({
          name: "pug",
        })
        .expect({ error: "Missing necessary data to create a dog" }));
  });
});
