import React from 'react';
import Button from './Button';

const Modal = (props) => {
    const { show, toggleModal } = props;
    const hideModal = () => toggleModal(false);

    return (
        <div className={show ? "modal" : "hidden"}>
            <h1>Game Over</h1>
            <h2>You scored 0</h2>
            <Button
                style="restart-btn"
                perform={() => hideModal()}
                text="Play again" />
        </div>
    )
}

export default Modal