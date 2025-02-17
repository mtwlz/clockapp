import React from 'react'

import Checkbox from './Checkbox';
import tick from '../sounds/better-bells/tick.mp3';
import minute15 from '../sounds/better-bells/15-minute.mp3';

import { GlobalContext } from '../contexts/globalContext';
import useSound from '../hooks/useSound';
import Slider from './Slider';
import Dropdown from './Dropdown';
import Button from './Button';

function Settings(props) {
    const { handleShow } = props;
    const {
        isSound, setIsSound,
        isTicking, setIsTicking,
        volume, setVolume,
        volumeModifier, tickVolumeModifier,
        isTwelveHour, setIsTwelveHour,
        showAnalog, setShowAnalog,
        showDigital, setShowDigital,
        showAnimations, setShowAnimations,
        savedTheme, setSavedTheme
    } = React.useContext(GlobalContext);

    // Sounds
    const playTick = useSound(tick, (volume || 0.01) / volumeModifier);
    const playMinute15 = useSound(minute15, volume / tickVolumeModifier);

    const changeVolume = (e) => {
        setVolume(e.target.value);
    };

    const themeOptions = [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'system', label: 'System' },
    ];

    const changeTheme = (chosenTheme) => {
        setSavedTheme(chosenTheme);
    };

    return (
        <div className="settings">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="subtitle">Settings</span>
                <Button
                    label="X"
                    name="close-settings"
                    onClick={() => handleShow(false)}
                />
            </div>

            {/* Sounds On/Off */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <Checkbox
                    name="sound-checkbox"
                    checked={isSound}
                    size={20}
                    label="Enable Sound"
                    onChange={() => setIsSound(!isSound)}
                />

                {/* Test button */}
                <Button onClick={() => playMinute15()} label="Test"></Button>
            </div>


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

            {/* SAVED Theme Selector */}
            <Dropdown
                name="theme-selector"
                options={themeOptions}
                selected={savedTheme}
                onChange={changeTheme}
                label="Theme"
            />
        </div>
    )
}

export default Settings