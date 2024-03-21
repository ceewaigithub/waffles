import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import { getNewsData } from './controllers/newsReaderController.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { queue, queueEmitter } from './controllers/queueController.js';
import { getWeather } from './controllers/weatherController.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 8000;
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(cors());

// For URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use('/audio_files', express.static(path.join(__dirname, 'audio_files')));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.post('/api/data', (req, res) => {
    // Access the data sent from the client
    const clientData = req.body.data;
    console.log('Data received from the client:', clientData);

    // Process the data as needed here
    // For example, save to database, perform calculations, etc.

    // Send a response back to the client
    res.json({ message: 'Good morning. Data received successfully', yourData: clientData });
});

// app.get('/api/news', (req, res) => {
//     const pythonProcess = spawn('python', ['modules/news_reader.py', 'args']);

//     pythonProcess.stdout.on('data', (data) => {
//         // Assuming the Python script returns a JSON array of file paths
//         const audioFiles = JSON.parse(data);
//         res.json({ success: true, audioFiles });
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//         res.status(500).json({ success: false, message: 'Error generating news audio' });
//     });
// });

app.get('/api/news', getNewsData);
app.get('/api/weather', getWeather);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).send('404 Page Not Found');
});

io.on('connection', (socket) => {

    console.log('Client Connected');

    // Stream the next track in the queue
    const streamTrack = (track) => {
        console.log('Streaming track:', track);
        socket.emit('stream', `/audio_files/${path.basename(track)}`);
    };

    // Listen for a request to play the next track
    socket.on('play', () => {
        if (queue.length > 0) {
            const nextTrack = queue.shift();
            streamTrack(nextTrack);
        } else {

            console.log('Queue is empty. Waiting for updates');

            // Listen for the queue update event
            queueEmitter.once('update', () => {
                const nextTrack = queue.shift();
                streamTrack(nextTrack);
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(8000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
