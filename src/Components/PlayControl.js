import React from 'react';

const PlayControl = () => {
    return (
      <div className="control-container">
          <h1>Controls</h1>
          <p>
              <span className="bold">Launch:</span> Double click <span className="icon">&#128433;&#65039;</span> or press <span className="icon">&uarr;</span>.
          </p>
          <p>
              <span className="bold">Move:</span> Use <span className="icon">&#128433;&#65039;</span> or press <span className="icon">&larr;</span> and <span className="icon">&rarr;</span>.
          </p>
          <p>
              <span className="bold">Restart:</span> Press <span>R</span>
          </p>
      </div>
    )
}

export default PlayControl;