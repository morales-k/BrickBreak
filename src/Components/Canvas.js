import React, { useState, useEffect, useRef } from 'react'
import { setupCanvas, handleEvent, draw } from '../ViewModel/CanvasVM';
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

    window.addEventListener('keydown', (e) => handleEvent(e));
    window.addEventListener('keyup', (e) => handleEvent(e));
    window.addEventListener('dblclick', (e) => handleEvent(e));

     // Clean up
    return () => {
      window.removeEventListener('resize', () => {
        setupCanvas(canvas, setCanvasReady);
      });

      window.removeEventListener('keydown', (e) => handleEvent(e));
      window.removeEventListener('keyup', (e) => handleEvent(e));
      window.removeEventListener('dblclick', (e) => handleEvent(e));
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
        onMouseMove={(e) => handleEvent(e)}
        onTouchMove={(e) => handleEvent(e)} />
      <Modal 
        show={showModal}
        toggleModal={toggleModal}
        infoModal={false} />
    </>
  )
}

export default Canvas