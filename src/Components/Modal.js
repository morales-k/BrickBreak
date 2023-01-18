import React, { useEffect } from 'react';
import Button from './Button';
import { score, buildLevel, gameWon } from "../ViewModel/CanvasVM";
import { brickLayout } from '../ViewModel/BrickVM';
import { playBackgroundMusic, musicVolume } from '../ViewModel/SoundVM';
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
        playBackgroundMusic(musicVolume);
    }

    return (
        <div className={show ? "modal" : "hidden"}>
            {
                !infoModal ?
                <>
                    <h1>
                        {
                        gameWon ? 
                        "WINNER!" : 
                        brickLayout.remainingBricks > 0 ? "GAME OVER" :
                        "LEVEL COMPLETE"
                        }
                    </h1>
                    <h2>You scored {score}</h2>
                    <Button
                        id="restartBtn"
                        style="restart-btn"
                        perform={() => playAgain()}
                        text={!gameWon && brickLayout.remainingBricks === 0 ? "Next level" : "Play again"} />
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