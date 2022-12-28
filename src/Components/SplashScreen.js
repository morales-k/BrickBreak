import React from 'react'
import Button from './Button'

function SplashScreen(props) {
  const { toggleStart } = props;

  return (
    <>
      <h1>Brick Break</h1>
      <h2 className="description">Break bricks. Don't let the ball fall!</h2>
      <Button
        style="start-btn"
        perform={() => toggleStart(true)}
        text="Start" />
    </>
  )
}

export default SplashScreen