import Action from './Action';
import alertsMock from './mocks/alerts.mock';

interface Alert {
    id: number;
    severity: number,
    department: string,
    departmentHuman: string,
    type: string,
    title: string,
    link: string
};

interface AlertLvl1 {
    department: string;
    maxSeverity: number;
    count: number;
    types: {
        [name: string]: number // nombre y nº de ocurrencias
    };
}

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

        const alerts: Alert[] = alertsMock;

        const lvl1: {
            [department: string]: AlertLvl1
        } = {};
        for (const alert of alerts) {
            const department: AlertLvl1 = lvl1[alert.department] || {} as AlertLvl1;
            department.count = department.count ? department.count + 1 : 1;
            department.department = alert.departmentHuman;
            department.maxSeverity = !department.maxSeverity || alert.severity > department.maxSeverity ? alert.severity : department.maxSeverity;
            department.types = department.types || {} as { name: number };
            const depType = department.types[alert.type] || 0;
            department.types[alert.type] = depType + 1;

            lvl1[alert.department] = department;
        }

        contextToFill.alerts = {
            lvl1: Object.keys(lvl1).map(key => lvl1[key]),
            full: alerts,
        };
    }
}
