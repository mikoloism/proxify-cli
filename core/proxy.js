const shell = require('../helpers/shell');

function proxy({ protocol, port, host }) {
	shell(`gsettings set org.gnome.system.proxy.${protocol} host \"${host}\"`);
	shell(`gsettings set org.gnome.system.proxy.${protocol} port ${port}`);
}

proxy.PROTOCOL_HTTP = 'http';
proxy.PROTOCOL_SOCKS = 'socks';

module.exports = proxy;
