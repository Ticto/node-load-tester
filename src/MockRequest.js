import crypto from 'crypto';

function mockOtherServiceOrDb() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 50);
  })
}

async function start(delay = 1) {
  await mockOtherServiceOrDb();

  const now = new Date().getTime();
  let processing = true;
  let result = 0;
  while (processing) {
    result += Math.random() * Math.random();
    if (new Date().getTime() > now + delay) {
      processing = false;
    }
  }

  return;
}

export default {
  start,
}