// Make a Settings context file that will handle the sound boolean state and provide that state to the rest of the app.

import React from 'react';
import useStickyState from '../hooks/useStickyState';

const SettingsContext = React.createContext();

function SettingsProvider({ children }) {
    const [isTicking, setIsTicking] = useStickyState(false, 'clock-app-ticking');
    const [isSound, setIsSound] = useStickyState(false, 'clock-app-sound', (value) => {
        // Turn off ticking if sound is turned off
        if (!value) setIsTicking(false);
    });
    const [isTwelveHour, setIsTwelveHour] = useStickyState(true, 'clock-app-twelve-hour');
    const [volume, setVolume] = useStickyState(0.5, 'clock-app-volume');
    
    // Divides the volume by these numbers
    const volumeModifier = 5;
    const tickVolumeModifier = 50;

    const [showAnalog, setShowAnalog] = useStickyState(true, 'clock-app-show-analog', (value) => {
        // If we dont' want analog, then make sure digital is shown;
        if (!value) setShowDigital(true);
        if (!value) setShowAnimations(false);
    });
    const [showDigital, setShowDigital] = useStickyState(true, 'clock-app-show-digital', (value) => {
        // If we don't want digital, then make sure analog is shown;
        if (!value) setShowAnalog(true);
        if (!value) setIsTwelveHour(false);
    });
    const [showAnimations, setShowAnimations] = useStickyState(true, 'clock-app-show-animations');

    return (
        <SettingsContext.Provider value={{
            isSound, setIsSound, 
            isTwelveHour, setIsTwelveHour, 
            volume, setVolume,
            isTicking, setIsTicking,
            showAnalog, setShowAnalog,
            showDigital, setShowDigital,
            volumeModifier, tickVolumeModifier,
            showAnimations, setShowAnimations
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export { SettingsProvider, SettingsContext };