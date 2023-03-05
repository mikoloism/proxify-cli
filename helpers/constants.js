module.exports = {
	APP_NAME: 'proxify-cli',
	APP_TITLE: 'PROXIFY (CLI)',
	APP_DESCRIPTION: 'CLI for proxy utilities',
	APP_VERSION: '1.0.0',
};

/**
	//* source : https://www.npmjs.com/package/configstore
	const Configstore = require('configstore').default;
	const fs = require('fs');

	const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
	const config = new Configstore(packageJson.name);

	module.exports = {
		APP_NAME: config.get('name'),
		APP_TITLE: config.get('name'),
		APP_DESCRIPTION: config.get('description'),
		APP_VERSION: config.get('version'),
	};
 */
