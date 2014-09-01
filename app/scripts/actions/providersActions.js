var _ = require("lodash");
var Reflux = require("reflux");

var actions = Reflux.createActions(
[
	"loadProviders",
	"loadProviders_Api_Success",
	"loadProviders_Api_Failure"
]);

// _(_.keys(actions)).each(function(key) { if(actions[key].listen) actions[key].listen(function() { console.log(key); }); });

module.exports = actions;
