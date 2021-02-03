const AssistantV2 = require('ibm-watson/assistant/v2');
import { MessageResponse, Response, DialogNodeAction, RuntimeIntent, RuntimeEntity, RuntimeResponseGeneric, SessionResponse, MessageContext } from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth';
import { logger } from '../lib/logger';
import { CognitiveEngineResponse, CognitiveAction, CognitiveIntent, CognitiveEntity, CognitiveOutput, CognitiveContext } from '../models/CognitiveEngineResponse';

const log = logger.child({ name: 'app.ts' });

const assistant = new AssistantV2({
    version: process.env.WATSON_ASSISTANT_VERSION,
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_ASSISTANT_APIKEY,
    }),
    serviceUrl: process.env.WATSON_ASSISTANT_URL,
});

export class WatsonService {

    static async sendMessage(input: string, context: any): Promise<CognitiveEngineResponse> {
        if (!context || !context.sessionId) {
            const sessionId: string = await WatsonService.createSession();
            context = context || {};
            context.sessionId = sessionId;
        }

        const watsonContext = WatsonService.createWatsonContext(context);

        try {
            const response = await assistant.message({
                sessionId: context.sessionId,
                assistantId: process.env.WATSON_ASSISTANT_ASSISTANT_ID,
                context: watsonContext,
                input: { message_type: 'text', text: WatsonService.cleanInput(input), options: { return_context: true, debug: true } },
            });
            console.log('==== RESPUESTA =====>');
            console.log(JSON.stringify(response.result.output.debug.nodes_visited, null, 2));
            const parsedResponse = WatsonService.parseResponse(response);
            return parsedResponse;
        } catch (e) {
            log.error(e.message);
            log.error(e.stack);
            return null;
        }
    }

    private static createWatsonContext(context: CognitiveContext) {
        return {
            global: {
                session_id: context.sessionId
            },
            skills: {
                'main skill': {
                    user_defined: {
                        ...context
                    }
                }
            }
        }
    }

    private static cleanInput(input: string): string {
        return input
            .replace(/á/g, 'a')
            .replace(/é/g, 'e')
            .replace(/í/g, 'i')
            .replace(/ó/g, 'o')
            .replace(/ú/g, 'u')
            .toLowerCase();
    }

    private static async createSession() {
        const session: Response<SessionResponse> = await assistant.createSession({
            assistantId: process.env.WATSON_ASSISTANT_ASSISTANT_ID
        });

        return session.result.session_id;
    }

    private static parseResponse(response: Response<MessageResponse>): CognitiveEngineResponse {
        return {
            context: WatsonService.parseContext(response.result.context),
            output: WatsonService.parseOutput(response.result.output?.generic),
            actions: WatsonService.parseActions(response.result.output?.user_defined?.actions),
            intents: WatsonService.parseIntents(response.result.output?.intents),
            entities: WatsonService.parseEntitites(response.result.output?.entities)
        }
    }

    private static parseContext(context: MessageContext): CognitiveContext {

        return {
            conversationId: context?.global.session_id,
            sessionId: context?.global.session_id,
            ...context?.skills?.['main skill'].user_defined
        }
    }

    private static parseActions(actions: DialogNodeAction[]): CognitiveAction[] {
        if (!actions) {
            return [];
        }

        return actions.map((a: DialogNodeAction): CognitiveAction => ({
            name: a.name,
            params: a.parameters
        }));
    }

    private static parseIntents(intents: RuntimeIntent[]): CognitiveIntent[] {
        if (!intents) {
            return [];
        }

        return intents.map((i: RuntimeIntent): CognitiveIntent => ({
            name: i.intent,
            confidence: i.confidence
        }));
    }

    private static parseEntitites(entities: RuntimeEntity[]): CognitiveEntity[] {
        if (!entities) {
            return [];
        }

        return entities.map((e: RuntimeEntity): CognitiveEntity => ({
            name: e.entity,
            confidence: e.confidence
        }));
    }

    private static parseOutput(output: RuntimeResponseGeneric[]): CognitiveOutput {
        if (!output) {
            return { text: [] };
        }
        let ret: string[] = [];
        for (const out of output) {
            const literalsIds = (out as { text: string }).text.split('\n');
            ret = ret.concat(literalsIds);
        }
        return {
            text: ret
        };
    }
}
