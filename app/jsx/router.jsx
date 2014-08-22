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
		<Routes location="history">
			<Route path="/" handler={App}>
			    <div className="container-fluid">
			    	<div className="row">
			    		<div className="col-md-2">
			    			<Route name="default" handler={ProvidersList} />
				        </div>

			       		<div className="col-md-2">
			       			<Route name="channels" path="/providers/:providerId/channels" handler={ChannelsComponent} />
			       		</div>

				        <div className="col-md-8">
				        	<Route name="stories" path="/providers/:providerId/channels/:channelId/stories" handler={StoriesComponent} />
						</div>

					</div>
				</div>
			</Route>
		</Routes>
	);
});
