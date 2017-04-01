var system = require('system');
url = 'http://www.livecampusapts.com/Apartments/module/properties/';

var args = system.args;
console.log(args[1]);
var page = require('webpage').create();
page.open(url, function () {
	// console.log(page.content);
    phantom.exit();
});