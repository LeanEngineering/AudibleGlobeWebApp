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
    var StoriesCollection = Backbone.Collection.extend(
    {
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
            return "http://127.0.0.1:81/providers/" + this._providerId + "/channels/" + this._channelId + "/stories";
        }
    });

    return Reflux.createStore(
    {
        init: function()
        {
            this._stories = new StoriesCollection();

            this.listenTo(ACTIONS.getStories, this._onGetStories);
            this.listenTo(ACTIONS.addStory, this._onAddStory);
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
        }
    });
});
