import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('student')
export default class Student {
    @PrimaryColumn({ name: 'student_id' })
    id: number;

    @Column({ name: 'creation_date' })
    creationDate: Date;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'last_name' })
    last_name: string;

    @Column({ name: 'date_of_birth' })
    dateOfBirth: Date;
}
