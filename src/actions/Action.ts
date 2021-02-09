import { logger } from "../lib/logger";

const log = logger.child({ name: 'Action.ts' });

export default abstract class Action {
    public async execute(context: any) {
        log.info(`Executing action ${this.getName()}`);

        if (!this.validParamsImpl(context)) {
            this.addError(context, 1, 'incorrect params');
        }

        await this.executeImpl(context);
    }

    public abstract getName(): string;

    protected abstract validParamsImpl(context: any): boolean;

    protected abstract executeImpl(contextToFill: any): Promise<any>;

    protected addError(context: any, errorCode: number, errorMsg: string): void {
        const errorCodeKey = this.getName() + 'ErrorCode';
        const errorMsgKey = this.getName() + 'ErrorMsg';

        context[errorCodeKey] = errorCode;
        context[errorMsgKey] = errorMsg;
    }
}
