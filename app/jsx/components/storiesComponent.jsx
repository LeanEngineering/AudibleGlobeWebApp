/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/actions",

    "components/storiesList",

    "stores/storiesStore"
],
function (_, Backbone, React, Reflux, ACTIONS, StoriesList, storiesStore)
{
    var NewStoryInput = React.createClass(
    {
        render: function()
        {
            return (
                <div>
                    <h3>Add New Story</h3>
                    <label htmlFor="newStoryInput">Story Name</label>
                    <input name="newStoryName" type="text"></input>
                    <label htmlFor="newStoryDescription">Story Description</label>
                    <input name="newStoryDescription" type="text"></input>
                    <label htmlFor="newStoryFile">Audio File</label>
                    <input name="newStoryFile" type="file"></input>
                    <button onClick={this._onGoClicked}>GO</button>
                </div>
            );
        },

        _onGoClicked: function()
        {
            // $(this.getDOMNode()).find("input").val());
            ACTIONS.addStory({});
        }
    });

    var StoryCounter = React.createClass(
    {
        render: function()
        {
            return (
                <span>Number of Channels: {this.props.stories.length}</span>
            );
        }
    });

    return React.createClass(
    {
        _setupStories: function(providerId, channelId)
        {
            storiesStore.setChannel({ providerId: providerId, channelId: channelId });
            ACTIONS.getStories();
        },

        getInitialState: function()
        {
            return { stories: []  }
        },

        componentWillMount: function()
        {
            this.unsubscribe = [];

            this.unsubscribe.push(storiesStore.listen(function(data)
            {
                this.setState({ stories: data });
            }.bind(this)).bind(this));

            this._setupStories(this.props.providerId, this.props.channelId);
        },

        componentWillReceiveProps: function(nextProps)
        {
            this._setupStories(nextProps.providerId, nextProps.channelId);
        },

        componentWillUnmount: function()
        {
            this.unsubscribe.forEach(function(fn) { fn(); });
        },

        render: function()
        {
            return (
                <div>
                    <span><button onClick={this._onBackClicked}>Back to all Channels</button></span>
                    <StoriesList stories={this.state.stories} />
                    <NewStoryInput />
                    <StoryCounter stories={this.state.stories} />
                </div>
            );
        },

        /* Private DOM Event Handlers */
        _onBackClicked: function()
        {
            window.history.back();
        }
    });
});

