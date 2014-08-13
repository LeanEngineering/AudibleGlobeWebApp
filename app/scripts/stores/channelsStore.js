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
    var ChannelsCollection = Backbone.Collection.extend(
    {
        initialize: function(options)
        {
            this._providerId = options ? options.providerId : null;
        },

        setProviderId: function(providerId)
        {
            this._providerId = providerId;
        },

        url: function()
        {
            return "http://127.0.0.1:81/providers/" + this._providerId + "/channels";
        }
    });

    return Reflux.createStore(
    {
        init: function()
        {
            this._channels = new ChannelsCollection();

            this.listenTo(ACTIONS.getChannels, this._onGetChannels);
            this.listenTo(ACTIONS.addChannel, this._onAddChannel);
        },

        setProviderId: function(providerId)
        {
            this._channels.setProviderId(providerId);
        },

        _onGetChannels: function()
        {
            this._channels.fetch().done(function(data)
            {
                this.trigger(data);
            }.bind(this));
        },

        _onAddChannel: function(name)
        {
            var onSuccess = function(data)
            {
                this.trigger(this._channels.toJSON());
            }.bind(this);

            this._channels.create({ ChannelName: name, ChannelProviderId: this._channels._providerId },
                                  { wait: true, success: onSuccess });
        }
    });
});
