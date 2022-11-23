import React from 'react'

function SplashScreen(props) {
  return (
    <>
      <h1>Title</h1>
      <button className="start-btn" onClick={() => props.toggleStart(true)}>Start</button>
    </>
  )
}

export default SplashScreen