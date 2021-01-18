import CpuLoader from "./CpuLoader.js";

function cpu(ctx) {
  try {
    const { loadFactor } = ctx.request.body;
    CpuLoader.start(loadFactor);
    ctx.status = 200;
  } catch(err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
  ctx.status = 200;
}

function stopCpu(ctx) {
  CpuLoader.stop();
  ctx.status = 200;
}

function memory(ctx) {
  ctx.status = 200;
}

function stopMemory(ctx) {
  ctx.status = 200;
}

export default function getRoutes(router) {
  router.put('/cpu/stop', stopCpu);
  router.put('/cpu', cpu);
  router.put('/memory/stop', stopMemory);
  router.put('/memory', memory);
}
