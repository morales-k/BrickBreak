import theme from "../Assets/Sounds/theme.mp3";
import pop from "../Assets/Sounds/pop.mp3";
import win from "../Assets/Sounds/win.mp3";
import lose from "../Assets/Sounds/lose.mp3";
export let musicVolume = 1;
export let effectVolume = 1;

export function playBackgroundMusic(musicVolume) {
    let background = new Audio(theme);
    background.volume = musicVolume;
    background.loop = true;
    background.play();
}

export function playEffect(effectVolume, type) {
    let popSound = new Audio(pop);
    let winSound = new Audio(win);
    let loseSound = new Audio(lose);
    let effect = type === 'win' ? winSound : type === 'lose' ? loseSound : popSound;
    effect.volume = effectVolume;
    effect.play();
}

export const setVolume = (type, vol) => {
    if (type === 'music') {
        musicVolume = vol;
    } else if (type === 'effect') {
        effectVolume = vol;
    }
};