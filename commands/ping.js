const AsciiTable = require('ascii-table');
const Ping = require('../core/ping');
const { log, chalk } = require('../helpers');

const GOOGLE_PING_IP = '8.8.8.8';

module.exports = function (program) {
	program
		.command('ping')
		.description('get PING speed test')
		.option('--proxy <uri>', 'the proxy URI')
		.option(
			'--target <uri>',
			'the target to test the proxy',
			GOOGLE_PING_IP,
		)
		.action(function (args) {
			log.write(
				`try to PING ${chalk.green(args.target)} ${
					args.proxy ? chalk.magenta(args.proxy) : ''
				} please wait`,
			);
			const ping = new Ping(
				{
					timeoutInSec: 5,
					proxy: args.proxy != undefined ? args.proxy : undefined,
				},
				args.target,
			);
			ping.on('output', (data) => {
				const table = new AsciiTable();
				table
					.addRow(
						'minimum',
						data.min < 50
							? chalk.green(data.min)
							: data.min < 200
							? chalk.yellow(data.min)
							: chalk.red(data.min),
					)
					.addRow(
						'average',
						data.avg < 50
							? chalk.green(data.avg)
							: data.avg < 200
							? chalk.yellow(data.avg)
							: chalk.red(data.avg),
					)
					.addRow(
						'maximum',
						data.max < 50
							? chalk.green(data.max)
							: data.max < 200
							? chalk.yellow(data.max)
							: chalk.red(data.max),
					);
				log.write(table.toString());
			});
		});
};
