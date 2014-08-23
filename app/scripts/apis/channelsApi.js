/** @jsx React.DOM */
define(
[
	"superagent"
],
function (request)
{
	return {
		getChannels: function(providerId)
		{
			request.get("url")
				   .timeout(REQUEST_TIMEOUT)
				   .end(function(err, res)
				   {

				   });
		}
	}
});
