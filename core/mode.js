const shell = require('../helpers/shell');

const AUTO = 'auto';
const MANUAL = 'manual';
const NONE = 'none';

module.exports.AUTO = AUTO;
module.exports.AUTOMATICALLY = AUTO;
module.exports.MANUAL = MANUAL;
module.exports.MANUALLY = MANUAL;
module.exports.NONE = NONE;
module.exports.OFF = NONE;

const pair = { AUTO, MANUAL, NONE, OFF: NONE };

function mode(value) {
	let $mode = pair[String(value).toUpperCase()];
	shell(`gsettings set org.gnome.system.proxy mode \"${$mode}\"`);
}

module.exports.switchOff = function switchOff() {
	mode(NONE);
};

module.exports.switchAuto = function switchAuto() {
	mode(AUTO);
};

module.exports.switchManual = function switchManual() {
	mode(MANUAL);
};

module.exports = mode;
