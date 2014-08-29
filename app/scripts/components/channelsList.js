/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react");
var Reflux = require("reflux");

var ACTIONS_Channels = require("../actions/channelsActions");

var ChannelsList = React.createClass(
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

module.exports = ChannelsList;
