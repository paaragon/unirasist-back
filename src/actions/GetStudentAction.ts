import Student from '../models/dbentities/Student';
import StudentRepo from '../repositories/schoolrepos/student.repo';
import Action from './Action';

export default class GetStudentAction extends Action {
    public getName(): string {
        return 'GetStudent';
    }

    protected validParamsImpl(context: any): boolean {
        return context
            && context.studentId;
    }

    protected async executeImpl(contextToFill: any) {
        const { studentId } = contextToFill;

        const student: Student = await StudentRepo.get(studentId);

        contextToFill.studentInfo = student;
    }
}
