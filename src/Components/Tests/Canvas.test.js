import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Canvas from "../Canvas";

test("Canvas is rendered.", () => {
  /* Since the canvas calls the play method through playBackgroundMusic on render, and the testing library doesn't recognize this method,
  an error will be shown even if the test passes. Define the play method of the HTMLMediaElement to prevent this error. */
  Object.defineProperty(global.window.HTMLMediaElement.prototype, 'play', {
    configurable: true,
    // Define the property getter.
    get () {
      return () => {}
    }
  })
  
  render(<Canvas />);
  const canvas = screen.getByTestId("canvasTest");
  expect(canvas).toBeInTheDocument();
});