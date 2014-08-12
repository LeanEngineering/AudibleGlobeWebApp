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
                <div>
                    <h2>Workouts</h2>
                    <div>
                        {providers}
                    </div>
                </div>
            )
        },

        /* Private Helpers */

        _createProviderDom: function(provider)
        {
            var providerLink = "#providers/" + provider.ProviderId;
            return <li key={provider.ProviderId}><a href={providerLink}>{provider.ProviderName}</a></li>
        }
    });
});
