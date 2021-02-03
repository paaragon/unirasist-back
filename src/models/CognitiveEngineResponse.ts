export interface CognitiveEngineResponse {
    context: CognitiveContext;
    output: CognitiveOutput;
    actions: CognitiveAction[];
    intents: CognitiveIntent[];
    entities: CognitiveEntity[];
}

export interface CognitiveContext {
    conversationId: string;
    [key: string]: any;
}

export interface CognitiveOutput {
    text: string[]
}

export interface CognitiveAction {
    name: string;
    params: any;
}

export interface CognitiveIntent {
    name: string;
    confidence: number;
}

export interface CognitiveEntity {
    name: string;
    confidence: number;
}