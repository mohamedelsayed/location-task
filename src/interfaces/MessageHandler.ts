import {MessageDecode} from './message-decode';

export interface MessageHandler{

    decode(message: Buffer): MessageDecode;
	validateTypes(message: MessageDecode): MessageDecode | null;
	validateRefrences(message: MessageDecode): Promise<MessageDecode | null>;
	save(message: MessageDecode): Promise<boolean>;

}
