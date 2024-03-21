import React, { useEffect, useRef, useState, useContext } from 'react';
import io from 'socket.io-client';
import CustomAudioContext from './CustomAudioContext';

function AudioPlayer() {
    const audioRef = useRef();
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    const { setIsPlaying } = useContext(CustomAudioContext);

    const handlePlay = () => {

        if (isConnected) {
            // Request the server to play the next track
            socket.emit('play');
        }
    };

    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = io('http://localhost:3000'); // Replace with your server URL

        socket.on('connect', () => {
            console.log('Socket.IO connection opened');
            setSocket(socket);
            setIsConnected(true);
        });

        // Listen for the 'stream' event from the server
        socket.on('stream', (url) => {
            console.log('Received URL from server:', url);
            audioRef.current.src = url;
            audioRef.current.play();
        });

        socket.on('disconnect', () => {
            console.log('Socket.IO connection closed');
            setIsConnected(false);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            // Listen for the 'ended' event from the audio element
            const handleAudioEnded = () => {
                if (isConnected) {
                    // Request the server to play the next track
                    console.log('Requesting next track from server')
                    socket.emit('play');
                }
            };

            audioRef.current.addEventListener('ended', () => {
                handleAudioEnded();
                setIsPlaying(false);
            });

            audioRef.current.addEventListener('play', () => setIsPlaying(true));
            
            return () => {
                audioRef.current.removeEventListener('ended', handleAudioEnded);
                audioRef.current.removeEventListener('play', () => setIsPlaying(true));
            };
        }
    }, [isConnected, setIsPlaying, socket]);


    return (
        <div>
            <audio ref={audioRef}/>;
            <button onClick={handlePlay} disabled={!isConnected}>Play from Server</button>
        </div>
    );


}

export default AudioPlayer;