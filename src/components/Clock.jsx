import React from 'react';
import '../styles/Clock.css';

// Import sound context & hook
import useSound from '../hooks/useSound';

// Import sound files
import minute15 from '../sounds/better-bells/15-minute.mp3';
import minute30 from '../sounds/better-bells/30-minute.mp3';
import minute45 from '../sounds/better-bells/45-minute.mp3';
import hour1 from '../sounds/better-bells/1-hour.mp3';
import hour2 from '../sounds/better-bells/2-hour.mp3';
import hour3 from '../sounds/better-bells/3-hour.mp3';
import hour4 from '../sounds/better-bells/4-hour.mp3';
import hour5 from '../sounds/better-bells/5-hour.mp3';
import hour6 from '../sounds/better-bells/6-hour.mp3';
import hour7 from '../sounds/better-bells/7-hour.mp3';
import hour8 from '../sounds/better-bells/8-hour.mp3';
import hour9 from '../sounds/better-bells/9-hour.mp3';
import hour10 from '../sounds/better-bells/10-hour.mp3';
import hour11 from '../sounds/better-bells/11-hour.mp3';
import hour12 from '../sounds/better-bells/12-hour.mp3';
import tick from '../sounds/better-bells/tick.mp3';

import { GlobalContext } from '../contexts/globalContext';

function Clock() {
    const { 
        isSound, 
        isTicking,
        volume, 
        volumeModifier, 
        tickVolumeModifier, 
        isTwelveHour, 
        showAnalog, 
        showDigital, 
        showAnimations,
        isPlaying
    } = React.useContext(GlobalContext);
    
    const [time, setTime] = React.useState({
        obj: new Date(),
        seconds: new Date().getSeconds(),
        minutes: new Date().getMinutes(),
        twelveHour: new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours(),
        twentyFour: new Date().getHours(),
        amPm: new Date().getHours() > 12 ? 'PM' : 'AM'
    });

    // Sound definitions
    const playBells = {
        minute15: useSound(minute15, volume / volumeModifier),
        minute30: useSound(minute30, volume / volumeModifier),
        minute45: useSound(minute45, volume / volumeModifier),
        hour1: useSound(hour1, volume / volumeModifier),
        hour2: useSound(hour2, volume / volumeModifier),
        hour3: useSound(hour3, volume / volumeModifier),
        hour4: useSound(hour4, volume / volumeModifier),
        hour5: useSound(hour5, volume / volumeModifier),
        hour6: useSound(hour6, volume / volumeModifier),
        hour7: useSound(hour7, volume / volumeModifier),
        hour8: useSound(hour8, volume / volumeModifier),
        hour9: useSound(hour9, volume / volumeModifier),
        hour10: useSound(hour10, volume / volumeModifier),
        hour11: useSound(hour11, volume / volumeModifier),
        hour12: useSound(hour12, volume / volumeModifier),
    };

    const playTickSound = useSound(tick, (volume || 0.01) / tickVolumeModifier);

    // Play the tick sound
    const handleTick = () => {
        if (!isSound || !isTicking) return;
        playTickSound();
    };

    // Determine what bell sound to play
    const handleBells = (currentTime) => {
        if (!isSound) return;

        // Get current time as numerical values
        const mins = currentTime.getMinutes();
        let hrs = currentTime.getHours();
        hrs = hrs > 12 ? hrs - 12 : hrs;
        hrs = hrs === 0 ? 12 : hrs;
        const secs = currentTime.getSeconds();

        // Handle the bells between hours
        if ((mins === 15 || mins === 30 || mins === 45) && secs === 0) {
            console.log(`Playing ${mins} minute bell`);
            playBells['minute' + mins]();
        }

        // Handle the bells on the hour
        else if (mins === 0 && secs === 0) {
            console.log(`Playing ${hrs} hour bell`);
            playBells['hour' + hrs]();
        }
    };

    // Format the digital time
    const formatTime = (currentTime) => {
        const newSeconds = currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds() : currentTime.getSeconds();
        const newMinutes = currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes();
        const newAmPm = currentTime.getHours() > 12 ? 'PM' : 'AM';
        let newTwelveHour = (isTwelveHour && currentTime.getHours() > 12) ? currentTime.getHours() - 12 : currentTime.getHours();
        newTwelveHour = newTwelveHour === 0 ? 12 : newTwelveHour;

        const newTime = {
            obj: currentTime,
            seconds: newSeconds,
            minutes: newMinutes,
            twelveHour: newTwelveHour,
            twentyFour: currentTime.getHours(),
            amPm: newAmPm
        };
        setTime(newTime);
    };

    // Rotate the clock hands
    const [degrees, setDegrees] = React.useState({
        seconds: 0,
        minutes: 0,
        hours: 0
    });

    const rotateHands = (currentTime) => {
        const newSecondRot = ((currentTime.getSeconds() / 60) * 360) + 90;
        const newMinuteRot = ((currentTime.getMinutes() / 60) * 360) + 90;
        const newHourRot = ((currentTime.getHours() / 12) * 360) + 90;

        setDegrees({
            seconds: newSecondRot,
            minutes: newMinuteRot,
            hours: newHourRot
        });
    };

    // The ticker //
    React.useEffect(() => {
        const interval = setInterval(() => {
            
            const currentTime = new Date();
            handleTick();
            rotateHands(currentTime);
            formatTime(currentTime);
            handleBells(currentTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [
        // Reset the interval when some settings change
        isSound, 
        isTicking, 
        volume, 
        showAnalog
    ]);

    return (
        <>
            {showDigital && (<div id="clock" className="clock">
                {isTwelveHour && <span className='hours'>{time.twelveHour}</span>}
                {!isTwelveHour && <span className='hours'>{time.twentyFour}</span>}
                <span className='divider'>:</span>
                <span className='minutes'>{time.minutes}</span>
                <span className='divider'>:</span>
                <span className='seconds'>{time.seconds}</span>
                <span className='ampm'>{time.amPm}</span>
            </div>)}
            {showAnalog && (<div className='analog-clock-container'>
                <div className={`analog-clock ${isPlaying && showAnimations ? 'playing' : ''}`}>
                    <div 
                        className='hour-hand'
                        style={{ transform: `rotate(${degrees.hours}deg)` }}
                    />
                    <div 
                        className='minute-hand'
                        style={{ transform: `rotate(${degrees.minutes}deg)` }}
                    />
                    <div 
                        className='second-hand'
                        style={{ transform: `rotate(${degrees.seconds}deg)` }}
                    />
                </div>
            </div>)}
        </>
    )
}

export default Clock