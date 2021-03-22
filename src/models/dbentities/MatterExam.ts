import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('matter_exam')
export default class MatterExam {
    @PrimaryColumn({ name: 'id' })
    id: number;

    @Column({ name: 'matter_id' })
    matterId: number;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'date' })
    date: Date;

    @Column({ name: 'statement_url' })
    statementUrl: string;
}
