import React from 'react';
import { setVolume } from '../ViewModel/SoundVM';

const SoundControl = () => {
    return (
        <div className="control-container">
            <h1>Sound</h1>
            <div className="slider-container">
                <label 
                    className="bold"
                    htmlFor="music">Music:
                </label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.2"
                    defaultValue="1"
                    onChange={e => setVolume('music', e.target.value)} />
            </div>
            <div className="slider-container">
            <label 
                    className="bold"
                    htmlFor="music">Effects:
                </label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.2"
                    defaultValue="1"
                    onChange={e => setVolume('effect', e.target.value)} />
            </div>
        </div>
    )
}

export default SoundControl;