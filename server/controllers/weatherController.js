import { runPythonScript } from '../utils/pythonInvoker.js';
import { queue } from './queueController.js';

export async function getWeather(req, res) {
    try {

        console.log('Fetching Realtime Weather data');

        const location = req.query.location;
        const action = req.query.action;
        const timesteps = req.query.timesteps || '';

        const weatherData = await runPythonScript('modules/weather_reader.py', [location, action, timesteps]);

        // const audioFilePaths = JSON.parse(weatherData);
        // queue.push(audioFilePaths, 2);
        res.json({ success: true, weatherData: weatherData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to fetch reatime weather', error });
    }
}

