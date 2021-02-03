import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('matter')
export default class Matter {
    @PrimaryColumn({ name: 'matter_id' })
    id: number;

    @Column({ name: 'name' })
    name: number;

    @Column({ name: 'description' })
    text: string;
}
