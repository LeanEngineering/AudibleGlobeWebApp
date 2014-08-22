/** @jsx React.DOM */
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
    return React.createClass(
    {
        render: function()
        {
            var channels = _.map(this.props.channels, this._createChannelDom);

            return (
                <div>
                    <h2>Channels</h2>
                    <ul>
                        {channels}
                    </ul>
                </div>
            )
        },

        /* Private DOM Event Handlers */


        /* Private DOM Helpers */

        _createChannelDom: function(channel)
        {
            var channelLink = "#providers/" + channel.ChannelProviderId + "/channels/" + channel.ChannelId;
            return <li key={channel.ChannelId}><a href={channelLink}>{channel.ChannelName}</a><span className="glyphicon glyphicon-remove" onClick={this._onDeleteChannel.bind(this, channel.ChannelId)}></span></li>
        },

        _onDeleteChannel: function(channelId)
        {
            ACTIONS.deleteChannel(channelId);
        }
    });
});
