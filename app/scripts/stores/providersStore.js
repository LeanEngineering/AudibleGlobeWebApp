define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/providersActions",

    "apis/providersApi"
],
function (_, Backbone, React, Reflux, ACTIONS_Providers, ProvidersApi)
{
    return Reflux.createStore(
    {
        init: function()
        {
            this._providers = [];

            // Forward "loadProviders" action to API, 
            this.listenTo(ACTIONS_Providers.loadProviders, this._onLoadProviders);

            // Register action callbacks for API events
            this.listenTo(ACTIONS_Providers.loadProviders_Api_Success, this._onProvidersApiSuccess);
            this.listenTo(ACTIONS_Providers.loadProviders_Api_Failure, this._onProvidersApiFailure);
        },

        getState: function()
        {
            return this._state;
        },

        _onLoadProviders: function()
        {
            // Forward "loadProviders" action to API
            ProvidersApi.getProviders();

            // Continue action execution
            this.trigger(this._providers);
        },

        _onProvidersApiSuccess: function(data)
        {
            this._state =
            {
                valid: true,
                data:
                {
                    providers: data
                }
            };

            this.trigger(this._state);
        },

        _onProvidersApiFailure: function(error)
        {
            this._state =
            {
                valid: false,
                data:
                {
                    error: error
                }
            };

            this.trigger(this._state);
        }
    });
});
