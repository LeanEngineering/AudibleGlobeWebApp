/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/actions",
    "stores/channelsStore"
],
function (_, Backbone, React, Reflux)
{
    return React.createClass(
    {
        render: function()
        {
            var channels = _.map(this.props.channels, this._createChannelDom);

            return (
                React.DOM.div(null, 
                    React.DOM.span(null, React.DOM.button( {onClick:this._onBackClicked}, "Back to all Providers")),
                    React.DOM.h2(null, "Channels for Provider ", this.props.providerId),
                    React.DOM.div(null, 
                        channels
                    )
                )
            )
        },

        /* Private DOM Event Handlers */
        _onBackClicked: function()
        {
            window.history.back();
        },

        /* Private DOM Helpers */

        _createChannelDom: function(channel)
        {
            var channelLink = "#providers/" + channel.ChannelProviderId + "/channels/" + channel.ChannelId;
            return React.DOM.li( {key:channel.ChannelId}, React.DOM.a( {href:channelLink}, channel.ChannelName))
        }
    });
});
