/** @jsx React.DOM */

var _ = require("lodash");

var React = require("react");
var ReactRouter = require("react-router");
var Reflux = require("reflux");

var ACTIONS_Providers = require("../actions/providersActions");
var ProvidersList = require("./providersList");
var ChannelsComponent = require("./channelsComponent");
var StoriesComponent = require("./storiesComponent");
var StoriesExplorer = require("./storiesExplorer");

var providersStore = require("../stores/providersStore");

var Routes = ReactRouter.Routes;
var Route = ReactRouter.Route;

var LocationSearcher = React.createClass(
{
	render: function()
	{
		return <input type="text" className="form-control" placeholder="Search Location..."></input>;
	}
});

var App = React.createClass(
{
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
			            <li><a href="#/providers">My Providers</a></li>
			            <li><a href="#/explore">Explore Stories</a></li>
			            <li><a href="#">Account</a></li>
			          </ul>
			          <form className="navbar-form navbar-right">
			            <LocationSearcher />
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
   			<Route path="/providers" handler={ProvidersList} />
   			<Route path="/providers/:providerId/channels" handler={ChannelsComponent} />
        	<Route path="/providers/:providerId/channels/:channelId/stories" handler={StoriesComponent} action="view" />
        	<Route path="/providers/:providerId/channels/:channelId/stories/new" handler={StoriesComponent} action="new" />
        	<Route path="/providers/:providerId/channels/:channelId/stories/:storyId/edit" handler={StoriesComponent} action="edit" />
        	<Route path="/explore" handler={StoriesExplorer} />
		</Route>
	</Routes>
);

React.renderComponent(routes, document.getElementById("app"));
