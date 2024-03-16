import { runPythonScript } from '../utils/pythonInvoker';

export async function getTrafficData(req, res) {
  try {
    const location = req.query.location;
    const trafficData = await runPythonScript('./modules/traffic_monitor.py', [location]);
    res.json({ success: true, data: trafficData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch traffic data', error });
  }
}
