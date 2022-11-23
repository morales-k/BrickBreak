import React, {useState, useEffect, useRef} from 'react'

function Canvas() {
  const [mouseX, setmouseX] = useState(100);
  const [mouseY, setmouseY] = useState(100);
  const canvas = useRef();
  const dpr = window.devicePixelRatio || 1;
  const radius = 50;

  // Set up resize listener for responsive canvas.
  useEffect(() => {
    setupCanvas();

    window.addEventListener('resize', () => {
      setupCanvas();
    });

    // Clean up
    return () => {
      window.removeEventListener('resize', () => {
        setupCanvas();
      });
    };
  }, []);

  // Redraw when mouse coords update.
  useEffect(() => {
    draw();
  }, [mouseX, mouseY]);

  // Sets canvas and scales based on device pixel ratio.
  function setupCanvas() {
    const rect = canvas.current.getBoundingClientRect();
    const ctx = canvas.current.getContext('2d');

    // Scale the current canvas by device pixel ratio to fix blur.
    canvas.current.width = rect.width * dpr;
    canvas.current.height = window.innerHeight * dpr;

    // Set height of the canvas itself to fit screen.
    canvas.height = window.innerHeight * dpr;

    ctx.scale(dpr, dpr);
    return ctx;
  }
  
  // Circle moves with mouseXY coords.
  const circle = (ctx, mouseX, mouseY) => {
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, radius, 0, 2*Math.PI, false);
    ctx.fillStyle = '#299a9c';
    ctx.fill();
  };

  // Clears & redraws the canvas.
  function draw() {
    const ctx = canvas.current.getContext('2d');
    const rect = canvas.current.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circle(ctx, mouseX, mouseY);
  }

  // Updates mouse coordinates & detects if mouse touches edge.
  function trackmouse(e) {
    const rect = canvas.current.getBoundingClientRect();
    const leftEdgeCollision = e.clientX <= radius ? true : false;
    const rightEdgeCollision = e.clientX >= rect.width - radius ? true : false;
    const topEdgeCollision = e.clientY <= radius ? true : false;
    const bottomEdgeCollision = e.clientY >= rect.height - radius ? true : false;
    
    // Reset coords if mouse touches edge.
    if (leftEdgeCollision) {
      setmouseX(radius);
    } else if (topEdgeCollision) {
      setmouseY(radius);
    } else if (rightEdgeCollision) {
      setmouseX(rect.width - radius);
    } else if (bottomEdgeCollision) {
      setmouseY(rect.height - radius);
    } else {
      // In bounds. Update coords.
      setmouseX(e.clientX);
      setmouseY(e.clientY);
    }
  }

  return (
    <canvas id="canvas" ref={canvas} onMouseMove={(e) => trackmouse(e)} />
  )
}

export default Canvas