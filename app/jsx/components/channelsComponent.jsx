/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/actions",

    "components/channelsList",

    "stores/channelsStore"
],
function (_, Backbone, React, Reflux, ACTIONS, ChannelsList, channelsStore)
{
    var NewChannelInput = React.createClass(
    {
        render: function()
        {
            return (
                <div>
                    <h3>Add New Channel</h3>
                    <input id="newChannelInput" type="text"></input>
                    <label htmlFor="newChannelInput">Channel Name</label>
                    <button onClick={this._onGoClicked}>GO</button>
                </div>
            );
        },

        _onGoClicked: function()
        {
            ACTIONS.addChannel($(this.getDOMNode()).find("input").val());
        }
    });

    var ChannelCounter = React.createClass(
    {
        render: function()
        {
            return (
                <span>Number of Channels: {this.props.channels.length}</span>
            );
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
                <div>
                    <span><button onClick={this._onBackClicked}>Back to all Providers</button></span>
                    <ChannelsList providerId={this.props.providerId} channels={this.state.channels} />
                    <NewChannelInput />
                    <ChannelCounter channels={this.state.channels} />
                </div>
            );
        },

        /* Private DOM Event Handlers */

        _onBackClicked: function()
        {
            window.history.back();
        }
    });
});

