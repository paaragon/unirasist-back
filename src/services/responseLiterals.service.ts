import ejs from 'ejs';
import { Message } from '../models/messge/Message';
import responseLiteralsRepo from '../repositories/responseLiterals.repo';

export default {
    getResponse: async function (outputs: string[], context: any): Promise<Message[]> {
        const ret: { text: string, level: string }[] = [];
        if (!outputs) {
            return ret;
        }

        for (const output of outputs) {
            const template = await responseLiteralsRepo.getLiteral(output);
            if (!template) {
                ret.push({ text: output, level: 'default' });
            } else {
                const render: string = renderJsonPath(template.value, context);
                ret.push({ text: render, level: template.type });
            }
        }

        return ret;
    }
}

function renderJsonPath(template: string, vars: any): string {
    return ejs.render(template, vars)
}