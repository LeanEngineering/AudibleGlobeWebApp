var _ = require("lodash");
var React = require("react");
var Reflux = require("reflux");

var ACTIONS_Stories = require("../actions/storiesActions");
var StoriesApi = require("../apis/storiesApi");

module.exports = Reflux.createStore(
{
    init: function()
    {
        this._stories = [];
        this._state = {};

        this.listenTo(ACTIONS_Stories.exploreStories, this._onExploreStories);
        this.listenTo(ACTIONS_Stories.exploreStories_Api_Success, this._onExploreStories_Api_Success);
        this.listenTo(ACTIONS_Stories.exploreStories_Api_Failure, this._onExploreStories_Api_Failure);

        this.listenTo(ACTIONS_Stories.loadStories, this._onLoadStories);
        this.listenTo(ACTIONS_Stories.loadStories_Api_Success, this._onLoadStoriesApiSuccess);
        this.listenTo(ACTIONS_Stories.loadStories_Api_Failure, this._onLoadStoriesApiFailure);

        this.listenTo(ACTIONS_Stories.updateStory, this._onUpdateStory);
        this.listenTo(ACTIONS_Stories.updateStory_Api_Success, this._onUpdateStoryApiSuccess);
        this.listenTo(ACTIONS_Stories.updateStory_Api_Failure, this._onUpdateStoryApiFailure);
    },

    _onExploreStories: function(latLon)
    {
        StoriesApi.getStoriesNearby(latLon.lat, latLon.lon, 100);

        this._state.latLon =
        {
            lat: latLon.lat,
            lon: latLon.lon
        };
    },

    _onExploreStories_Api_Success: function(data)
    {
        this._state = _.merge(this._state,
        {
            valid: true,
            data:
            {
                stories: data
            }
        });

        this.trigger(this._state);
    },

    _onExploreStories_Api_Failure: function(error)
    {

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
