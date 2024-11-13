import { SERVICE_NAME } from '@gateway/constants';
import { logger } from '@gateway/utils/logger.util';
import { CustomError, IErrorResponse } from '@jobhunt-microservices/jobhunt-shared';
import compression from 'compression';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import { StatusCodes } from 'http-status-codes';

const SERVER_PORT = 4000;

const log = logger('gatewayServer', 'debug');

export class GatewayServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware();
    this.standardMiddleware();
    this.routesMiddleware();
    this.connectElasticSearch();
    this.errorHandler();
    this.startServer();
  }

  private securityMiddleware(): void {
    this.app.set('trust proxy', 1);
    this.app.use(
      cookieSession({
        name: 'session',
        keys: [],
        maxAge: 24 * 7 * 3600 * 1000,
        secure: false
      })
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: '',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private standardMiddleware(): void {
    this.app.use(compression());
    this.app.use(json({ limit: '200mb' }));
    this.app.use(urlencoded({ extended: true, limit: '200mb' }));
  }

  private routesMiddleware(): void {}

  private connectElasticSearch(): void {}

  private errorHandler(): void {
    this.app.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      log.log('error', `${fullUrl} endpoint does not exist.`, '');
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'The endpoint called does not exist'
      });
      next();
    });

    this.app.use((error: IErrorResponse, _: Request, res: Response, next: NextFunction) => {
      log.log('error', SERVICE_NAME + ` ${error.comingFrom}:`, error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeError());
      }
      next();
    });
  }

  private async startServer(): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(this.app);
      this.startHttpServer(httpServer);
      log.info(SERVICE_NAME + ` has started with process id ${process.pid}`);
    } catch (error) {
      log.log('error', SERVICE_NAME + ` startHttpServer() method:`, error);
    }
  }

  private async startHttpServer(httpServer: http.Server): Promise<void> {
    try {
      httpServer.listen(SERVER_PORT, () => {
        log.info(SERVICE_NAME + ` has started on port ${SERVER_PORT}`);
      });
    } catch (error) {
      log.log('error', SERVICE_NAME + ` startHttpServer() method:`, error);
    }
  }
}
