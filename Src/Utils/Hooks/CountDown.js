
import { useState, useEffect, useCallback } from 'react';

const useCountdownTimer = (initialMinutes, initialSeconds, onComplete) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (isFinished) return;

        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prevSeconds) => prevSeconds - 1);
            } else if (minutes > 0) {
                setMinutes((prevMinutes) => prevMinutes - 1);
                setSeconds(59);
            } else {
                clearInterval(interval);
                setIsFinished(true);
                if (onComplete) onComplete(); // Call the callback when the timer completes
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [minutes, seconds, isFinished, onComplete]);

    const reset = useCallback((newMinutes = initialMinutes, newSeconds = initialSeconds) => {
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        setIsFinished(false);
    }, [initialMinutes, initialSeconds]);

    return { minutes, seconds, isFinished, reset };
};

export default useCountdownTimer;