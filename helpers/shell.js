const exec = require('child_process').exec;

module.exports = function shell(command) {
	let result = '';
	exec(command, function (error, stdout, stderr) {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}

		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}

		result = stdout;
	});

	return result;
};
