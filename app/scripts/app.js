/** @jsx React.DOM */
define(
[
	"underscore",
	"backbone",
	"react",
	"reflux",

	"components/providersList"
],
function (_, Backbone, React, Reflux, ProvidersList)
{
	return React.createClass(
	{
		getInitialState: function()
		{
			return { };
		},

		render: function()
		{
			return (
				React.DOM.div(null, 
					ProvidersList(null )
				)
			);
		}
	});
});
