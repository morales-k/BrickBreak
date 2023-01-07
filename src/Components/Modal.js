import React, { useEffect } from 'react';
import Button from './Button';
import { score, buildLevel } from "../ViewModel/CanvasVM";
import { remainingBricks } from '../ViewModel/BrickVM';

const Modal = (props) => {
    const { show, toggleModal, infoModal } = props;

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
            {
                !infoModal ?
                <>
                    <h1>{remainingBricks === 0 ? "Winner!" : "Game Over"}</h1>
                    <h2>You scored {score}</h2>
                    <Button
                        id="restartBtn"
                        style="restart-btn"
                        perform={() => playAgain()}
                        text="Play again" />
                </> :
                <>
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
                    <Button
                        style="controls-btn"
                        perform={() => toggleModal(false)}
                        text="Got it" />
                </>
            }
            
        </div>
    )
}

export default Modal