import moment from 'moment';
import httpContext from 'express-http-context';
import winston from 'winston';
import 'winston-daily-rotate-file';

const { printf } = winston.format;
const tsFormat = () => moment.utc().format('YYYY-MM-DD hh:mm:ssZ').trim();

const logFolder = process.env.LOG_FOLDER_PATH || './logs';

const myFormat = printf((arg: any) => {
    let str = `${tsFormat()} `;
    if (arg.name) {
        str += `[${arg.name}] `;
    }
    if (httpContext.get('uuid')) {
        str += `[${httpContext.get('uuid')}] `;
    }
    str += `${arg.message}`;

    return str;
});

const dailyTransport = new winston.transports.DailyRotateFile({
    filename: `${logFolder}/application-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const accessDailyTransport = new winston.transports.DailyRotateFile({
    filename: `${logFolder}/application-%DATE%.access.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const consoleTransport = new winston.transports.Console()

const logger = winston.createLogger({
    format: myFormat,
    transports: [
        consoleTransport,
        dailyTransport,
    ]
});

const accessLogger = winston.createLogger({
    format: myFormat,
    transports: [
        consoleTransport,
        accessDailyTransport,
    ]
});

export { logger, accessLogger };
