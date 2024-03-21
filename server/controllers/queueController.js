import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

// Create an event emitter for the queue
const queueEmitter = new EventEmitter();

// Create a priority queue with push method that emits an event
// Traffic (9) > News (2) > Weather (1) > Music (0)
const queue = {
    tracks: [],
    push(track, priority = 0) {
        if (Array.isArray(track)) {
            track.forEach(t => this.tracks.push({ track: t, priority }));
        } else {
            this.tracks.push({ track, priority });
        }

        // Sort the tracks by priority
        this.tracks.sort((a, b) => a.priority - b.priority);

        console.log(queue);
        queueEmitter.emit('update');
    },
    shift() {
        // Return the track with the highest priority
        return this.tracks.pop()?.track;
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