import { get } from 'config';
import { getRepository } from 'typeorm';
import Student from '../../models/dbentities/Student';

export default {
    async get(id: number): Promise<Student> {
        const repo = getRepository(Student);

        return repo.findOne(id);
    }
}