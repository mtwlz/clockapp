import React from 'react'

import Checkbox from './Checkbox';
import tick from '../sounds/better-bells/tick.mp3';
import minute15 from '../sounds/better-bells/15-minute.mp3';

import { SettingsContext } from '../contexts/settingsContext';
import useSound from '../hooks/useSound';
import Slider from './Slider';

function Settings() {
    const { isSound, setIsSound } = React.useContext(SettingsContext);
    const { isTicking, setIsTicking } = React.useContext(SettingsContext);
    const { volume, setVolume } = React.useContext(SettingsContext);
    const { volumeModifier } = React.useContext(SettingsContext);
    const { tickVolumeModifier } = React.useContext(SettingsContext);
    const { isTwelveHour, setIsTwelveHour } = React.useContext(SettingsContext);
    const { showAnalog, setShowAnalog } = React.useContext(SettingsContext);
    const { showDigital, setShowDigital } = React.useContext(SettingsContext);
    const { showAnimations, setShowAnimations } = React.useContext(SettingsContext);

    // Sounds
    const playTick = useSound(tick, (volume || 0.01) / volumeModifier);
    const playMinute15 = useSound(minute15, volume / tickVolumeModifier);

    const changeVolume = (e) => {
        setVolume(e.target.value);
    };

    return (
        <div className="settings">
            <div className="subtitle">Settings</div>

            {/* Sounds On/Off */}
            <Checkbox
                name="sound-checkbox"
                checked={isSound}
                size={20}
                label="Enable Sound"
                onChange={() => setIsSound(!isSound)}
            />

            {/* Test button */}
            <button onClick={() => playMinute15()}>Test Minute 15</button>

            {/* Ticking Sounds */}
            <Checkbox
                name="ticking-checkbox"
                checked={isTicking}
                size={20}
                label="Enable Ticking"
                disabled={!isSound}
                onChange={() => setIsTicking(!isTicking)}
            />

            {/* Twelve Hour */}
            <Checkbox
                name="twelve-hour-checkbox"
                checked={isTwelveHour}
                size={20}
                label="12 Hour Clock"
                disabled={!showDigital}
                onChange={() => setIsTwelveHour(!isTwelveHour)}
            />

            {/* Digital Toggle */}
            <Checkbox
                name="digital-checkbox"
                checked={showDigital}
                size={20}
                label="Show Digital Clock"
                onChange={() => setShowDigital(!showDigital)}
            />
            
            {/* Analog Toggle */}
            <Checkbox
                name="analog-checkbox"
                checked={showAnalog}
                size={20}
                label="Show Analog Clock"
                onChange={() => setShowAnalog(!showAnalog)}
            />

            {/* Animations Toggle */}
            <Checkbox
                name="animations-checkbox"
                checked={showAnimations}
                size={20}
                label="Show Animations"
                disabled={!showAnalog}
                onChange={() => setShowAnimations(!showAnimations)}
            />

            {/* Volume Slider */}
            <div>
                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    name='volume-slider'
                    label='Volume'
                    value={volume}
                    onChange={changeVolume}
                    onMouseUp={() => playTick()}
                />
            </div>
        </div>
    )
}

export default Settings