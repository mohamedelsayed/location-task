'use strict';

require('dotenv').config();
require('ts-node').register({
	project: 'tsconfig.json',
	files: true
});
const chai = require('chai');
// const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');
// const chaiDateTime = require('chai-datetime');

// chai.use(sinonChai);
chai.use(chaiAsPromised);
// chai.use(chaiDateTime);
