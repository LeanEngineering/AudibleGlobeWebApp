var request = require("superagent");
var ACTIONS_Stories = require("../actions/storiesActions");

module.exports =
{
	getStoriesNearby: function(lat, lon, radius)
	{
		request.get("http://5a9107ddfcef4c5187c5df19c47d4639.cloudapp.net/stories/" + lat + "," + lon + "/within/" + radius)
			   .end(function(err, res)
			   {
			   		if(err)
			   		{
			   			ACTIONS_Stories.exploreStories_Api_Failure(err);
			   		}
			   		else
			   		{
		 		        ACTIONS_Stories.exploreStories_Api_Success(res.body);
			   		}				   	
			   });
	},

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
	},

	updateStory: function(providerId, channelId, story)
	{
		request.put("http://5a9107ddfcef4c5187c5df19c47d4639.cloudapp.net/providers/" + providerId + "/channels/" + channelId + "/stories/" + story.StoryId)
			   .send(story)
			   .end(function(err, res)
			   {
					if(err)
			   		{
			   			ACTIONS_Stories.updateStory_Api_Failure(err);
			   		}
			   		else
			   		{
			   			// TODO: DO NOT RETURN THE INPUT STORY!!! Need to return object in PUT endpoint in API and return that one.
		 		        ACTIONS_Stories.updateStory_Api_Success(story);
			   		}
			   });
	}
};
