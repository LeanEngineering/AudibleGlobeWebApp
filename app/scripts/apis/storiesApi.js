/** @jsx React.DOM */
define(
[
	"superagent",
	"actions/storiesActions"
],
function (request, ACTIONS_Stories)
{
	return {
		getStories: function(providerId, channelId)
		{
			request.get("http://5a9107ddfcef4c5187c5df19c47d4639.cloudapp.net/providers/" + providerId + "/channels/" + channelId + "/stories")
				   .end(function(err, res)
				   {
				   		if(err)
				   		{
				   			ACTIONS_Stories.loadStories_Api_Failure(err);
				   		}
				   		else
				   		{
			 		        ACTIONS_Stories.loadStories_Api_Success(res.body);
				   		}
				   });
		}
	}
});
