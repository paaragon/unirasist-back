import StudentAlert from '../models/dbentities/StudentAlert';
import studentalertRepo from '../repositories/schoolrepos/studentalert.repo';
import Action from './Action';

export default class GetAlertsAction extends Action {
    public getName(): string {
        return 'GetAlerts';
    }

    protected validParamsImpl(context: any): boolean {
        return context
            && context.studentId;
    }

    protected async executeImpl(contextToFill: any) {
        const { studentId } = contextToFill;

        const alerts: StudentAlert[] = await studentalertRepo.getNonReaded(studentId);

        contextToFill.alerts = alerts;
    }
}
