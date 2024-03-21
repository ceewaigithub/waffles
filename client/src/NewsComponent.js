import React, { useEffect, useState } from 'react';

function NewsComponent() {
    const [audioFiles, setAudioFiles] = useState([]);

    // useEffect(() => {
    //     // Fetch the audio files when the component mounts
    //     fetch('/api/news')
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.success) {
    //                 setAudioFiles(data.audioFiles);
    //                 // Optionally, play the first news item or handle this in another function
    //                 // if (data.audioFiles.length > 0 && isValidURL(data.audioFiles[0])) {
    //                 //   const audio = new Audio(data.audioFiles[0]);
    //                 //   audio.play();
    //                 // }
    //                 console.log("audio loaded");
    //             }
    //         })
    //         .catch(error => console.error('Failed to fetch news audio:', error));
    // }, []); // Empty array means this effect runs once on mount

    const fetchNews = () => {
        // Fetch the audio files when the component mounts
        fetch('/api/news')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setAudioFiles(data.audioFiles);
                    // Optionally, play the first news item or handle this in another function
                    // if (data.audioFiles.length > 0 && isValidURL(data.audioFiles[0])) {
                    //   const audio = new Audio(data.audioFiles[0]);
                    //   audio.play();
                    // }
                    console.log("audio loaded");
                }
            })
            .catch(error => console.error('Failed to fetch news audio:', error));
    }

    const handlePlay = () => {
        if (audioFiles.length > 0 && isValidURL(audioFiles[0])) {
            const audio = new Audio(audioFiles[0]);
            audio.play();
        }
    };

    const isValidURL = () => {
        const audio = new Audio();
        return audio.canPlayType('audio/mpeg') !== '';
    };

    return (

        <div>
            <button onClick={fetchNews}>Fetch News</button>
        </div>
    );
}

export default NewsComponent;
