import { Request, Response, NextFunction } from 'express';
import { accessLogger } from '../../lib/logger';

const log = accessLogger.child({ name: 'access-logger' });

export default function (req: Request, res: Response, next: NextFunction) {
    const reqDate: Date = new Date();

    const originalJsonfn = res.json.bind(res);

    res.json = function (arg: any): Response<any> {
        logResponse(req, res, reqDate);
        return originalJsonfn(arg);
    };

    next();
}

function logResponse(req: Request, res: Response, reqDate: Date) {
    const baseUrl: string = req.baseUrl;
    const url: string = req.url;
    const duration = new Date().getTime() - reqDate.getTime();
    const statusCode = res.statusCode;
    const accessLog = `${statusCode} ${baseUrl}${url} ${duration}ms`;
    log.info(accessLog);
}
