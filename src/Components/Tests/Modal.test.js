import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Modal from "../Modal";

test("Modal is rendered.", () => {
  render(<Modal />);
  const modal = screen.getByTestId("modalTest");
  expect(modal).toBeInTheDocument();
});

test("Non-info modal displays a score.", () => {
  render(<Modal />);
  const scoreText = screen.getByText(/you scored \d+/i);
  expect(scoreText).toBeInTheDocument();
});

test("Info modal displays how to play & sound controls.", () => {
  render(<Modal infoModal={true} />);
  const playControl = screen.getByTestId("playControlTest");
  const soundControls = screen.getAllByRole("slider");

  // Sound controls should be range sliders.
  soundControls.map(control => {
    expect(control).toBeInTheDocument();
    expect(control).toHaveAttribute("type", "range");
  });
  expect(playControl).toBeInTheDocument();
});