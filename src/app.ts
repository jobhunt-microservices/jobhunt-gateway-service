import { GatewayServer } from '@gateway/server';
import express, { Express } from 'express';

class Application {
  public initialize() {
    const app: Express = express();
    const server = new GatewayServer(app);
    server.start();
  }
}

const application = new Application();
application.initialize();
