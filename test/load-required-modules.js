'use strict';

require('ts-node').register({
	project: 'tsconfig.json',
	files: true
});
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
