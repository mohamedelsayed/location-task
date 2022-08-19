require("dotenv").config();
// import { Observable, PartialObserver } from "rxjs";
import { client } from "./helpers/mqtt";
import { Messages } from "./services/messages";
import { createDBConnection } from "./helpers/db";
import { Connection } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars\
// @ts-ignore
let dbConnection: Promise<Connection>;

client.on("connect", function () {
	console.log("Connected");
	dbConnection = createDBConnection();
});

client.on("error", function (error: any) {
	console.log(error);
});
// subscribe to topic 'asset/location/update'
client.subscribe("asset/location/update");

// const observer: PartialObserver<void> = {
// 	next: () => {
// 		console.log("message received");
// 	},
// 	error: (error: Error): void => {
// 		console.log(error);
// 	},
// 	complete: () => {
// 		console.log("complete");
// 	},
// };

// const clock$ = Observable.create((subject: any) => {
// 	console.log("In Observable");
// 	const interval = setInterval(() => {
// 		subject.next("tick");
// 	}, 1000);
// 	setTimeout(() => clearInterval(interval), 7 * 1000);
// });
// const subscription = clock$.subscribe(console.log);

// setTimeout(() => subscription.unsubscribe(), 10 * 1000);

client.on("message", function (topic: any, message: any) {
	// called each time a message is received
	console.log("Received message on topic:", topic);
	switch (topic) {
		case "asset/location/update":
			const messages = new Messages(message);
			messages
				.decode()
				.then((messages) => {
					messages
						.validateTypes()
						.then((messages) => {
							messages
								.validateRefrences()
								.then((messages) => {
									messages.save();
								})
								.catch((err) => {
									console.log(err);
								});
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
			break;
		default:
			console.log("Unknown topic:", topic);
			break;
	}
});
