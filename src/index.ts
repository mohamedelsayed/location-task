import 'dotenv/config';
import * as winston from 'winston';
import {Messages} from './services/messages';
import {MqttConnector} from './connectors/MqttConnector';
import {createDBConnection} from './helpers/db';

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [new winston.transports.Console()]
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dbConnection = createDBConnection(logger);

const mqttConnector = new MqttConnector(logger);

mqttConnector.onMessage('asset/location/update', new Messages(logger));
