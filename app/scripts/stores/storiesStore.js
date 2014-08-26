define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/storiesActions",

    "apis/storiesApi"
],
function (_, Backbone, React, Reflux, ACTIONS_Stories, StoriesApi)
{
    return Reflux.createStore(
    {
        init: function()
        {
            this._stories = [];

            this.listenTo(ACTIONS_Stories.loadStories, this._onLoadStories);
            this.listenTo(ACTIONS_Stories.loadStories_Api_Success, this._onLoadStoriesApiSuccess);
            this.listenTo(ACTIONS_Stories.loadStories_Api_Failure, this._onLoadStoriesApiFailure);
        },

        _onLoadStories: function(options)
        {
            StoriesApi.getStories(options.providerId, options.channelId);            

            this._state =
            {
                valid: true,
                data:
                {
                    stories: this._stories
                }
            };

            this.trigger(this._state);
        },

        _onLoadStoriesApiSuccess: function(data)
        {
            this._stories = data;

            this._state =
            {
                valid: true,
                data:
                {
                    error: null,
                    stories: this._stories
                }
            };

            this.trigger(this._state);
        },

        _onLoadStoriesApiFailure: function(error)
        {
            this._state =
            {
                valid: false,
                data:
                {
                    error: error,
                    stories: this._stories
                }
            };

            this.trigger(this._state);
        }
    });
});
