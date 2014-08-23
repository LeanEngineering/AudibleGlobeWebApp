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
    var ProvidersCollection = Backbone.Collection.extend(
    {
        url: "http://5a9107ddfcef4c5187c5df19c47d4639.cloudapp.net/providers"
    });

    return Reflux.createStore(
    {
        init: function()
        {
            this._providers = new ProvidersCollection();

            this.listenTo(ACTIONS.getProviders, this._onGetProviders);
            this.listenTo(ACTIONS.addProvider, this._onAddProvider);
        },

        _onGetProviders: function()
        {
            this._providers.fetch().done(function(data)
            {
                this.trigger(data);
            }.bind(this));
        }
    });
});
