/** @jsx React.DOM */
define(
[
	"underscore",
	"react",
	"reflux",

	"actions/actions",

	"components/providersList",
	"components/channelsComponent",
	"components/storiesComponent",

	"stores/providersStore",

	"react.router"
],
function (_,
          React,
          Reflux,
          ACTIONS,
          ProvidersList,
          ChannelsComponent,
          StoriesComponent,
          providersStore,
          ReactRouter)
{
	var Routes = ReactRouter.Routes;
	var Route = ReactRouter.Route;

	var App = React.createClass(
	{displayName: 'App',
		getInitialState: function()
		{
			return { };
		},

		componentWillMount: function()
		{
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

		render: function()
		{
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

				    this.props.activeRouteHandler(),

					React.DOM.footer(null, 
						React.DOM.div( {className:"container"}, "Copyright 2014")
					)
				)
			);
		}
	});

	var routes = (
		Routes( {location:"hash"}, 
			Route( {path:"/", handler:App}, 
	   			Route( {handler:ProvidersList} ),
	   			Route( {path:"/providers/:providerId/channels", handler:ChannelsComponent} ),
	        	Route( {path:"/providers/:providerId/channels/:channelId/stories", handler:StoriesComponent} )
			)
		)
	);

	React.renderComponent(routes, document.getElementById("app"));
});
