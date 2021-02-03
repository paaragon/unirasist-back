import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('assistant_message')
export default class AssistantMessage {

    @PrimaryColumn({ name: 'conversation_id' })
    conversationId: string;

    @PrimaryColumn({ name: 'date' })
    date: Date;

    @Column({ name: 'student_id' })
    studentId: string;

    @Column({ name: 'input_usuario' })
    inputUsuario: string;

    @Column({ name: 'output_keys' })
    outputKeys: string;

    @Column({ name: 'output_values' })
    outputValues: string;

    @Column({ name: 'main_entity' })
    mainEntity: string;

    @Column({ name: 'main_confidence' })
    mainConfidence: number;
}
