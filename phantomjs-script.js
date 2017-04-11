var system = require('system');
var args = system.args;
url = args[1];
var page = require('webpage').create();
page.open(url, function () {
	console.log(page.content);
    phantom.exit();
});
