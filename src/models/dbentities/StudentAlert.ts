import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('student_alert')
export default class StudentAlert {
    @PrimaryColumn({ name: 'id' })
    id: number;

    @Column({ name: 'date' })
    creationDate: Date;

    @Column({ name: 'student_id' })
    studentId: number;

    @Column({ name: 'severity' })
    severity: number;

    @Column({ name: 'department' })
    department: string;

    @Column({ name: 'department_human' })
    departmentHuman: string;

    @Column({ name: 'type' })
    type: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'link' })
    link: string;

    @Column({ name: 'readed' })
    readed: boolean;
}
