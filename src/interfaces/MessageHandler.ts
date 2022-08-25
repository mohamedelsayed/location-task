import {MessageDecode} from './message-decode';

export interface MessageHandler{

    decode(message: Buffer): MessageDecode;
}
