const resetSettings = require('../../core/reset-settings');
const mode = require('../../core/mode');
const { log, chalk } = require('../../helpers');

module.exports = function (program) {
	program
		.command('reset')
		.description('clear and reset all proxy settings')
		.action(function (args) {
			resetSettings();
			mode(mode.OFF);
			log.write(
				chalk.yellowBright('reset all proxy settings '),
				chalk.white('<'),
				chalk.green('successful'),
				chalk.white('>'),
			);
		});
};
