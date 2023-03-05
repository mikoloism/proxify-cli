const { log, chalk } = require('../helpers');

module.exports = function (program) {
	program
		.command('set')
		.description('set the current proxy on settings without store')
		.option('--socks <address:port>', 'set SOCKS proxy')
		.option('--http <address:port>', 'set HTTP proxy')
		.action((args, options) => {
			log.write(chalk.green(args.socks));
			log.write(chalk.yellow(args.http));
		});
};
