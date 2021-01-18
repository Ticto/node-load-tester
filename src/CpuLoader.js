import { request } from 'http';
import os from 'os';

const DEFAULT_LOAD_FACTOR = 0.5;

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

function start(loadFactor = DEFAULT_LOAD_FACTOR) {
  if (running) {
    const cpuError = new Error('CPU loader is already running.');
    cpuError.status = 400;
    throw cpuError;
  }
  running = true;
  if (loadFactor <= 0 || loadFactor >= 1) {
    loadFactor = DEFAULT_LOAD_FACTOR;
  }
  blockCpu(loadFactor);
}

function stop() {
  running = false;
}

export default {
  start,
  stop,
};
