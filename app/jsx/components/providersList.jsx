/** @jsx React.DOM */
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
    return React.createClass(
    {
        render: function()
        {
            var providers = _.map(this.props.providers, this._createProviderDom);

            return (
                <div>
                    <h2>Providers</h2>
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
            return <li key={provider.ProviderId} onClick={this._onClick}><a href={providerLink}>{provider.ProviderName}</a></li>
        },

        _onClick: function()
        {
        }
    });
});
