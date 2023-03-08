var spawn = require('child_process').spawn;
var EventEmitter = require('events').EventEmitter;

const constants = {
	command: { ping: 'ping' },
	output: {
		regex: /^rtt min\/avg\/max\/mdev = (.*?)\/(.*?)\/(.*?)\/(.*?) ms, pipe (.*?)$/gim,
		// req/res regex := /^(.+?) bytes from (.+?): icmp_seq=(.+?) ttl=(.+?) time=(.+?) ms$/gim,
		groups: [
			{ name: 'min', index: 1 },
			{ name: 'avg', index: 2 },
			{ name: 'max', index: 3 },
			{ name: 'mdev', index: 4 },
			{ name: 'pipe', index: 5 },
		],
	},
};

class Ping extends EventEmitter {
	targets = [];
	configs = {
		maxRequest: 1500,
		byteSizeInByte: 996,
		timeoutInSec: 10,
		intervalInSec: 0.1,
	};

	constructor(configs, ...targets) {
		super();

		if (targets.length == 0) {
			this.targets = typeof configs === 'string' ? [configs] : configs;
		} else {
			Object.assign({}, this.configs, configs);
			this.targets = targets;
		}

		this.start();
	}

	start() {
		this.stop();

		const $command =
			this.configs.proxy != undefined
				? `ALL_PROXY=\"${this.configs.proxy}\" ${constants.command.ping}`
				: constants.command.ping;

		if (this.configs.verbose) console.log('execute ', $command);

		const $ping = (this.currentProcess = spawn($command, [
			`-c ${this.configs.maxRequest}`,
			`-i ${this.configs.intervalInSec}`,
			`-w ${this.configs.timeoutInSec}`,
			`-s ${this.configs.byteSizeInByte}`,
			`-v`,
			...this.targets,
		]));

		$ping.stdout.setEncoding('utf8');
		$ping.stderr.setEncoding('utf8');

		$ping.stdout.on('data', this.output.bind(this));
		$ping.stderr.on('data', this.error.bind(this));
		$ping.on('exit', this.exit.bind(this));
	}

	stop() {
		if (!this.currentProcess) return;

		this.currentProcess.kill();
		this.currentProcess = null;
	}

	normalize(data) {
		const regex = constants.output.regex;
		const groups = constants.output.groups;
		const matches = regex.exec(data);
		let result = {};

		if (matches == null) return;

		let group = {};
		for (let index = 0; index < matches.length; index++) {
			if ((group = groups[index])) {
				result[group.name] = matches[group.index];
			}
		}

		return result;
	}

	output(data) {
		if (this.configs.verbose) console.log('ping log :: ', data);

		const result = this.normalize(data);
		if (result != undefined) this.emit('output', result, false, this);
	}

	error(data) {
		this.emit('error', data, true, this);
	}

	exit(code) {
		this.emit('exit', code, this);
	}
}

module.exports = Ping;
