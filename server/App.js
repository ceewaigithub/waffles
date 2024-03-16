import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import spawn from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.post('/api/data', (req, res) => {
    // Access the data sent from the client
    const clientData = req.body.data;
    console.log('Data received from the client:', clientData);

    // Process the data as needed here
    // For example, save to database, perform calculations, etc.

    // Send a response back to the client
    res.json({ message: 'Good morning. Data received successfully', yourData: clientData });
});

app.get('/api/news-audio', (req, res) => {
    const pythonProcess = spawn('python', ['modules/news_reader.py', 'args']);
    
    pythonProcess.stdout.on('data', (data) => {
        // Assuming the Python script returns a JSON array of file paths
        const audioFiles = JSON.parse(data);
        res.json({ success: true, audioFiles });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).json({ success: false, message: 'Error generating news audio' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
