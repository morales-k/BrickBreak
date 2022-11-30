import React from 'react'

const Modal = (props) => {
    const { show } = props;

    return (
        <div className={show ? "modal" : "hidden"}>
            <h1>Game Over</h1>
            <h2>Play again?</h2>
        </div>
    )
}

export default Modal