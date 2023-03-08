const mode = require('../../core/mode');
const proxy = require('../../core/proxy');
const { log, chalk } = require('../../helpers');

module.exports = function (program) {
	httpCommand(program);
	socksCommand(program);
	autoCommand(program);

	program
		.option('--http <host:port>', 'by option')
		.option('--socks <host:port>', 'by options')
		.option('--auto <uri>', 'by automatically')
		.action((args) => {
			if (args.http != undefined) {
				let [host, port] = extractHostAndPort(args.http);
				const proxyConfig = {
					protocol: proxy.PROTOCOL_HTTP,
					host,
					port,
				};
				proxy(proxyConfig);
				logProxySet(proxyConfig);
			}

			if (args.socks != undefined) {
				let [host, port] = extractHostAndPort(args.socks);
				const proxyConfig = {
					protocol: proxy.PROTOCOL_SOCKS,
					host,
					port,
				};
				proxy(proxyConfig);
				logProxySet(proxyConfig);
			}

			if (args.auto != undefined) {
				mode(mode.AUTO, args.auto);
				logProxySet({ protocol: 'auto', host: args.auto, port: '' });
			}
		});
};

function httpCommand(program) {
	program
		.command('http')
		.description('set HTTP proxy')
		.argument('<host:port>', 'host and port')
		.action((args) => {
			let [host, port] = extractHostAndPort(args);
			const proxyConfig = { protocol: proxy.PROTOCOL_HTTP, host, port };
			proxy(proxyConfig);
			logProxySet(proxyConfig);
		});
}

function socksCommand(program) {
	program
		.command('socks')
		.description('set SOCKS proxy')
		.argument('<host:port>', 'host and port')
		.action((args) => {
			let [host, port] = extractHostAndPort(args);
			const proxyConfig = { protocol: proxy.PROTOCOL_SOCKS, host, port };
			proxy(proxyConfig);
			logProxySet(proxyConfig);
		});
}

function autoCommand(program) {
	program
		.command('auto')
		.description('set Auto proxy')
		.argument('<uri>', 'the URI address')
		.action((args) => {
			mode(mode.AUTO, args);
			logProxySet({ protocol: 'auto', host: args, port: '' });
		});
}

function logProxySet({ protocol, port, host }) {
	log.write(
		chalk.green(`proxy to`),
		chalk.yellow(` [ ${protocol} ] `),
		chalk.white('<'),
		chalk.cyanBright(host),
		chalk.white(':'),
		chalk.greenBright(port),
		chalk.white('>'),
	);
}

function extractHostAndPort(uri) {
	return String(uri).split(':');
}
