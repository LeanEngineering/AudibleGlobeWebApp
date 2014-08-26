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

            this.listenTo(ACTIONS_Stories.updateStory, this._onUpdateStory);
            this.listenTo(ACTIONS_Stories.updateStory_Api_Success, this._onUpdateStoryApiSuccess);
            this.listenTo(ACTIONS_Stories.updateStory_Api_Failure, this._onUpdateStoryApiFailure);
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
        },

        _onUpdateStory: function(options)
        {
            StoriesApi.updateStory(options.providerId, options.channelId, options.story);

            var i = _(this._stories).findIndex({ StoryId: options.story.StoryId });
            this._stories[i] = options.story;

            this._state =
            {
                status: "inprogress",
                data:
                {
                    stories: this._stories
                }
            };

            this.trigger(this._state);
        },

        _onUpdateStoryApiSuccess: function(story)
        {
            var i = _(this._stories).findIndex({ StoryId: story.StoryId });
            this._stories[i] = story;

            this._state =
            {
                status: "ok",
                data:
                {
                    error: null,
                    stories: this._stories
                }
            };

            this.trigger(this._state);
        },

        _onUpdateStoryApiFailure: function(error)
        {
            this._state =
            {
                status: "error",
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
