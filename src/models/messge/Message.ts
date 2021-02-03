export interface Message {
    text: string;
    level: 'default' | 'info' | 'warning' | 'error'| string;
}