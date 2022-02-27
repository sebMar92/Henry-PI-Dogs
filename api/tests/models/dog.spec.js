const { Dog, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if any value other than image and temperaments is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Dog.create({
          name: "pug",
          minHeight: 12,
          maxHeight: 15,
          minWeight: 12,
          maxWeight: 15,
          lifespan: 12 - 14,
        }).then((res) => {
          done();
        });
      });
    });
  });
});
