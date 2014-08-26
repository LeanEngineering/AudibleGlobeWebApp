/** @jsx React.DOM */
define(
[
	"underscore",
	"react",
	"reflux",

	"actions/providersActions",

	"components/providersList",
	"components/channelsComponent",
	"components/storiesComponent",
	"components/storiesExplorer",

	"stores/providersStore",

	"react.router"
],
function (_,
          React,
          Reflux,
          ACTIONS_Providers,
          ProvidersList,
          ChannelsComponent,
          StoriesComponent,
          StoriesExplorer,
          providersStore,
          ReactRouter)
{
	var Routes = ReactRouter.Routes;
	var Route = ReactRouter.Route;

	var App = React.createClass(
	{displayName: 'App',
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
				            React.DOM.li(null, React.DOM.a( {href:"#/providers"}, "My Providers")),
				            React.DOM.li(null, React.DOM.a( {href:"#/explore"}, "Explore Stories")),
				            React.DOM.li(null, React.DOM.a( {href:"#"}, "Account"))
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
	   			Route( {path:"/providers", handler:ProvidersList} ),
	   			Route( {path:"/providers/:providerId/channels", handler:ChannelsComponent} ),
	        	Route( {path:"/providers/:providerId/channels/:channelId/stories", handler:StoriesComponent, action:"view"} ),
	        	Route( {path:"/providers/:providerId/channels/:channelId/stories/new", handler:StoriesComponent, action:"new"} ),
	        	Route( {path:"/providers/:providerId/channels/:channelId/stories/:storyId/edit", handler:StoriesComponent, action:"edit"} ),
	        	Route( {path:"/explore", handler:StoriesExplorer} )
			)
		)
	);

	React.renderComponent(routes, document.getElementById("app"));
});
