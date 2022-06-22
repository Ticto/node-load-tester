import { collectDefaultMetrics, register } from 'prom-client';
collectDefaultMetrics();

export async function metrics(ctx) {
  ctx.body = await register.metrics();
  ctx.status = 200
}