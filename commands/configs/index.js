module.exports = function (program) {
	const configs = program.command('config').description('proxy configs');

	require('./host')(configs);
	require('./reset')(configs);
	require('./mode')(configs);
};
