/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/actions",
    "stores/providersStore"
],
function (_, Backbone, React, Reflux, ACTIONS, providersStore)
{
    return React.createClass(
    {
        getInitialState: function()
        {
            return { providers: [] }
        },

        componentWillMount: function()
        {
            this.unsubscribe = providersStore.listen(function(data)
            {
                this.setState({ providers: data });
            }.bind(this));

            ACTIONS.getProviders();
        },

        componentWillUnmount: function()
        {
            this.unsubscribe();
        },

        render: function()
        {
            var providers = _.map(this.state.providers, this._createProviderDom);

            return (
                React.DOM.div(null, 
                    React.DOM.h2(null, "Workouts"),
                    React.DOM.div(null, 
                        providers
                    )
                )
            )
        },

        /* Private Helpers */

        _createProviderDom: function(provider)
        {
            var providerLink = "#providers/" + provider.ProviderId;
            return React.DOM.li( {key:provider.ProviderId}, React.DOM.a( {href:providerLink}, provider.ProviderName))
        }
    });
});
