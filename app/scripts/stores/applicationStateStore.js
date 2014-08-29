var _ = require("lodash");
var React = require("react");
var Reflux = require("reflux");

var ACTIONS = require("../actions/actions");


module.exports = Reflux.createStore(
{
	init: function()
	{
		this.listenTo(ACTIONS.setProvider, this._onSetProvider);
		this.listenTo(ACTIONS.setChannel, this._onSetChannel);
		this.listenTo(ACTIONS.setStory, this._onSetStory);
	},

	_onSetProvider: function(provider)
	{
		this.fire();
	},

	_onSetChannel: function(channel)
	{
		this.fire();
	},

	_onSetStory: function(story)
	{
		this.fire();
	}
});
