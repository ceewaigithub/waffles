import { spawn } from 'child_process';

const runPythonScript = (scriptPath, args = []) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [scriptPath, ...args]);

        pythonProcess.stdout.on('data', (data) => {
            resolve(data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
};

export default { runPythonScript };
