import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('student_matter')
export default class StudentMatter {
    @PrimaryColumn({ name: 'student_id' })
    id: number;

    @Column({ name: 'student_id' })
    studentId: number;

    @Column({ name: 'matter_id' })
    matterId: string;
}
