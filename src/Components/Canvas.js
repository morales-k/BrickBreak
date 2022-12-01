import React, { useState, useEffect, useRef } from 'react'
import { setupCanvas, handleKeys, draw, trackMouse } from '../ViewModel/CanvasVM';
import Modal from './Modal';

function Canvas() {
  const [canvasReady, setCanvasReady] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const canvas = useRef();

  // Set up resize listener for responsive canvas.
  useEffect(() => {
    setupCanvas(canvas, setCanvasReady);

    window.addEventListener('resize', () => {
      setupCanvas(canvas, setCanvasReady);
    });

    window.addEventListener('keyup', (e) => handleKeys(e.key));

     // Clean up
    return () => {
      window.removeEventListener('resize', () => {
        setupCanvas(canvas, setCanvasReady);
      });

      window.removeEventListener('keyup', (e) => handleKeys(e.key));
    };
  }, []);

  useEffect(() => {
    if (canvasReady) {
      setInterval(() => draw(canvas, toggleModal), 10);
    }
  }, [canvasReady]);

  return (
    <>
      <canvas 
        id="canvas" 
        ref={canvas} 
        onMouseMove={(e) => trackMouse(e, canvas)} />
      <Modal 
        show={showModal}
        toggleModal={toggleModal} />
    </>
  )
}

export default Canvas