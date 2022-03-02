import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import DogCard from "./components/DogCard/DogCard.jsx";

describe("DogCard", () => {
  let container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(
        <BrowserRouter>
          <DogCard
            name={"Terrier"}
            minHeight={4}
            maxHeight={8}
            minWeight={2}
            maxWeight={6}
            lifespan={"1 - 3 years"}
            image={
              "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
            }
            temperaments={["Happy", "Active"]}
          />
        </BrowserRouter>,
        container
      );
    });
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("should render a <p> with the dog's name", () => {
    const name = screen.getByText("Terrier");
    expect(name).toBeInTheDocument();
    expect(name.tagName).toBe("P");
  });
  it("should render a <p> with the dog's weight in the following format: 'Weight: {minWeight} - {maxWeight} kg.'", () => {
    const weight = screen.getByText("Weight: 2 - 6 kg.");
    expect(weight).toBeInTheDocument();
    expect(weight.tagName).toBe("P");
  });
  it("should render a <p> with a title 'Temperaments: ' followed by the dog's temperaments joined by commas", () => {
    const temperaments = screen.getByText("Temperaments: Happy, Active");
    expect(temperaments).toBeInTheDocument();
    expect(temperaments.tagName).toBe("P");
  });
});
