import * as mqtt from 'mqtt';
import {Observable, Subscriber} from 'rxjs';
import * as winston from 'winston';
import mqttOptions from '../config/mqttoptions';
import {MessageHandler} from '../interfaces/MessageHandler';

const url = `${mqttOptions.protocol}://"${mqttOptions.host}`;
// type Callback = (message: Buffer) => void;
// @ts-ignore - MqttConnector will be used in the future
export class MqttConnector {

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
		this._observable = Observable.create((subscriber: Subscriber<any>) => {
			this._client.on('message', (topic: string, message: Buffer) => {
				if (topic === topicVal) {
					subscriber.next(message);
				}
			});
		});
		return this._observable;
	}

	onMessage(topicVal: string, callback: MessageHandler) {
		this.onMessageCallback(topicVal).subscribe({
			next: async (message: Buffer) => {
				const decodedMessage = callback.decode(message);
				const validatedMessage = callback.validateTypes(decodedMessage);
				// this._logger.info(validatedMessage);
				if (validatedMessage) {
					const finalValidatedMessage = await callback.validateRefrences(validatedMessage);
					// this._logger.info(finalValidatedMessage);
					if (finalValidatedMessage) {
						await callback.save(finalValidatedMessage);
					}
				}
			},
			error: (error: Error) => {
				this._logger.error(error);
			},
			complete: () => {
				this._logger.info('complete');
			}
		});
	}

}
