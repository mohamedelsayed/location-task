import * as winston from 'winston';
import {Connection, Repository} from 'typeorm';
import {MessageDecode} from '../interfaces/message-decode';
import {Worker} from '../models/worker';
import {MessageHandler} from '../interfaces/MessageHandler';
import {WorkerLocation} from '../models/workers_location';
import {MessageSchema} from '../dtos/message-schema';

export class Messages implements MessageHandler {

	private _logger: winston.Logger;

	// private _connection: Promise<Connection>;

	private readonly _repositoryManager: Promise<Repository<WorkerLocation>>;

	/**
	 * constructor - set logger
	 */
	constructor(logger: winston.Logger, connection: Promise<Connection>) {
		this._logger = logger;
		// this._connection = connection;
		this._repositoryManager = connection.then((connection) => connection.getRepository(WorkerLocation));
		this._logger.info(this._repositoryManager);
	}

	/**
	 * decode - decode message
	 * @param message - message to decode
	 * @returns MessageDecode - decoded message
	 */
	decode(message: Buffer): MessageDecode {
		this._logger.info('Decoding message...');
		const decodedMessage = JSON.parse(message.toString()) as MessageDecode;
		decodedMessage.generated_at = parseInt(decodedMessage.generated_at.toString());
		// this._logger.info(decodedMessage);
		return decodedMessage;
	}

	/**
	 * validate - validate message object types
	 * @returns boolean - true if message is valid
	 */
	public validateTypes(message: MessageDecode): MessageDecode | null {
		this._logger.info('Validating message...');
		const validationResult = MessageSchema.validate(message);
		const {error} = validationResult;
		if (error) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			const errMsg = validationResult?.error?.details.map((i: { message: any; }) => i.message).join(',');
			this._logger.error(errMsg);
			return null;
		}
		return message;
	}

	/**
	 * validate - validate message references
	 * @param message - message to validate
	 * @returns Promise<Messages>
	 */
	public async validateRefrences(message: MessageDecode): Promise<MessageDecode | null> {
		this._logger.info('Validating message references...');
		const worker = await Worker.findOneBy({id: message.worker_id});
		if (!worker) {
			this._logger.error('Invalid worker_id');
			return null;
		}
		return message;
	}

	/**
	 * save - save message to database
	 * @param message - message to save
	 * @returns Promise<boolean>
	 */
	public async save(message: MessageDecode): Promise<boolean> {
		this._logger.info('Saving message...');
		const workerLocation = new WorkerLocation();
		workerLocation.worker_id = message.worker_id;
		const coordinates = `(${message.coordinates[0]},${message.coordinates[1]})`;
		workerLocation.coordinates = coordinates;
		workerLocation.is_active = message.is_active;
		workerLocation.duration = message.duration;
		workerLocation.generated_at = new Date(message.generated_at);
		const saved = await (await this._repositoryManager).save(workerLocation);
		if (saved) {
			this._logger.info('Message saved');
			return true;
		}
		this._logger.error('Message not saved');
		return false;
	}

}
