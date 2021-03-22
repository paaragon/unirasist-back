import { Exam } from '../models/actions/Exam';
import Student from '../models/dbentities/Student';
import examsRepo from '../repositories/schoolrepos/exams.repo';
import Action from './Action';

export default class GetExamsAction extends Action {
    public getName(): string {
        return 'GetExams';
    }

    protected validParamsImpl(context: any): boolean {
        return context
            && context.studentId;
    }

    protected async executeImpl(contextToFill: any) {
        const { studentId } = contextToFill;

        const nextExams: Exam[] = await examsRepo.getNextByStudentId(studentId);
        const prevExams: Exam[] = await examsRepo.getPrevByStudentId(studentId);

        contextToFill.nextExams = nextExams;
        contextToFill.prevExams = prevExams;
    }
}
