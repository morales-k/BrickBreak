import React, { useState } from 'react'
import Button from './Button'
import Modal from './Modal';

function SplashScreen(props) {
  const { toggleStart } = props;
  const [showModal, toggleModal] = useState(false);

  return (
    <>
      <h1>Brick Break</h1>
      <h2 className="description">Break bricks. Don't let the ball fall!</h2>
      <Button
        style="start-btn"
        perform={() => toggleStart(true)}
        text="Start" />
      <h3 
        className="info"
        onClick={() => toggleModal(!showModal)}>
        Controls
      </h3>
      <Modal
        show={showModal}
        toggleModal={toggleModal}
        infoModal={true} />
    </>
  )
}

export default SplashScreen