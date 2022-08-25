import {Connection, createConnection} from 'typeorm';
import {ORMConfig} from '../config/db';

let connection: Promise<Connection>;

/** create database connection.
 *
 * @returns {Promise<Connection>} database connection.
 */
export async function createDBConnection(): Promise<Connection> {
	console.log('Creating database connection');
	// console.log("ORMConfig", ORMConfig);
	if (connection == null || connection === undefined) {
		connection = createConnection(ORMConfig)
			.then((connection) => {
				console.log('database connection established successfully');
				return connection;
			})
			.catch((error) => {
				console.log('can not established database connection', error);
				throw error;
			});
	}
	return connection;
}
