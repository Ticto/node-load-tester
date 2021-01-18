import koa from 'koa';
import koaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';

import getRoutes from './src/routes.js';

const app = new koa();
const router = new koaRouter();
const PORT = 8000;

app.use(bodyParser());

getRoutes(router);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});