import assistantMessagesRepo from '../repositories/assistantMessages.repo';
import AssistantMessage from '../models/dbentities/AssistantMessage';
import { MessageResponse } from '../models/messge/MessageResponse';
import { CognitiveEngineResponse } from '../models/CognitiveEngineResponse';

export default {
    saveResponse: (input: string, assistantResponse: CognitiveEngineResponse, userResponse: MessageResponse) => {
        const msg: AssistantMessage = new AssistantMessage();
        msg.conversationId = assistantResponse.context.conversationId;
        msg.date = new Date();
        msg.inputUsuario = input;
        msg.outputKeys = JSON.stringify(assistantResponse.output.text);
        msg.outputValues = JSON.stringify(userResponse.output.map(o => o.text));
        msg.studentId = assistantResponse.context.studentId;
        msg.mainEntity = assistantResponse.entities[0]?.name;
        msg.mainConfidence = assistantResponse.entities[0]?.confidence;
        assistantMessagesRepo.save(msg);
    }
}
