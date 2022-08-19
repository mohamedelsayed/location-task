var mqtt = require("mqtt");
import { options } from "../config/mqtt";

console.log("Connecting to MQTT broker...");
// initialize the MQTT client
var client = mqtt.connect(options);

export { client };
