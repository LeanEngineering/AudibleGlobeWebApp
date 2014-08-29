var request = require("superagent");
var ACTIONS_Channels = require("../actions/channelsActions");

module.exports =
{
	getChannels: function(providerId)
	{
		request.get("http://5a9107ddfcef4c5187c5df19c47d4639.cloudapp.net/providers/" + providerId + "/channels")
			   .end(function(err, res)
			   {
			   		if(err)
			   		{
			   			ACTIONS_Channels.loadChannels_Api_Failure(err);
			   		}
			   		else
			   		{
		 		        ACTIONS_Channels.loadChannels_Api_Success(res.body);
			   		}
			   });
	}
};
