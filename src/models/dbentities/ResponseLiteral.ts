import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('response_literal')
export default class ResponseLiteral {
    @PrimaryColumn({ name: 'key' })
    key: string;

    @Column({ name: 'value' })
    value: string;

    @Column({ name: 'type' })
    type: string;
}
