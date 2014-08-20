define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/actions"
],
function (_, Backbone, React, Reflux, ACTIONS)
{
    var StoryModel = Backbone.Model.extend(
    {
        idAttribute: "StoryId"
    });

    var StoriesCollection = Backbone.Collection.extend(
    {
        model: StoryModel,

        initialize: function(options)
        {
            this._providerId = options ? options.providerId : null;
            this._channelId = options ? options.channelId : null;
        },

        setChannel: function(providerId, channelId)
        {
            this._providerId = providerId;
            this._channelId = channelId;
        },

        url: function()
        {
            return "http://127.0.0.1/providers/" + this._providerId + "/channels/" + this._channelId + "/stories";
        }
    });

    return Reflux.createStore(
    {
        init: function()
        {
            this._stories = new StoriesCollection();

            this.listenTo(ACTIONS.getStories, this._onGetStories);
            this.listenTo(ACTIONS.addStory, this._onAddStory);
            this.listenTo(ACTIONS.deleteStory, this._onDeleteStory);
            this.listenTo(ACTIONS.updateStory, this._onUpdateStory);
        },

        setChannel: function(providerId, channelId)
        {
            this._stories.setChannel(providerId, channelId);
        },

        _onGetStories: function()
        {
            this._stories.fetch().done(function(data)
            {
                this.trigger(data);
            }.bind(this));
        },

        _onAddStory: function(story)
        {
            var onSuccess = function(data)
            {
                this.trigger(this._stories.toJSON());
            }.bind(this);

            this._stories.create(_.extend(story, { StoryChannelId: this._stories._channelId }),
                                 { wait: true, success: onSuccess });
        },

        _onDeleteStory: function(storyId)
        {
            this._stories.get(storyId).destroy().always(function()
            {
                this.trigger(this._stories.toJSON());
            }.bind(this));
        },

        _onUpdateStory: function(story)
        {
           var onSuccess = function(data)
            {
                this.trigger(this._stories.toJSON());
            }.bind(this);
            
            var existingStory = this._stories.get(story.StoryId);

            if(!existingStory)
            {
                throw new Error("No matching story found in collection.");
            }

            existingStory.attributes = _.merge(existingStory.attributes, story);
            existingStory.save().done(onSuccess);
        }
    });
});
