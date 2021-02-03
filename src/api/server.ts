import config from 'config';
import { ConfigApiI } from '../models/config/ConfigApiI';
import messageRoutes from './routes/messages.routes';
import errorHandler from './mdw/errorHandler';
import requestUuid from './mdw/requestUuid';
import express from 'express';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';
import cors from 'cors';
import accessLogger from './mdw/accessLogger';
import { logger } from '../lib/logger';

export default class Server {
    private app: express.Application;

    constructor(
        public port: number,
    ) {
        this.app = express();
        this.app.use(cors({ origin: '*' }));
        this.app.use(bodyParser.json());
        this.app.use(httpContext.middleware);
        this.app.use(requestUuid);
        this.app.use(accessLogger);
        this.initRoutes();
        this.app.use(errorHandler);
    }

    private initRoutes() {
        this.app.use(`/api/v${config.get<ConfigApiI>('api').version}/messages`, messageRoutes);
    }

    start() {
        this.app.listen(this.port, () => {
            logger.info(`App is listening on port ${this.port}`);
        });
    }
}
