import AssistantMessage from '../models/dbentities/AssistantMessage';
import { getRepository } from 'typeorm';

export default {
    async save(msg: AssistantMessage): Promise<void> {
        const repo = getRepository(AssistantMessage);

        await repo.save(msg);
    }
}
