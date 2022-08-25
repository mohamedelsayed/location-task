import 'dotenv/config';
import * as winston from 'winston';
import {Messages} from './services/messages';
import {MqttConnector} from './connectors/MqttConnector';

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [new winston.transports.Console()]
});

const mqttConnector = new MqttConnector(logger);

mqttConnector.onMessage('asset/location/update', new Messages(logger));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore - ignore the unused variable error
// let dbConnection: Promise<Connection>;

// client.on("connect", function () {
// 	console.log("Connected");
// 	dbConnection = createDBConnection();
// });

// client.on("message", async function (topic: any, message: any) {
// 	// called each time a message is received
// 	console.log("Received message on topic:", topic);
// 	switch (topic) {
// 		case "asset/location/update":
// 			let messages = new Messages(message);
// 			await messages.decode();
// 			await messages.validateTypes();

// 			messages
// 				.decode()
// 				.then((messages) => {
// 					messages
// 						.validateTypes()
// 						.then((messages) => {
// 							messages
// 								.validateRefrences()
// 								.then((messages) => {
// 									messages.save();
// 								})
// 								.catch((err) => {
// 									console.log(err);
// 								});
// 						})
// 						.catch((err) => {
// 							console.log(err);
// 						});
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				});
// 			break;
// 		default:
// 			console.log("Unknown topic:", topic);
// 			break;
// 	}
// });
