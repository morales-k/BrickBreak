import React from 'react';
import Button from './Button';
import { restartGame } from '../ViewModel/CanvasVM';

const Modal = (props) => {
    const { show, toggleModal } = props;
    const hideModal = () => toggleModal(false);

    return (
        <div className={show ? "modal" : "hidden"}>
            <h1>Game Over</h1>
            <h2>Play again?</h2>
            <Button
                style="restart-btn"
                perform={() => hideModal()} />
        </div>
    )
}

export default Modal