import { Message } from "./Message";

export interface MessageResponse {
    context: any;
    output: Message[];
}