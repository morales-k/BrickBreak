import React from 'react';
import Button from './Button';
import { score, buildLevel } from "../ViewModel/CanvasVM";
import { remainingBricks } from '../ViewModel/BrickVM';

const Modal = (props) => {
    const { show, toggleModal } = props;
    const playAgain = () => {
        buildLevel();
        toggleModal(false);
    }

    return (
        <div className={show ? "modal" : "hidden"}>
            <h1>{remainingBricks === 0 ? "Winner!" : "Game Over"}</h1>
            <h2>You scored {score}</h2>
            <Button
                id="restartBtn"
                style="restart-btn"
                perform={() => playAgain()}
                text="Play again" />
        </div>
    )
}

export default Modal