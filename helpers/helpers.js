const chalk = require('chalk');
const constants = require('./constants');

const log = {
	write(...text) {
		console.log(...text);
		return this;
	},

	writeln(...paragraph) {
		console.log(paragraph.join('\n'));
		return this;
	},

	divider(middleware) {
		let dividerLine = '-'.repeat(parseInt(process.stdout.columns) - 3);
		console.log(!!middleware ? middleware(dividerLine) : dividerLine);
		return this;
	},

	clear() {
		console.clear();
		return this;
	},

	newLine() {
		console.log();
		return this;
	},
};

const header = () => {
	log.clear()
		.divider()
		.write(
			chalk.greenBright.bold(constants.APP_TITLE),
			`<${chalk.green(`v${constants.APP_VERSION}`)}>`,
		)
		.write(chalk.green(constants.APP_DESCRIPTION))
		.divider()
		.newLine()
		.newLine();
};

module.exports = { log, chalk, header };
