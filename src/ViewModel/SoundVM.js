import theme from "../Assets/Sounds/theme.mp3";
import pop from "../Assets/Sounds/pop.mp3";
import win from "../Assets/Sounds/win.mp3";
import lose from "../Assets/Sounds/lose.mp3";
export let musicVolume = 1;
export let effectVolume = 1;
let background = new Audio(theme);

export function playBackgroundMusic(musicVolume) {
    background.volume = musicVolume;
    background.loop = true;
    background.play();
};

export function playEffect(effectVolume, type) {
    let hitSound = new Audio(pop);
    let winSound = new Audio(win);
    let loseSound = new Audio(lose);
    let effect = type === 'win' ? winSound : type === 'lose' ? loseSound : hitSound;
    effect.volume = effectVolume;
    effect.play();
}

export const setVolume = (type, vol) => {
    if (type === 'music') {
        musicVolume = vol;
        if (vol === 0) {
            background.pause();
        }
    } else if (type === 'effect') {
        effectVolume = vol;
    }
};