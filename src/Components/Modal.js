import React, { useEffect } from 'react';
import Button from './Button';
import { score, buildLevel } from "../ViewModel/CanvasVM";
import { remainingBricks } from '../ViewModel/BrickVM';
import SoundControl from './SoundControl';
import PlayControl from './PlayControl';

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
                    <PlayControl />
                    <SoundControl />
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