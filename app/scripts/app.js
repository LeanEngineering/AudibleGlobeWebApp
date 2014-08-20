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
	"components/storiesComponent",

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
          StoriesComponent,
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
        	"providers/:providerId/channels/:channelId/stories/:storiesId": "editStory",
        	"providers/:providerId/channels/:channelId": "showStoriesForChannel",
            "providers/:providerId": "showChannelsForProvider",
            "providers": "showProviders",
            "": "showProviders"
        },

        editStory: function(providerId, channelId, storyId)
        {
        	this._controller.editStory(parseInt(providerId, 10), parseInt(channelId, 10), parseInt(storyId, 10));
        },

        showStoriesForChannel: function(providerId, channelId)
        {
        	this._controller.showStories(parseInt(providerId, 10), parseInt(channelId, 10));
        },

        showChannelsForProvider: function(providerId)
        {
            this._controller.showChannels(parseInt(providerId, 10));
        },

        showProviders: function()
        {
            this._controller.showProviders();
        }
    });

	var AppControllerComponent = React.createClass(
	{displayName: 'AppControllerComponent',
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

		showStories: function(providerId, channelId)
		{
			this.setState({ route: "stories", providerId: providerId, channelId: channelId, storyId: null });
		},

		editStory: function(providerId, channelId, storyId)
		{
			this.setState({ route: "stories", providerId: providerId, channelId: channelId, storyId: storyId });
		},

		render: function()
		{
			if(this.state.route === "providers")
			{
				route = ProvidersList( {providers:this.state.providers} );
			}
			else if(this.state.route === "channels")
			{
				route = ChannelsComponent( {providerId:this.state.providerId} )
			}	
			else if(this.state.route === "stories")
			{
				route = StoriesComponent( {providerId:this.state.providerId, channelId:this.state.channelId, storyId:this.state.storyId} )
			}

			return (
				React.DOM.div( {className:"container-fluid"}, 
					route
				)
			);
		}
	});

	return AppControllerComponent;
});
