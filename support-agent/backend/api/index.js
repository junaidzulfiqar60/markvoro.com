// Vercel serverless entrypoint. Plain JS on purpose: it requires the
// already tsc-compiled dist/src output (see ../package.json's "build"
// script and vercel-build), because Vercel's function bundler (esbuild)
// does not support emitDecoratorMetadata — bundling NestJS's TypeScript
// source directly here would silently break its constructor-based DI.
require("reflect-metadata");
const { createApp } = require("../dist/src/create-app");

let appPromise;

module.exports = async (req, res) => {
  if (!appPromise) {
    appPromise = createApp().then(async (app) => {
      await app.init();
      return app;
    });
  }
  const app = await appPromise;
  const instance = app.getHttpAdapter().getInstance();
  instance(req, res);
};
