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
                React.DOM.ul(null, 
                    channels
                )
            )
        },

        _createChannelDom: function(channel)
        {
            var channelLink = "#/providers/" + channel.ChannelProviderId + "/channels/" + channel.ChannelId + "/stories";
            return React.DOM.li( {key:channel.ChannelId}, React.DOM.a( {href:channelLink}, channel.ChannelName),React.DOM.span( {className:"glyphicon glyphicon-remove", onClick:this._onDeleteChannel.bind(this, channel.ChannelId)}))
        },

        _onDeleteChannel: function(channelId)
        {
        }
    });
});
