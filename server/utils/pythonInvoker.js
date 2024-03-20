import { spawn } from 'child_process';
import os from 'os';

const runPythonScript = (scriptPath, args = []) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn(os.platform() === 'win32' ? 'python' : 'python3', [scriptPath, ...args]);

        pythonProcess.stdout.on('data', (data) => {
            resolve(data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
};

export { runPythonScript };
