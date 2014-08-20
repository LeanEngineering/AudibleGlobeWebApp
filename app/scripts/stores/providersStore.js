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
        url: "http://127.0.0.1/providers"
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
