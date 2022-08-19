require("dotenv").config();
import { expect } from "chai";
const sinon = require("sinon");
const faker = require("faker");
const { Messages } = require("../../src/services/messages");

// eslint-disable-next-line @typescript-eslint/no-unused-vars\
// @ts-ignore
// let dbConnection: Promise<Connection>;

describe("Messages", () => {
	describe("Messages services", function (): void {
		// beforeEach("Initialize db", function (): void {
		// 	// dbConnection = createDBConnection();
		// });
		let message = {
			coordinates: [faker.address.longitude(), faker.address.latitude()],
			generated_at: faker.date.past().getTime(),
			is_active: faker.random.boolean(),
			duration: faker.random.number(),
			worker_id: faker.random.number(),
		};
		let messages = new Messages(Buffer.from(JSON.stringify(message)));

		// decode message test
		it("should decode message", async () => {
			let spy = sinon.spy(messages, "decode");
			await messages.decode();
			expect(spy.calledOnce).to.be.true;
		});

		// validate message types test
		it("should validate message types", async () => {
			let spy = sinon.spy(messages, "validateTypes");
			await messages.validateTypes();
			expect(spy.calledOnce).to.be.true;
		});
	});
});
