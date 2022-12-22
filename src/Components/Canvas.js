import React, { useState, useEffect, useRef } from 'react'
import { setupCanvas, handleBarMovement, draw } from '../ViewModel/CanvasVM';
import Modal from './Modal';

function Canvas() {
  const [canvasReady, setCanvasReady] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const canvas = useRef();

  // Set up global listeners.
  useEffect(() => {
    setupCanvas(canvas, setCanvasReady);

    window.addEventListener('resize', () => {
      setupCanvas(canvas, setCanvasReady);
    });

    window.addEventListener('keydown', (e) => handleBarMovement(e));
    window.addEventListener('keyup', (e) => handleBarMovement(e));

     // Clean up
    return () => {
      window.removeEventListener('resize', () => {
        setupCanvas(canvas, setCanvasReady);
      });

      window.removeEventListener('keydown', (e) => handleBarMovement(e));
      window.removeEventListener('keyup', (e) => handleBarMovement(e));
    };
  }, []);

  useEffect(() => {
    if (canvasReady) {
      draw(canvas, toggleModal);
    }
  }, [canvasReady]);

  return (
    <>
      <canvas 
        id="canvas" 
        ref={canvas} 
        onMouseMove={(e) => handleBarMovement(e)} />
      <Modal 
        show={showModal}
        toggleModal={toggleModal} />
    </>
  )
}

export default Canvas