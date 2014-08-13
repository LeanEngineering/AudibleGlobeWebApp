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
    {displayName: 'NewChannelInput',
        getInitialState: function()
        {
            return { channelName: "" };
        },

        render: function()
        {
            return (
                React.DOM.div(null, 
                    React.DOM.h3(null, "Add New Channel"),
                    React.DOM.input( {id:"newChannelInput", type:"text"}),
                    React.DOM.label( {htmlFor:"newChannelInput"}, "Channel Name"),
                    React.DOM.button( {onClick:this._onGoClicked}, "GO")
                )
            );
        },

        _onGoClicked: function()
        {
            ACTIONS.addChannel($(this.getDOMNode()).find("input").val());
        }
    });

    var ChannelCounter = React.createClass(
    {displayName: 'ChannelCounter',
        getInitialState: function()
        {
            return { channels: [] };
        },

        render: function()
        {
            return (
                React.DOM.span(null, "Number of Channels: ", this.props.channels.length)
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
            return { providerId: null, channels: []  }
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
                React.DOM.div(null, 
                    React.DOM.span(null, React.DOM.button( {onClick:this._onBackClicked}, "Back to all Providers")),
                    ChannelsList( {providerId:this.state.providerId, channels:this.state.channels} ),
                    NewChannelInput( {onAdd:this._onAddNewChannel} ),
                    ChannelCounter( {channels:this.state.channels} )
                )
            );
        },

        /* Private DOM Event Handlers */

        _onBackClicked: function()
        {
            window.history.back();
        }
    });
});

