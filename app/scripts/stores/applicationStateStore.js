define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/actions"
],
function (_, Backbone, React, Reflux, ACTIONS)
{
	return Reflux.createStore(
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
});
