const shell = require('shelljs');

class ProxyResponder {
	constructor() {}

	_protocol;
	get protocol() {
		return this._protocol;
	}
	set protocol(protocol) {
		this._protocol = protocol;
		return this;
	}

	_host;
	get host() {
		return this._host;
	}
	set host(host) {
		this._host = host;
		return this;
	}

	_port;
	get port() {
		return this._port;
	}
	set port(port) {
		this._port = port;
		return this;
	}

	_country_name;
	get country() {
		return this._country_name;
	}
	set country(country) {
		this._country_name = country;
		return this;
	}

	_city_name;
	get city() {
		return this._city_name;
	}
	set city(country) {
		this._city_name = country;
		return this;
	}

	ping(timeout = 5000) {
		console.log(shell.exec(`ping google.com`));
	}
}

module.exports.Config = ProxyResponder;

class ServerConnection {
	constructor() {}

	connectTo(proxyServer) {}
}

module.exports.Connection = ServerConnection;

const PROXY_AUTO_MODE = 'auto';
const PROXY_MANUAL_MODE = 'manual';
const PROXY_NONE_MODE = 'none';

const PROXY_HTTP_PROTOCOL = 'http';
const PROXY_HTTPS_PROTOCOL = 'https';
const PROXY_FTP_PROTOCOL = 'ftp';
const PROXY_SOCKS_PROTOCOL = 'socks';

class ProxySettings {
	static AUTO = PROXY_AUTO_MODE;
	static MANUAL = PROXY_MANUAL_MODE;
	static NONE = PROXY_NONE_MODE;

	mode = null;
	isEnabled() {
		return this.mode === PROXY_MANUAL_MODE;
	}
	enable() {
		this.switchMode(PROXY_MANUAL_MODE);
	}
	disable() {
		this.switchMode(PROXY_NONE_MODE);
	}
	getCurrentMode() {
		return this.mode;
	}
	switchMode(mode) {
		this.mode = mode;
		return shell(`gsettings set org.gnome.system.proxy mode ${mode}`);
	}

	setAutoUrl(url) {
		this.switchMode(ProxySettings.AUTO);
		return shell(
			`gsettings set org.gnome.system.proxy autoconfig-url ${url}`,
		);
	}

	static HTTP = PROXY_HTTP_PROTOCOL;
	static HTTPS = PROXY_HTTPS_PROTOCOL;
	static FTP = PROXY_FTP_PROTOCOL;
	static SOCKS = PROXY_SOCKS_PROTOCOL;

	setProxy(responder) {
		if (!this.isEnabled()) this.enable();

		shell(
			`gsettings set org.gnome.system.proxy.${responder.protocol} host \"${responder.host}\"`,
		);
		shell(
			`gsettings set org.gnome.system.proxy.${responder.protocol} port ${responder.port}`,
		);

		return this;
	}

	reset() {
		this.setProxy({ protocol: PROXY_HTTP_PROTOCOL, host: '', port: 0 });
		this.setProxy({ protocol: PROXY_HTTPS_PROTOCOL, host: '', port: 0 });
		this.setProxy({ protocol: PROXY_FTP_PROTOCOL, host: '', port: 0 });
		this.setProxy({ protocol: PROXY_SOCKS_PROTOCOL, host: '', port: 0 });
		this.setAutoUrl('');
		this.disable();
	}
}

module.exports.Settings = ProxySettings;
