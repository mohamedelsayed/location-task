import 'dotenv/config';
import {Messages} from './services/messages';
import {MqttConnector} from './connectors/MqttConnector';
import {createDBConnection} from './helpers/db';
import {logger} from './helpers/logger';

const dbConnection = createDBConnection(logger);

const mqttConnector = new MqttConnector(logger);

mqttConnector.onMessage('asset/location/update', new Messages(logger, dbConnection));
