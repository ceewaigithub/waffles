import { runPythonScript } from '../utils/pythonInvoker.js';

export async function getWeatherData(req, res) {
    try {
        const location = req.query.location;
        const weatherData = await runPythonScript('./modules/weather_reader.py', [location]);
        res.json({ success: true, data: weatherData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch weather data', error });
    }
}
