/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/channelActions",

    "components/channelsList",

    "stores/channelsStore"
],
function (_, Backbone, React, Reflux, CHANNEL_ACTIONS, ChannelsList, channelsStore)
{
    var ChannelsEditor = React.createClass(
    {
        mixins: [React.addons.LinkedStateMixin],

        getInitialState: function()
        {
            return { ChannelId: null, ChannelName: "", ChannelProviderId: null };
        },

        render: function()
        {
            var header = this.props.channelId === "new" ? <h3>NewChannel</h3> : <h3>Edit Channel</h3>;

            return (
                <div>
                    {header}
                    <label htmlFor="newChannelInput" valueLink={this.linkState("ChannelName")}>Channel Name</label>
                    <input id="newChannelInput" type="text" value></input>
                    <button onClick={this._onGoClicked}>GO</button>
                </div>
            );
        },

        _isNewChannel: function() { return this.props.channelId === "new"; },

        _onGoClicked: function()
        {
            if(this._isNewChannel())
            {
                CHANNEL_ACTIONS.addChannel(this.state);
            }
            else
            {
                CHANNEL_ACTIONS.editChannel(this.state);
            }
        }
    });

    return React.createClass(
    {
        _setupChannels: function(providerId)
        {
            channelsStore.setProviderId(providerId);
            ACTIONS.getChannels();
        },

        getInitialState: function()
        {
            return { channels: []  }
        },

        componentWillMount: function()
        {
            this.unsubscribe = [];

            this.unsubscribe.push(channelsStore.listen(function(data)
            {
                this.setState({ channels: data });
            }.bind(this)).bind(this));

            this._setupChannels(this.props.providerId);
        },

        componentWillReceiveProps: function(nextProps)
        {
            this._setupChannels(nextProps.providerId);
        },

        componentWillUnmount: function()
        {
            this.unsubscribe.forEach(function(fn) { fn(); });
        },

        render: function()
        {
            return (
                <Routes>
                    <Route handler={ChannelsList} />
                    <Route path="/providers/:providerId/channels/:channelId/editor" handler={ChannelsEditor} />
                </Routes>
            );
        }
    });
});

