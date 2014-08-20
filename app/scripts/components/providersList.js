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
                React.DOM.div(null, 
                    React.DOM.h2(null, "Providers"),
                    React.DOM.ul(null, 
                        providers
                    )
                )
            )
        },

        _createProviderDom: function(provider)
        {
            var providerLink = "#providers/" + provider.ProviderId;
            return React.DOM.li( {key:provider.ProviderId, onClick:this._onClick}, React.DOM.a( {href:providerLink}, provider.ProviderName))
        },

        _onClick: function()
        {
        }
    });
});
