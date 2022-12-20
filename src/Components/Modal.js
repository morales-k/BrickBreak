import React, { useEffect } from 'react';
import Button from './Button';
import { score, buildLevel } from "../ViewModel/CanvasVM";
import { remainingBricks } from '../ViewModel/BrickVM';

const Modal = (props) => {
    const { show, toggleModal } = props;

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'r') {
                playAgain();
            }
        });

        // Clean up
        return () => {
        document.removeEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'r') {
                playAgain();
            }
        });
        };
    }, []);

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