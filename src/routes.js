import CpuLoader from "./CpuLoader.js";
import MemoryLoader from "./MemoryLoader.js";
import { metrics } from "./metrics.js";
import MockRequest from "./MockRequest.js";

import { hostname } from 'os';

function cpu(ctx) {
  try {
    const { cpuUsage, duration } = ctx.request.body;
    CpuLoader.start(cpuUsage, duration);
    ctx.status = 200;
  } catch (err) {
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
  try {
    const { memory, duration } = ctx.request.body;
    MemoryLoader.set(memory, duration);
    ctx.status = 200;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
  ctx.status = 200;
}

function stopMemory(ctx) {
  MemoryLoader.reset();
  ctx.status = 200;
}

async function mockRequest(ctx) {
  const { amount } = ctx.request.body;
  await MockRequest.start(amount);
  ctx.status = 200;
}

async function healthz(ctx) {
  ctx.status = 200;
}

async function about(ctx) {
  ctx.body = JSON.stringify({
    name: "node-load-tester",
    deployment_name: process.env.DEPLOYMENT_NAME,
    hostname: hostname(),
  })
  ctx.status = 200;
}

export default function getRoutes(router) {
  router.put('/cpu/stop', stopCpu);
  router.put('/cpu', cpu);
  router.put('/memory/stop', stopMemory);
  router.put('/memory', memory);
  router.put('/mockRequest', mockRequest);
  router.get('/metrics', metrics);
  router.get('/healthz', healthz);

  router.get('/about', about)
}
