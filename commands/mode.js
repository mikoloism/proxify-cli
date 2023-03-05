const mode = require('../core/mode');
const { log, chalk } = require('../helpers');

module.exports = function (program) {
	program
		.command('mode')
		.description('switch between proxy settings mode')
		.argument('<mode>', 'accept each one AUTO, NONE or MANUAL')
		.action(function (args) {
			// const $mode = args.toLowerCase();
			// const color = {
			// 	auto: chalk.yellow,
			// 	manual: chalk.green,
			// 	off: chalk.red,
			// }[$mode];
			// mode($mode);
			// log.write(`proxy mode switched to '${color(args)}'`);
			console.log(args);
		});
};
