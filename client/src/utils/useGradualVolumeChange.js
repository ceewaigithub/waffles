import { useEffect, useRef } from 'react';

const useGradualVolumeChange = (audioRef, targetVolume, duration) => {
    const intervalRef = useRef();

    useEffect(() => {
        const startVolume = audioRef.current.volume;
        const volumeChange = targetVolume - startVolume;
        const steps = duration / 100;
        const stepChange = volumeChange / steps;
        let currentStep = 0;

        intervalRef.current = setInterval(() => {
            if (currentStep < steps) {
                audioRef.current.volume += stepChange;
                currentStep += 1;
            } else {
                clearInterval(intervalRef.current);
            }
        }, 100);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [audioRef, targetVolume, duration]);
};

export default useGradualVolumeChange;