import React from 'react'
import Button from './Button'

function SplashScreen(props) {
  const { toggleStart } = props;

  return (
    <>
      <h1>Title</h1>
      <Button
        style="start-btn"
        perform={() => toggleStart(true)}
        text="Start" />
    </>
  )
}

export default SplashScreen