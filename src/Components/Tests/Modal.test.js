import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Modal from "../Modal";
import * as canvasVM from "../../ViewModel/CanvasVM";

test("Modal is rendered.", () => {
  render(<Modal />);
  const modal = screen.getByTestId("modalTest");
  expect(modal).toBeInTheDocument();
});

test("Info modal displays how to play & sound controls.", () => {
  render(<Modal infoModal={true} />);
  const playControl = screen.getByTestId("playControlTest");
  const soundControls = screen.getAllByRole("slider");

  // Sound controls should be range sliders.
  soundControls.forEach(control => {
    expect(control).toBeInTheDocument();
    expect(control).toHaveAttribute("type", "range");
  });
  expect(playControl).toBeInTheDocument();
});

describe("Non-info modal displays score and level complete, winner or game over message.", () => {
    test("Displays a score.", () => {
      render(<Modal />);
      const scoreText = screen.getByText(/you scored \d+/i);
      expect(scoreText).toBeInTheDocument();
    });
    
    /* Because gameWon is initially false, and brickLayout initially has no remainingBricks property, 
       testing for level complete text should occur prior to testing for winner/game over.
    */
    test("Displays level complete if gameWon is false & no bricks remain.", () => {
      render(<Modal />);
      const levelCompleteText = screen.getByText(/level complete/i);
      expect(levelCompleteText).toBeVisible();
    });
    
    test("Displays winner if gameWon is true.", () => {
      canvasVM.gameWon = true;
      render(<Modal />);
      const winnerText = screen.getByText(/winner!/i);
      expect(winnerText).toBeVisible();
    });
    
    test("Displays game over if gameWon is false & there are remaining bricks.", () => {
      canvasVM.buildLevel(); // Building the level sets gameWon to false & calls createBrickArray().
      render(<Modal />);
      const gameOverText = screen.getByText(/game over/i);
      expect(gameOverText).toBeVisible();
    });
});