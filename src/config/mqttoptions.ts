// import {IClientOptions} from 'mqtt';

const mqttOptions = {
	host: process.env.MQTT_HOST ? process.env.MQTT_HOST : 'localhost',
	// @ts-ignore - ignore type of port
	port: process.env.MQTT_PORT ? process.env.MQTT_PORT : 8883,
	// @ts-ignore -  ignore type of protocol
	protocol: process.env.MQTT_PROTOCOL ? process.env.MQTT_PROTOCOL : 'mqtts',
	username: process.env.MQTT_USERNAME ? process.env.MQTT_USERNAME : '',
	password: process.env.MQTT_PASSWORD ? process.env.MQTT_PASSWORD : ''
};

export default mqttOptions;
