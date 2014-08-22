/** @jsx React.DOM */
define(
[
	"./app",
	"components/providersList",
	"components/channelsComponent",
	"components/storiesComponent",

	/* Stores */
	"stores/providersStore",
	"react.router"
],
function (App,
		  ProvidersList,
          ChannelsComponent,
          StoriesComponent,
          providersStore,
          ReactRouter)
{
	var Routes = ReactRouter.Routes;
	var Route = ReactRouter.Route;
	var DefaultRoute = ReactRouter.DefaultRoute;

	return (
		Routes( {location:"history"}, 
			Route( {path:"/", handler:App}, 
			    React.DOM.div( {className:"container-fluid"}, 
			    	React.DOM.div( {className:"row"}, 
			    		React.DOM.div( {className:"col-md-2"}, 
			    			Route( {name:"default", handler:ProvidersList} )
				        ),

			       		React.DOM.div( {className:"col-md-2"}, 
			       			Route( {name:"channels", path:"/providers/:providerId/channels", handler:ChannelsComponent} )
			       		),

				        React.DOM.div( {className:"col-md-8"}, 
				        	Route( {name:"stories", path:"/providers/:providerId/channels/:channelId/stories", handler:StoriesComponent} )
						)

					)
				)
			)
		)
	);
});
