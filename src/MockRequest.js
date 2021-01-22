import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

function mockOtherServiceOrDb() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 50);
  })
}

async function start(amount = 1) {
  await mockOtherServiceOrDb();

  const uuid = uuidv4();
  for(let i = 0; i < amount; i++) {
    crypto.createHash('sha256').update(uuid).digest();
  }

  return;
}

export default {
  start,
}