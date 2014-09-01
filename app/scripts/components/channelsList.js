/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react");
var Reflux = require("reflux");

var ACTIONS_Channels = require("../actions/channelsActions");

var ChannelsList = React.createClass(
{
    componentWillReceiveProps: function(nextProps)
    {
    },

    render: function()
    {
        var channels = _.map(this.props.channels, this._createChannelDom);

        return (
        	<div className="channelsListContainer">
	            <ul>
	                {channels}
	            </ul>
            </div>
        )
    },

    _createChannelDom: function(channel)
    {
        var channelLink = "#/providers/" + channel.ChannelProviderId + "/channels/" + channel.ChannelId + "/stories";
        return <li key={channel.ChannelId}><a href={channelLink}>{channel.ChannelName}</a></li>
    }
});

module.exports = ChannelsList;
