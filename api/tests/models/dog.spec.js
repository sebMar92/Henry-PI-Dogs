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
      it("should work when all values are valid", () => {
        Dog.create({
          name: "Pug",
          minHeight: 12,
          maxHeight: 15,
          minWeight: 12,
          maxWeight: 15,
          image:
            "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
          lifespan: "12 - 14 years",
          temperaments: [1, 8],
        }).then((res) => {
          done();
        });
      });
    });
  });
});
