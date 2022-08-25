import {Connection, createConnection} from 'typeorm';
import * as winston from 'winston';
import {ORMConfig} from '../config/db';

let connection: Promise<Connection>;

/** create database connection.
 *
 * @returns {Promise<Connection>} database connection.
 */
export async function createDBConnection(logger: winston.Logger): Promise<Connection> {
	// logger.info('Creating database connection...');
	if (connection == null || connection === undefined) {
		connection = createConnection(ORMConfig)
			.then((connection) => {
				logger.info('Database connection created successfully');
				return connection;
			})
			.catch((error) => {
				logger.error('Error creating database connection', error);
				throw error;
			});
	}
	return connection;
}
