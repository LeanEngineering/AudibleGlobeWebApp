/** @jsx React.DOM */
define(
[
	"superagent",
	"actions/providersActions"
],
function (request, ACTIONS_Providers)
{
	return {
		getProviders: function()
		{
			request.get("http://5a9107ddfcef4c5187c5df19c47d4639.cloudapp.net/providers")
				   .end(function(err, res)
				   {
				   		if(err)
				   		{
				   			ACTIONS_Providers.loadProviders_Api_Failure(err);
				   		}
				   		else
				   		{
			 		        ACTIONS_Providers.loadProviders_Api_Success(res.body);
				   		}
				   });
		}
	}
});
