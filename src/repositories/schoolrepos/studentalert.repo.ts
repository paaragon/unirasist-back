import { getRepository, In } from 'typeorm';
import StudentAlert from '../../models/dbentities/StudentAlert';

export default {
    async getNonReaded(studentId: number): Promise<StudentAlert[]> {
        const repo = getRepository(StudentAlert);

        return repo.find({
            where: {
                readed: false,
                studentId
            },
            order: {
                departmentHuman: 'ASC'
            }
        });
    },

    async markAsRead(alertsReadedIds: number[]): Promise<void> {
        const repo = getRepository(StudentAlert);

        await repo.update({
            id: In(alertsReadedIds)
        }, {
            readed: true
        },);
    }
}