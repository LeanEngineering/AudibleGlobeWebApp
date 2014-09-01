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
			<div className="appContainer">	
				<div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
			      <div className="container">
			        <div className="navbar-header">
			          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			            <span className="sr-only">Toggle navigation</span>
			            <span className="icon-bar"></span>
			            <span className="icon-bar"></span>
			            <span className="icon-bar"></span>
			          </button>
			          <a className="navbar-brand" href="#">Audible Globe Provider Admin Interface</a>
			        </div>
			        <div className="navbar-collapse collapse">
			          <ul className="nav navbar-nav navbar-right">
			            <li><a href="#/providers">My Providers</a></li>
			            <li><a href="#/explore">Explore Stories</a></li>
			            <li><a href="#/account">Account</a></li>
			          </ul>
			          <form className="navbar-form navbar-right">
			            <LocationSearcher />
			          </form>
			        </div>
			      </div>
			    </div>

			    <div className="container mainContent">
		    		{this.props.activeRouteHandler()}
		    	</div>

				<footer>
					<div className="container">Copyright 2014, Bernardo Fanti, LeanEngineering Co.</div>
				</footer>
			</div>
		);
	}
});

var routes = (
	<Routes location="hash">
		<Route path="/" handler={App}>
   			<Route path="/providers" handler={ProvidersList} />
   			
   			<Route path="/providers/:providerId/channels" handler={ChannelsComponent} action="list" />
   			<Route path="/providers/:providerId/channels/new" handler={ChannelsComponent} action="new" />
   			<Route path="/providers/:providerId/channels/:channelId/edit" handler={ChannelsComponent} action="edit" />

        	<Route path="/providers/:providerId/channels/:channelId/stories" handler={StoriesComponent} action="view" />
        	<Route path="/providers/:providerId/channels/:channelId/stories/new" handler={StoriesComponent} action="new" />
        	<Route path="/providers/:providerId/channels/:channelId/stories/:storyId/edit" handler={StoriesComponent} action="edit" />
        	<Route path="/explore" handler={StoriesExplorer} />
		</Route>
	</Routes>
);

React.renderComponent(routes, document.getElementById("app"));
