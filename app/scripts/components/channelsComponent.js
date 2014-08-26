/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",
    "react.router",

    "actions/channelsActions",

    "components/channelsList",

    "stores/channelsStore"
],
function (_, Backbone, React, Reflux, ReactRouter, ACTIONS_Channels, ChannelsList, channelsStore)
{
    var Routes = ReactRouter.Routes;
    var Route = ReactRouter.Route;

    var ChannelsEditor = React.createClass(
    {displayName: 'ChannelsEditor',
        mixins: [React.addons.LinkedStateMixin],

        getInitialState: function()
        {
            return { ChannelId: null, ChannelName: "", ChannelProviderId: null };
        },

        render: function()
        {
            var header = this.props.channelId === "new" ? React.DOM.h3(null, "NewChannel") : React.DOM.h3(null, "Edit Channel");

            return (
                React.DOM.div(null, 
                    header,
                    React.DOM.label( {htmlFor:"newChannelInput", valueLink:this.linkState("ChannelName")}, "Channel Name"),
                    React.DOM.input( {id:"newChannelInput", type:"text", value:true}),
                    React.DOM.button( {onClick:this._onGoClicked}, "GO")
                )
            );
        },

        _isNewChannel: function() { return this.props.channelId === "new"; },

        _onGoClicked: function()
        {
        }
    });

    return React.createClass(
    {
        getInitialState: function()
        {
            return { channels: []  }
        },

        componentWillMount: function()
        {
            this.unsubscribe = [];

            this.unsubscribe.push(channelsStore.listen(this._updateStateFromStore));

            ACTIONS_Channels.loadChannels(this.props.params.providerId);
        },

        componentWillReceiveProps: function(nextProps)
        {
            ACTIONS_Channels.loadChannels(nextProps.params.providerId);
        },

        componentWillUnmount: function()
        {
            this.unsubscribe.forEach(function(fn) { fn(); });
        },

        _updateStateFromStore: function(storeState)
        {
            if(storeState.valid)
            {
                this.setState({ channels: storeState.data.channels });
            }
        },

        render: function()
        {
            return (
                React.DOM.div(null, 
                    React.DOM.h3(null, "Channels"),
                    ChannelsList( {channels:this.state.channels} )
                )
            );
        }
    });
});


