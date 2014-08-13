/** @jsx React.DOM */
define(
[
	"underscore",
	"backbone",
	"react",
	"reflux",

	"actions/actions",

	"components/providersList",
	"components/channelsComponent",

	/* Stores */
	"stores/providersStore"
],
function (_,
          Backbone,
          React,
          Reflux,
          ACTIONS,
          ProvidersList,
          ChannelsComponent,
          providersStore)
{
    var AppRouter = Backbone.Router.extend(
    {
        initialize: function(options)
        {
            this._controller = options.controller;
        },

        routes:
        {
            "providers/:providerId": "showChannelsForProvider",
            "providers": "showProviders",
            "": "showProviders"
        },

        showChannelsForProvider: function(providerId)
        {
            this._controller.showChannels(providerId);
        },

        showProviders: function()
        {
            this._controller.showProviders();
        }
    });

	var AppControllerComponent = React.createClass(
	{
		getInitialState: function()
		{
			return { route: { name: "providers", options: null } };
		},

		componentWillMount: function()
		{
			this.router = new AppRouter({ controller: this });
			Backbone.history.start();

			this.unsubscribe = [];

            this.unsubscribe.push(providersStore.listen(function(data)
            {
                this.setState({ providers: data });
            }.bind(this)).bind(this));

			ACTIONS.getProviders();
		},

		componentWillUnmount: function()
		{
			this.unsubscribe.forEach(function(fn) { fn(); });
		},

		showProviders: function()
		{
			this.setState({ route: "providers" });

			ACTIONS.getProviders();
		},

		showChannels: function(providerId)
		{
			this.setState({ route: "channels", providerId: providerId });
		},

		render: function()
		{
			if(this.state.route === "providers")
			{
				route = <ProvidersList providers={this.state.providers} />;
			}
			else if(this.state.route === "channels")
			{
				route = <ChannelsComponent providerId={this.state.providerId} />
			}

			return (
				<div>
					{route}
				</div>
			);
		}
	});

	return AppControllerComponent;
});
