import {expect} from 'chai';
import {Connection} from 'typeorm';
import {Messages} from '../../src/services/messages';
import {logger} from '../../src/helpers/logger';
import {createDBConnection} from '../../src/helpers/db';
import {MessageDecode} from '../../src/interfaces/message-decode';

// const faker = require('faker');

describe('Messages', function() {
	let messages: Messages;
	before(function() {
		const dbConnection: Promise<Connection> = createDBConnection(logger);
		messages = new Messages(logger, dbConnection);
	});
	describe('Messages services', function(): void {
		const message: MessageDecode = {
			coordinates: [55.1404609680176, 25.0615882873535],
			generated_at: 1594106222000,
			is_active: true,
			duration: 130,
			worker_id: 1
		};

		// decode message test
		it('should decode message', function() {
			const bufferedMessage = Buffer.from(JSON.stringify(message));
			const result = messages.decode(bufferedMessage);
			expect(result).to.be.an('object').that.eqls(message);
		});

		// validate message types test success
		it('should validate message types success', function() {
			const result = messages.validateTypes(message);
			expect(result).to.be.an('object').that.eqls(message);
		});

		// validate message types test fail
		it('should validate message types fail', function() {
			message.coordinates = [500, 500];
			const result = messages.validateTypes(message);
			expect(result).to.be.null;
		});

		// // validate message references test success
		it('should validate message references success', async function() {
			const result = await messages.validateRefrences(message);
			expect(result).to.be.an('object').that.eqls(message);
		});

		// // validate message references test fail
		it('should validate message references fail', async function() {
			message.worker_id = 0;
			const result = await messages.validateRefrences(message);
			expect(result).to.be.null;
		});

		// validate save message test success
		it('should save message success', async function() {
			message.worker_id = 1;
			const result = await messages.save(message);
			expect(result).to.be.true;
		});

		// validate save message test fail
		it('should save message fail', async function() {
			message.worker_id = 0;
			const result = await messages.save(message);
			expect(result).to.be.false;
		});

	});
});
