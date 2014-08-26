/** @jsx React.DOM */
define(
[
	"underscore",
    "reflux"
],
function (_, Reflux)
{
	var actions = Reflux.createActions(
	[
		"loadChannels",
		"loadChannels_Api_Success",
		"loadChannels_Api_Failure",

		"addChannel",
		"addChannel_Api_Success",
		"addChannel_Api_Failure",

		"deleteChannel",
		"deleteChannel_Api_Success",
		"deleteChannel_Api_Failure"
	]);

	_(_.keys(actions)).each(function(key) { if(actions[key].listen) actions[key].listen(function() { console.log(key); }); });

	return actions;
});
