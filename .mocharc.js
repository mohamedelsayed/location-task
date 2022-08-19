/**
 * Mocha Configuration File. https://mochajs.org/#configuring-mocha-nodejs
 */
module.exports = {
	// Force Mocha to quit after tests complete
	exit: true,
	// File extension(s) to load
	extension: ['ts'],
	// Path to package.json for config
	package: './package.json',
	// Require module
	require: [
		'test/load-required-modules'
	],
	// Display full stack traces
	fullTrace: true,
	// Look for tests in subdirectories
	recursive: true,
	ui: 'bdd',
	// Slow test timeout threshold in milliseconds
	slow: 3000,
	// Test timeout threshold in milliseconds
	timeout: 10000
};
