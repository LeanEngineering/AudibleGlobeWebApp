/** @jsx React.DOM */
define(
[
    "reflux",
    "apis/channels"
],
function (Reflux, ChannelsApi)
{
	var theChannelsApi = new ChannelsApi();

	var actions = Reflux.createActions(
	[
		"addChannel",
		"addChannel_Api_Success",
		"addChannel_Api_Failure"
	]);

	return _.merge(actions, Reflux.createStore(
	{
		init: function()
		{
			this.listenTo(this.addChannel, this._onAddChannel);
		},

		_onAddChannel: function(channel)
		{
			theChannelsApi.addChannel(channel).done(function(newChannel)
			{
				this.addChannel_Api_Success(newChannel);
			}.bind(this)).fail(function(error)
			{
				this.addChannel_Api_Failure(error);
			}.bind(this));
		}		
	});
});
