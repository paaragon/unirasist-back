import { getRepository } from "typeorm";
import ResponseLiteral from '../models/dbentities/ResponseLiteral';

export default {
    async getLiteral(key: string): Promise<ResponseLiteral> {
        const literalRepo = getRepository(ResponseLiteral);

        return literalRepo.findOne(key);
    }
}
