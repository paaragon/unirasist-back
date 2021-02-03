import Action from "../actions/Action";
import { WatsonService } from "./watson.service";
import { CognitiveEngineResponse } from "../models/CognitiveEngineResponse";
import GetStudentAction from "../actions/GetStudentAction";
import GetAlertsAction from "../actions/GetAlertsAction";

const actionsLimit = 10;
const actions: { [actionName: string]: Action } = {
    'GetStudent': new GetStudentAction(),
    'GetAlerts': new GetAlertsAction()
};

export default {
    handleResponseActions: async function (input: string, response: CognitiveEngineResponse): Promise<CognitiveEngineResponse> {
        return await handleActionsRecursively(input, response, 0);
    }
}

async function handleActionsRecursively(input: string, response: CognitiveEngineResponse, index: number): Promise<CognitiveEngineResponse> {
    if (!hasAction(response) || index > actionsLimit) {
        return response;
    }

    await executeActions(response);
    const watsonResponse: CognitiveEngineResponse = await WatsonService.sendMessage(input, response.context);

    return await handleActionsRecursively(input, watsonResponse, index + 1);
}


function hasAction(response: CognitiveEngineResponse): boolean {
    return response
        && response.actions
        && response.actions.length > 0
        && response.actions.some(action => actions[action.name]);
}

async function executeActions(response: CognitiveEngineResponse) {
    const actionsNames = response.actions.map(a => a.name);

    for (const actionName of actionsNames) {
        await executeAction(actionName, response);
    }
}

async function executeAction(actionName: string, response: CognitiveEngineResponse) {
    await actions[actionName].execute(response.context);
}
