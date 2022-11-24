import React, { useState, useEffect, useRef } from 'react'
import { setupCanvas, draw, trackMouse } from '../ViewModel/CanvasVM';

function Canvas() {
  const [mouseX, setMouseX] = useState(100);
  const [mouseY, setMouseY] = useState(100);
  const canvas = useRef();

  // Set up resize listener for responsive canvas.
  useEffect(() => {
    setupCanvas(canvas);

    window.addEventListener('resize', () => {
      setupCanvas(canvas);
    });

    // Clean up
    return () => {
      window.removeEventListener('resize', () => {
        setupCanvas(canvas);
      });
    };
  }, []);

  // Redraw when mouse coords update.
  useEffect(() => {
    draw(canvas, mouseX, mouseY);
  }, [mouseX, mouseY]);

  return (
    <canvas 
      id="canvas" 
      ref={canvas} 
      onMouseMove={(e) => trackMouse(e, canvas, setMouseX, setMouseY)} />
  )
}

export default Canvas