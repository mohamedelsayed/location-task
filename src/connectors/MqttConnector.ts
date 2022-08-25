import * as mqtt from 'mqtt';
import {Observable} from 'rxjs';
import * as winston from 'winston';
import mqttOptions from '../config/mqttoptions';
import {MessageHandler} from '../interfaces/MessageHandler';

const url = `${mqttOptions.protocol}://"${mqttOptions.host}`;
// type Callback = (message: Buffer) => void;
// @ts-ignore - MqttConnector will be used in the future
export class MqttConnector implements MessageHandler {

	private _client: mqtt.MqttClient;

	private _logger: winston.Logger;

	private _observable!: Observable<any>;

	constructor(logger: winston.Logger) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// @ts-ignore - ignore the unsafe assignment error
		this._logger = logger;
		// @ts-ignore - ignore type of mqttOptions
		this._client = mqtt.connect(url, mqttOptions);
		this.onConnect();
	}

	onConnect() {
		this._client.on('connect', () => {
			this.connectCallback();
		});
	}

	connectCallback() {
		this._logger.info('Connected to MQTT broker');
		this._client.subscribe('asset/location/update');
	}

	onMessageCallback(topicVal: string): Observable<any> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		this._observable = Observable.create((subject: any) => {
			this._client.on('message', (topic: string, message: Buffer) => {
				if (topic === topicVal) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call
					subject.next(message);
				}
			});
		});
		return this._observable;
	}

	onMessage(topicVal: string, callback: MessageHandler) {
		this.onMessageCallback(topicVal).subscribe({
			next: (message: Buffer) => {
				callback.decode(message);
			},
			error: (error: Error) => {
				this._logger.error(error);
			},
			complete: () => {
				this._logger.info('complete');
			}
		});
		// this._client.on('message', (topic: string, message: Buffer) => {
		// 	if (topic === topicVal) {
		// 		callback.decode(message);
		// 	}
		// }
		// this._client.on('message', (topic, message) => {
		// 	if (topic === topicVal) {
		// 		callback.decode(message);
		// 	}
		// });
	}

}
