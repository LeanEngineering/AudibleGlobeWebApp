/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react/addons");
var ReactRouter = require("react-router");
var Reflux = require("reflux");

var ACTIONS_Channels = require("../actions/channelsActions");
var ChannelsList = require("./channelsList");
var channelsStore = require("../stores/channelsStore");

var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;

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
    }
});

module.exports = React.createClass(
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
            <div>
                <h3>Channels</h3>
                <ChannelsList channels={this.state.channels} />
            </div>
        );
    }
});
