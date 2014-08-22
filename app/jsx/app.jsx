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
	{
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
				<div>	
					<div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
				      <div className="container-fluid">
				        <div className="navbar-header">
				          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				            <span className="sr-only">Toggle navigation</span>
				            <span className="icon-bar"></span>
				            <span className="icon-bar"></span>
				            <span className="icon-bar"></span>
				          </button>
				          <a className="navbar-brand" href="#">Audible Globe</a>
				        </div>
				        <div className="navbar-collapse collapse">
				          <ul className="nav navbar-nav navbar-right">
				            <li><a href="#">Dashboard</a></li>
				            <li><a href="#">Settings</a></li>
				            <li><a href="#">Profile</a></li>
				            <li><a href="#">Help</a></li>
				          </ul>
				          <form className="navbar-form navbar-right">
				            <input type="text" className="form-control" placeholder="Search..."></input>
				          </form>
				        </div>
				      </div>
				    </div>

				    {this.props.activeRouteHandler()}

					<footer>
						<div className="container">Copyright 2014</div>
					</footer>
				</div>
			);
		}
	});

	var routes = (
		<Routes location="hash">
			<Route path="/" handler={App}>
	   			<Route handler={ProvidersList} />
	   			<Route path="/providers/:providerId/channels" handler={ChannelsComponent} />
	        	<Route path="/providers/:providerId/channels/:channelId/stories" handler={StoriesComponent} />
			</Route>
		</Routes>
	);

	React.renderComponent(routes, document.getElementById("app"));
});
