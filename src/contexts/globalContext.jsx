// Make a Global context file that will handle the sound boolean state and provide that state to the rest of the app.

import React from 'react';
import useStickyState from '../hooks/useStickyState';

const GlobalContext = React.createContext();

function GlobalProvider({ children }) {

    // Sticky states
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
    
    // Non-sticky states
    const [isPlaying, setIsPlaying] = React.useState(false);

    // Detect system theme
    const getSystemTheme = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else {
            return 'light';
        }
    };

    let systemTheme = getSystemTheme();

    const [savedTheme, setSavedTheme] = useStickyState(systemTheme, 'clock-app-theme');
    const theme = savedTheme === 'system' ? getSystemTheme() : savedTheme;

    return (
        <GlobalContext.Provider value={{
            isSound, setIsSound, 
            isTwelveHour, setIsTwelveHour, 
            volume, setVolume,
            isTicking, setIsTicking,
            showAnalog, setShowAnalog,
            showDigital, setShowDigital,
            volumeModifier, tickVolumeModifier,
            showAnimations, setShowAnimations,
            isPlaying, setIsPlaying,
            theme, savedTheme, setSavedTheme
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalProvider, GlobalContext };