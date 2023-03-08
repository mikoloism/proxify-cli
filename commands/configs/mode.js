const mode = require('../../core/mode');
const { log, chalk } = require('../../helpers');

module.exports = function (program) {
	program
		.command('mode')
		.description('switch between proxy settings mode')
		.argument('<mode>', 'accept each one AUTO, NONE or MANUAL')
		.argument('<uri>', 'the URI address for AUTO <mode>', undefined)
		.action(function (modeType, uri) {
			if (modeType === 'auto' && uri != undefined) {
				mode(modeType, uri);
				log.write(
					`proxy mode switched to '${chalk.green(
						modeType,
					)}' and set proxy to ${chalk.white('<')}${chalk.green(
						uri,
					)}${chalk.white('>')}`,
				);
				return;
			}

			mode(modeType);
			log.write(`proxy mode switched to '${chalk.green(modeType)}'`);
		});
};
