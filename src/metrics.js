import { collectDefaultMetrics, register, Gauge } from 'prom-client';

collectDefaultMetrics();

let oscValue = 0;

new Gauge({
  name: 'oscillating_gauge',
  help: 'This gauge oscillates from 0 to 10',
  async collect() {
    oscValue = (oscValue + 1) % 11;
    this.set(oscValue);
  }
});

new Gauge({
  name: 'random_gauge',
  help: 'This gauge is a random number between 0 and 100',
  async collect() {
    this.set(Math.floor(Math.random() * 100));
  }
})

export async function metrics(ctx) {
  ctx.body = await register.metrics();
  ctx.status = 200
}