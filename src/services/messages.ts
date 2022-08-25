import * as winston from 'winston';
import isValidCoords from 'is-valid-coords';
import {Connection, Repository} from 'typeorm';
import {MessageDecode} from '../interfaces/message-decode';
import {Worker} from '../models/worker';
import {MessageHandler} from '../interfaces/MessageHandler';
import {WorkerLocation} from '../models/workers_location';

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
		// this._logger.info(decodedMessage);
		return decodedMessage;
	}

	/**
	 * validate - validate message object types
	 * @returns boolean - true if message is valid
	 */
	public validateTypes(message: MessageDecode): MessageDecode | null {
		this._logger.info('Validating message...');
		const lon = message.coordinates[0];
		const lat = message.coordinates[1];
		// message.generated_at = message.generated_at;
		const isValidLatLon = isValidCoords(lat, lon);
		if (!isValidLatLon) {
			this._logger.error('Invalid coordinates');
			return null;
		}
		if (typeof message.is_active !== 'boolean') {
			this._logger.error('Invalid is_active');
			return null;
		}
		if (typeof message.duration !== 'number') {
			this._logger.error('Invalid duration');
			return null;
		}
		message.generated_at = parseInt(message.generated_at.toString());
		const checkDate = new Date(message.generated_at);
		if (checkDate.toString() === 'Invalid Date') {
			this._logger.error('Invalid generated_at');
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
	 * @returns Promise<any>
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
