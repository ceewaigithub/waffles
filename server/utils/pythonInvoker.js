import { spawn } from 'child_process';

const runPythonScript = (scriptPath, args = []) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [scriptPath, ...args]);

        pythonProcess.stdout.on('data', (data) => {
            resolve(data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
};

export { runPythonScript };
