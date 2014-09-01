/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react");
var Reflux = require("reflux");

var ACTIONS_Providers = require("../actions/providersActions");
var providersStore = require("../stores/providersStore");


var ProvidersList = React.createClass(
{
    getInitialState: function() { return { providers: [] }; },

    componentWillMount: function()
    {
        this.unsubscribe = [];

        this.unsubscribe.push(providersStore.listen(this._updateStateFromStore));

        ACTIONS_Providers.loadProviders();
    },

    componentWillReceiveProps: function(nextProps)
    {
        ACTIONS_Providers.loadProviders();
    },

    componentWillUnmount: function()
    {
        this.unsubscribe.forEach(function(fn) { fn(); });
    },

    render: function()
    {
        var providers = _.map(this.state.providers, this._createProviderDom);

        return (
            <div className="proviersListContainer">
                <h2>Providers</h2>
                <ul>
                    {providers}
                </ul>
            </div>
        )
    },

    _createProviderDom: function(provider)
    {
        var providerLink = "#/providers/" + provider.ProviderId + "/channels";
        return <li key={provider.ProviderId} onClick={this._onClick}><a href={providerLink}>{provider.ProviderName}</a></li>
    },

    _onClick: function()
    {
    },

    _updateStateFromStore: function(storeState)
    {
        if(storeState.valid)
        {
            this.setState({ providers: storeState.data.providers });
        }
    }   
});

module.exports = ProvidersList;
