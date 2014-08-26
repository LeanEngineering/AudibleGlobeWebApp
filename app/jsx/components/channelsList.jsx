/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/channelsActions"
],
function (_, Backbone, React, Reflux, ACTIONS_Channels)
{
    return React.createClass(
    {
        componentWillReceiveProps: function(nextProps)
        {
            console.log(nextProps);
        },

        render: function()
        {
            var channels = _.map(this.props.channels, this._createChannelDom);

            return (
                <ul>
                    {channels}
                </ul>
            )
        },

        _createChannelDom: function(channel)
        {
            var channelLink = "#/providers/" + channel.ChannelProviderId + "/channels/" + channel.ChannelId + "/stories";
            return <li key={channel.ChannelId}><a href={channelLink}>{channel.ChannelName}</a><span className="glyphicon glyphicon-remove" onClick={this._onDeleteChannel.bind(this, channel.ChannelId)}></span></li>
        },

        _onDeleteChannel: function(channelId)
        {
        }
    });
});
