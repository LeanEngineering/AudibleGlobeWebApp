/** @jsx React.DOM */
require.config(
{
	baseUrl: "scripts",
	paths:
	{
		jquery: "../bower_components/jquery/dist/jquery",
		lodash: "../bower_components/lodash/dist/lodash",
		underscore: "../bower_components/lodash/dist/lodash",
		backbone: "../bower_components/backbone/backbone",
		react: "../bower_components/react/react",
		reflux: "../bower_components/reflux/dist/reflux.min"
	},
	shim:
	{
		react:
		{
			exports: "React"
		}
	}
});

require(["react", "app"],
function (React, App)
{
	React.renderComponent(
		<App />,
		document.getElementById("app")
	);
});
