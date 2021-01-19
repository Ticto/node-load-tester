/*
  This code is based on https://github.com/Data-Wrangling-with-JavaScript/nodejs-memory-test/blob/master/index.js
  And edited for my own use case.
*/

// Default size is 256MB.
const DEFAULT_SIZE_TO_ASSIGN = 256;

// The allocation step is 1MB represented in bytes.
const CHUNK_SIZE = 1 * 1024 * 1024;

let running = false;
let sizeToAssignInBytes = 0;
let usedMemory = [];

function alloc(sizeBytes) {
  const numbers = sizeBytes / 8;
  const arr = []
  arr.length = numbers; // Simulate allocation of 'size' bytes.
  for (let i = 0; i < numbers; i++) {
      arr[i] = i;
  }
  return arr;
};

function allocateMemoryInChunks() {
  // Allocate memory.
  const generatedMemory = alloc(CHUNK_SIZE);

  // Allocate and keep a reference so the allocated memory isn't garbage collected.
  usedMemory.push(generatedMemory);

  // Check how much memory is now allocated.
  const mu = process.memoryUsage();
  const currentUsageInBytes = mu['heapUsed'];
  const currentUsageInMegaBytes = currentUsageInBytes / 1024 / 1024;

  if (currentUsageInBytes < sizeToAssignInBytes) {
    setTimeout(() => {
      allocateMemoryInChunks();
    });
  } else {
    console.log(`Set memory usage: ${Math.round(currentUsageInMegaBytes * 100) / 100} MB`);
  }
}

function reset() {
  running = false;
  usedMemory = [];

  setTimeout(() => {
    // Check how much memory is now allocated.
    const mu = process.memoryUsage();
    const currentUsageInMegaBytes = mu['heapUsed'] / 1024 / 1024;
    console.log(`Reset memory usage: ${Math.round(currentUsageInMegaBytes * 100) / 100} MB`);
  }, 5000); // Wait some amount of time for garbage collection.
}

function set(sizeMB = DEFAULT_SIZE_TO_ASSIGN) {
  if (running) {
    const memError = new Error('Memory loader is currently running, reset first before applying a new load.');
    memError.status = 400;
    throw memError;
  }

  sizeToAssignInBytes = sizeMB * 1024 * 1024;
  const mu = process.memoryUsage();
  const currentUsageInBytes = mu['heapUsed'];

  if (currentUsageInBytes > sizeToAssignInBytes) {
    const memError = new Error('The load you provided is too small.');
    memError.status = 400;
    throw memError;
  }

  running = true;

  // Start a non-blocking loop.
  setTimeout(allocateMemoryInChunks);
};

export default {
  set,
  reset,
}