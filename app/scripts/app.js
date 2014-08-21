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

	return React.createClass(
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
			}
			else if(this.state.route === "channels")
			{
			}	
			else if(this.state.route === "stories")
			{
			}

			return (
				React.DOM.div(null, 
					React.DOM.div( {className:"navbar navbar-inverse navbar-fixed-top", role:"navigation"}, 
				      React.DOM.div( {className:"container-fluid"}, 
				        React.DOM.div( {className:"navbar-header"}, 
				          React.DOM.button( {type:"button", className:"navbar-toggle", 'data-toggle':"collapse", 'data-target':".navbar-collapse"}, 
				            React.DOM.span( {className:"sr-only"}, "Toggle navigation"),
				            React.DOM.span( {className:"icon-bar"}),
				            React.DOM.span( {className:"icon-bar"}),
				            React.DOM.span( {className:"icon-bar"})
				          ),
				          React.DOM.a( {className:"navbar-brand", href:"#"}, "Audible Globe")
				        ),
				        React.DOM.div( {className:"navbar-collapse collapse"}, 
				          React.DOM.ul( {className:"nav navbar-nav navbar-right"}, 
				            React.DOM.li(null, React.DOM.a( {href:"#"}, "Dashboard")),
				            React.DOM.li(null, React.DOM.a( {href:"#"}, "Settings")),
				            React.DOM.li(null, React.DOM.a( {href:"#"}, "Profile")),
				            React.DOM.li(null, React.DOM.a( {href:"#"}, "Help"))
				          ),
				          React.DOM.form( {className:"navbar-form navbar-right"}, 
				            React.DOM.input( {type:"text", className:"form-control", placeholder:"Search..."})
				          )
				        )
				      )
				    ),

				    React.DOM.div( {className:"container-fluid"}, 
				    	React.DOM.div( {className:"row"}, 
				    		React.DOM.div( {className:"col-md-2"}, 
				    			ProvidersList( {providers:this.state.providers, selected:this.state.providerId} ),"; "
					        ),

				       		React.DOM.div( {className:"col-md-2"}, 
				       			ChannelsComponent( {providerId:this.state.providerId} )
				       		),

					        React.DOM.div( {className:"col-md-8"}, 
					        	StoriesComponent( {providerId:this.state.providerId, channelId:this.state.channelId, storyId:this.state.storyId} )
							)

						)
					),

					React.DOM.footer(null, 
						React.DOM.div( {className:"container"}, "Copyright 2014")
					)
				)
			);
		}
	});
});
