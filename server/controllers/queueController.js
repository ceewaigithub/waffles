import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

// Create an event emitter for the queue
const queueEmitter = new EventEmitter();

// Create a queue with push method that emits an event
const queue = {
    tracks: [],
    push(track) {

        if (Array.isArray(track)) {
            this.tracks.push(...track);
        } else {
            this.tracks.push(track);
        }

        console.log(queue);
        queueEmitter.emit('update');
    },
    shift() {
        return this.tracks.shift();
    },
    get length() {
        return this.tracks.length;
    }
};

// Load tracks into the queue
const loadTracks = async (dir) => {
    let filenames = await fs.promises.readdir(dir);
    filenames = filenames.filter((filename) => path.extname(filename) === ".mp3");
    filenames.forEach(filename => queue.push(path.join(dir, filename)));
    console.log(`Loaded ${queue.length} tracks`);
};

// loadTracks('audio_files');

export { queue, queueEmitter };