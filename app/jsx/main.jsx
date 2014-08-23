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
		reflux: "../bower_components/reflux/dist/reflux",

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
		}
	}
});

require(["react", "app", "bootstrap"],
function (React, App)
{
	React.renderComponent(
		<App />,
		document.getElementById("app")
	);
});
