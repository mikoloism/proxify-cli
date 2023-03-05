const constants = require('./constants');

module.exports = function (program) {
	program
		.name(constants.APP_NAME)
		.description(constants.APP_DESCRIPTION)
		.version(constants.APP_VERSION);
};
