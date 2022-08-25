import * as winston from 'winston';
// import {getManager} from 'typeorm';
// import isValidCoords from 'is-valid-coords';
// import {Worker} from '../models/worker';
// import {isValidCoordinates} from "is-valid-coordinates";
// import { Connection } from "typeorm";
// import { createDBConnection } from "../helpers/db";
// const isValidCoordinates = require("is-valid-coordinates");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore - ignore the unused variable error
// let dbConnection: Promise<Connection>;
import {MessageDecode} from '../interfaces/message-decode';

export class Messages {

	private _logger: winston.Logger;

	private _message: Buffer;

	private _decodedMessage!: MessageDecode | null;

	/**
	 * constructor - set logger
	 */
	constructor(logger: winston.Logger) {
		this._logger = logger;
		// this._message = message;
		// this._decodedMessage = null;
	}

	/**
	 * decode - decode message
	 * @param message - message to decode
	 * @returns MessageDecode - decoded message
	 */
	decode(message: Buffer): MessageDecode {
		this._logger.info('decoding message');
		this._message = message;
		this._decodedMessage = JSON.parse(this._message.toString()) as MessageDecode;
		this._logger.info(this._decodedMessage);
		return this._decodedMessage;
	}

	/**
	 * validate - validate message types
	 * @returns Promise<Messages>
	 */
	// public async validateTypes(): Promise<Messages> {
	// 	console.log("Validating message...");
	// 	console.log(this.message);
	// 	let lon = parseFloat(this.message.coordinates[0]);
	// 	let lat = parseFloat(this.message.coordinates[1]);
	// 	this.message.generated_at = parseInt(this.message.generated_at);
	// 	let isValidLatLon = isValidCoords(lat,lon ); // returns true
	// 	if (!isValidLatLon) {
	// 		throw "Invalid coordinates";
	// 	}

	// 	if (typeof this.message.is_active !== "boolean") {
	// 		throw "Invalid is_active";
	// 	}
	// 	if (typeof this.message.duration !== "number") {
	// 		throw "Invalid duration";
	// 	}
	// 	let checkDate = new Date(this.message.generated_at);
	// 	// console.log("checkDate", checkDate);
	// 	if (checkDate.toString() === "Invalid Date") {
	// 		throw "Invalid generated_at";
	// 	}

	// 	return this;
	// }

	/**
	 * validate - validate message references
	 * @returns Promise<Messages>
	 */
	// public async validateRefrences(): Promise<Messages> {
	// 	console.log("Validating message...");
	// 	console.log(this.message);
	// 	const worker = await Worker.findOneBy({
	// 		id: this.message.worker_id,
	// 	});
	// 	// console.log('worker', worker);
	// 	if (!worker) {
	// 		throw "Worker not found";
	// 	}
	// 	return this;
	// }

	/**
	 * save - save message to database
	 * @returns Promise<any>
	 * @throws error if message is not saved
	 */
	// public async save(): Promise<any> {
	// 	console.log("Saving message...");
	// 	console.log(this.message);
	// 	// const repository = connection.getRepository(WorkerLocation);
	// 	// let coordinates: Point = {
	// 	// 	type: "Point",
	// 	// 	coordinates: [message.coordinates[0], message.coordinates[1]],
	// 	// };
	// 	let coordinates = `Point(${this.message.coordinates[0]},${this.message.coordinates[1]})`;
	// 	this.message.coordinates = coordinates;
	// 	try {
	// 		const entityManager = getManager();
	// 		entityManager.query(`INSERT INTO workers_locations(
	// worker_id, coordinates, is_active, duration, generated_at)
	// 		 VALUES (${this.message.worker_id} , ${this.message.coordinates},
	// 			${this.message.is_active}, ${this.message.duration},
	// 			 to_timestamp(${this.message.generated_at}/1000));`);
	// 		console.log("Message saved");
	// 		return true;
	// 	} catch (err) {
	// 		console.log(err);
	// 		return false;
	// 	}
	// }

}
