require('dotenv').config();
import Server from './api/server';
import config from 'config';
import { ConfigApiI } from './models/config/ConfigApiI';
import { createConnection } from "typeorm";
import { logger } from './lib/logger';

const log = logger.child({ name: 'app.ts' });
log.info('Starting app...');

(async () => {
    try {
        const connection = await createConnection();

        const port = config.get<ConfigApiI>('api').port;
        const server = new Server(port);
        server.start();
    } catch (e) {
        log.error(e);
        process.exit(1);
    }
})();
