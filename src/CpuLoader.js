/*
  This code is based on https://gist.github.com/tkrueger/3500612.
  And edited for my own use case.
*/
import { request } from 'http';
import os from 'os';

// Default duration is 1 minute.
const DEFAULT_DURATION = 60;

// Default load is 50% CPU usage.
const DEFAULT_LOAD_FACTOR = 0.5;

let durationTimeoutId = null;
let running = false;

function blockCpu(loadFactor) {
  const now = new Date().getTime();
  let processing = true;
  let result = 0;

  while (processing) {
    result += Math.random() * Math.random();
    if (new Date().getTime() > now + 1000 * loadFactor) {
      processing = false;
    }
  }

  if (running) {
    setTimeout(() => {
      blockCpu(loadFactor);
    }, 1000 * (1 - loadFactor));
  }
}

function stop() {
  console.log(`Reset CPU usage`);
  if (durationTimeoutId) {
    clearTimeout(durationTimeoutId);
    durationTimeoutId = null;
  }
  running = false;
}

function start(loadFactor = DEFAULT_LOAD_FACTOR, duration = DEFAULT_DURATION) {
  if (running) {
    const cpuError = new Error('CPU loader is already running.');
    cpuError.status = 400;
    throw cpuError;
  }
  running = true;
  if (loadFactor <= 0 || loadFactor >= 1) {
    loadFactor = DEFAULT_LOAD_FACTOR;
  }
  if (duration <= 0) {
    duration = DEFAULT_DURATION;
  }
  console.log(`Set CPU usage: ${loadFactor * 100}%`);
  blockCpu(loadFactor);

  durationTimeoutId = setTimeout(() => {
    stop();
  }, duration * 1000);
}

export default {
  start,
  stop,
};
