import { getManager } from "typeorm";
import { Worker } from "../models/worker";
// import { Connection } from "typeorm";
// import { createDBConnection } from "../helpers/db";
const isValidCoordinates = require("is-valid-coordinates");
// eslint-disable-next-line @typescript-eslint/no-unused-vars\
// @ts-ignore
// let dbConnection: Promise<Connection>;

export class Messages {
	private message: any;

	/**
	 * constructor - initialize message
	 * @param Buffer message
	 * @returns Messages object
	 */
	constructor(message: Buffer) {
		this.message = message;
	}

	/**
	 * decode - decode message
	 * @returns Promise<Messages>
	 */
	public async decode(): Promise<Messages> {
		console.log("Decoding message...");
		console.log(this.message);
		try {
			this.message = JSON.parse(this.message.toString());
			return this;
		} catch (err) {
			console.log(err);
			// TODO: add logger service
			throw err;
		}
	}

	/**
	 * validate - validate message types
	 * @returns Promise<Messages>
	 */
	public async validateTypes(): Promise<Messages> {
		console.log("Validating message...");
		console.log(this.message);
		let lon = parseFloat(this.message.coordinates[0]);
		let lat = parseFloat(this.message.coordinates[1]);
		this.message.generated_at = parseInt(this.message.generated_at);
		let isValidLatLon = isValidCoordinates(lon, lat); // returns true
		if (!isValidLatLon) {
			throw "Invalid coordinates";
		}

		if (typeof this.message.is_active !== "boolean") {
			throw "Invalid is_active";
		}
		if (typeof this.message.duration !== "number") {
			throw "Invalid duration";
		}
		let checkDate = new Date(this.message.generated_at);
		// console.log("checkDate", checkDate);
		if (checkDate.toString() === "Invalid Date") {
			throw "Invalid generated_at";
		}

		return this;
	}

	/**
	 * validate - validate message references
	 * @returns Promise<Messages>
	 */
	public async validateRefrences(): Promise<Messages> {
		console.log("Validating message...");
		console.log(this.message);
		const worker = await Worker.findOneBy({
			id: this.message.worker_id,
		});
		// console.log('worker', worker);
		if (!worker) {
			throw "Worker not found";
		}
		return this;
	}

	/**
	 * save - save message to database
	 * @returns Promise<any>
	 * @throws error if message is not saved
	 */
	public async save(): Promise<any> {
		console.log("Saving message...");
		console.log(this.message);
		// const repository = connection.getRepository(WorkerLocation);
		// let coordinates: Point = {
		// 	type: "Point",
		// 	coordinates: [message.coordinates[0], message.coordinates[1]],
		// };
		let coordinates = `Point(${this.message.coordinates[0]},${this.message.coordinates[1]})`;
		this.message.coordinates = coordinates;
		try {
			const entityManager = getManager();
			entityManager.query(`INSERT INTO workers_locations(worker_id, coordinates, is_active, duration, generated_at)
			 VALUES (${this.message.worker_id} , ${this.message.coordinates},
				${this.message.is_active}, ${this.message.duration},
				 to_timestamp(${this.message.generated_at}/1000));`);
			console.log("Message saved");
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}
}
