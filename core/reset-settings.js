const shell = require('../helpers/shell');

module.exports = function resetSettings() {
	shell('gsettings set org.gnome.system.proxy.http host ""');
	shell('gsettings set org.gnome.system.proxy.http port 0');

	shell('gsettings set org.gnome.system.proxy.https host ""');
	shell('gsettings set org.gnome.system.proxy.https port 0');

	shell('gsettings set org.gnome.system.proxy.ftp host ""');
	shell('gsettings set org.gnome.system.proxy.ftp port 0');

	shell('gsettings set org.gnome.system.proxy.socks host ""');
	shell('gsettings set org.gnome.system.proxy.socks port 0');
};
