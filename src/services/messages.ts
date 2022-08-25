import * as winston from 'winston';
import isValidCoords from 'is-valid-coords';
import {MessageDecode} from '../interfaces/message-decode';
// import {getManager} from 'typeorm';
import {Worker} from '../models/worker';
import {MessageHandler} from '../interfaces/MessageHandler';
// import {isValidCoordinates} from "is-valid-coordinates";
// import { Connection } from "typeorm";
// import { createDBConnection } from "../helpers/db";
// const isValidCoordinates = require("is-valid-coordinates");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore - ignore the unused variable error
// let dbConnection: Promise<Connection>;

export class Messages implements MessageHandler {

	private _logger: winston.Logger;

	/**
	 * constructor - set logger
	 */
	constructor(logger: winston.Logger) {
		this._logger = logger;
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
	// public async save(message: MessageDecode): Promise<boolean> {
	// 	this._logger.info('Saving message...');
	// 	// const repository = connection.getRepository(WorkerLocation);
	// 	// let coordinates: Point = {
	// 	// 	type: "Point",
	// 	// 	coordinates: [message.coordinates[0], message.coordinates[1]],
	// 	// };
	// 	const coordinates = `Point(${message.coordinates[0]},${message.coordinates[1]})`;
	// 	message.coordinates = coordinates;
	// 	try {
	// 		const entityManager = getManager();
	// 		entityManager.query(`INSERT INTO workers_locations(
	// worker_id, coordinates, is_active, duration, generated_at)
	// 		 VALUES (${this.message.worker_id} , ${this.message.coordinates},
	// 			${this.message.is_active}, ${this.message.duration},
	// 			 to_timestamp(${this.message.generated_at}/1000));`);
	// 		console.log('Message saved');
	// 		return true;
	// 	} catch (err) {
	// 		console.log(err);
	// 		return false;
	// 	}
	// }

}
