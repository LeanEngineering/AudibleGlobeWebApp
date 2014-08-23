/** @jsx React.DOM */
require.config(
{
	baseUrl: "scripts",
	paths:
	{
		jquery: "../bower_components/jquery/dist/jquery",
		bootstrap: "../bower_components/bootstrap/dist/js/bootstrap",
		lodash: "../bower_components/lodash/dist/lodash",
		underscore: "../bower_components/lodash/dist/lodash",
		backbone: "../bower_components/backbone/backbone",
		react: "../bower_components/react/react-with-addons",
		"react.router": "../bower_components/react-router/dist/react-router",
		reflux: "../bower_components/reflux/dist/reflux",
		superagent: "../bower_components/superagent/superagent",

		leaflet: "../bower_components/leaflet/dist/leaflet-src"
	},
	shim:
	{
		react:
		{
			exports: "React"
		},
		bootstrap:
		{
			deps:
			[
				"jquery"
			]
		},
		"react.router":
		{
			deps:
			[
				"react"
			],
			exports: "ReactRouter"
		}
	}
});

require(["react", "bootstrap"],
function (React)
{
	window.React = React;

	require([ "router", "app" ], function(Routes, App)
	{
	});
});
