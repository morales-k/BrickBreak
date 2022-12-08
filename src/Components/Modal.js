import React from 'react';
import Button from './Button';
import { win, score, resetGame } from "../ViewModel/CanvasVM";

const Modal = (props) => {
    const { show, toggleModal } = props;
    const playAgain = () => {
        resetGame();
        toggleModal(false);
    }

    return (
        <div className={show ? "modal" : "hidden"}>
            <h1>{win ? "Winner!" : "Game Over"}</h1>
            <h2>You scored {score}</h2>
            <Button
                style="restart-btn"
                perform={() => playAgain()}
                text="Play again" />
        </div>
    )
}

export default Modal