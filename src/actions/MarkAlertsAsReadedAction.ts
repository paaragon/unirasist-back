import studentalertRepo from '../repositories/schoolrepos/studentalert.repo';
import Action from './Action';

export default class GetAlertsAction extends Action {
    public getName(): string {
        return 'MarkAlertsAsReaded';
    }

    protected validParamsImpl(context: any): boolean {
        return context
            && context.studentId;
    }

    protected async executeImpl(contextToFill: any) {
        const { alertsToRead } = contextToFill;

        if (!alertsToRead || alertsToRead.length === 0) {
            return;
        }

        await studentalertRepo.markAsRead(alertsToRead);
    }
}
