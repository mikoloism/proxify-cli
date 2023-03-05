module.exports = function (program) {
	program
		.command('join')
		.description('Join the command-arguments into a single string')
		.argument('<strings...>', 'one or more strings')
		.option('-s, --separator <char>', 'separator character', ',')
		.action((strings, options) => {
			console.log(strings.join(options.separator));
		});
};
