import React, { useState, useEffect, useRef } from 'react'
import { setupCanvas, handleKeys, draw, trackBar } from '../ViewModel/CanvasVM';
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

    window.addEventListener('keydown', (e) => handleKeys(e.key, canvas));

     // Clean up
    return () => {
      window.removeEventListener('resize', () => {
        setupCanvas(canvas, setCanvasReady);
      });

      window.removeEventListener('keydown', (e) => handleKeys(e.key, canvas));
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
        onMouseMove={(e) => trackBar(e.clientX, canvas)} />
      <Modal 
        show={showModal}
        toggleModal={toggleModal} />
    </>
  )
}

export default Canvas