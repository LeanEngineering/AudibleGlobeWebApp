var _ = require("lodash");
var React = require("react");
var Reflux = require("reflux");

var ACTIONS_Channels = require("../actions/channelsActions");
var ChannelsApi = require("../apis/channelsApi");

module.exports = Reflux.createStore(
{
    init: function()
    {
        this._channels = [];

        // Forward VIEW action to API
        this.listenTo(ACTIONS_Channels.loadChannels, this._onLoadChannels);

        // Subscribe to API actions
        this.listenTo(ACTIONS_Channels.loadChannels_Api_Success, this._onLoadChannelsApiSuccess);
        this.listenTo(ACTIONS_Channels.loadChannels_Api_Failure, this._onLoadChannelsApiFailure);
    },

    _onLoadChannels: function(providerId)
    {
        ChannelsApi.getChannels(providerId);            

        this._state =
        {
            valid: true,
            data:
            {
                channels: this._channels
            }
        };

        this.trigger(this._state);
    },

    _onLoadChannelsApiSuccess: function(data)
    {
        this._channels = data;

        this._state =
        {
            valid: true,
            data:
            {
                error: null,
                channels: this._channels
            }
        };

        this.trigger(this._state);
    },

    _onLoadChannelsApiFailure: function(error)
    {
        this._state =
        {
            valid: false,
            data:
            {
                error: error,
                channels: this._channels
            }
        };

        this.trigger(this._state);
    }

});
