import React, { useState, useEffect } from 'react';

function NewsPlayer() {
    const [audioFiles, setAudioFiles] = useState([]);

    useEffect(() => {
        // Fetch the audio file paths from the backend
        fetch('/api/news-audio')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setAudioFiles(data.audioFiles);
                }
            })
            .catch(error => console.error('Error fetching news audio:', error));
    }, []);

    const playAudioSequentially = async (audioFiles) => {
        for (const file of audioFiles) {
            await new Promise((resolve, reject) => {
                const audio = new Audio(file);
                audio.play();
                audio.onended = resolve;
                audio.onerror = reject;
            });
        }
    };

    return (
        <div>
            <button onClick={() => playAudioSequentially(audioFiles)}>Play News Audio</button>
        </div>
    );
}

export default NewsPlayer;
