import { runPythonScript } from '../utils/pythonInvoker.js';

export async function getNewsData(req, res) {
    try {
        const location = req.query.location;
        const newsData = await runPythonScript('modules/news_reader.py', [location]);
        const audioFilePaths = JSON.parse(newsData);
        res.json({ success: true, audioFiles: audioFilePaths });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to fetch the news', error });
    }
}
