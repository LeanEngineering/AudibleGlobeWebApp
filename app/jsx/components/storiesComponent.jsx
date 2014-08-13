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
                <form className="form-horizontal">
                    <fieldset>
                        <legend>New Story</legend>

                        <div className="control-group">
                          <label className="control-label" htmlFor="storyTitleInput">Story Title</label>
                          <div className="controls">
                            <input id="storyTitleInput" name="storyTitleInput" type="text" placeholder="Story Title" className="input-xlarge" required=""></input>

                          </div>
                        </div>

                        <div className="control-group">
                          <label className="control-label" htmlFor="storyDescriptionInput">Story Description</label>
                          <div className="controls">
                            <textarea id="storyDescriptionInput" name="storyDescriptionInput" defaultValue="Description..."></textarea>
                          </div>
                        </div>

                        <div className="control-group">
                          <label className="control-label" htmlFor="storyLatitudeInput">Latitude</label>
                          <div className="controls">
                            <input id="storyLatitudeInput" name="storyLatitudeInput" type="text" placeholder="Lat" className="input-medium" required=""></input>

                          </div>
                        </div>

                        <div className="control-group">
                          <label className="control-label" htmlFor="storyLongitudeInput">Longitude</label>
                          <div className="controls">
                            <input id="storyLongitudeInput" name="storyLongitudeInput" type="text" placeholder="Lon" className="input-medium" required=""></input>

                          </div>
                        </div>

                        <div className="control-group">
                          <label className="control-label" htmlFor="storyAudioFileInput">Audio File</label>
                          <div className="controls">
                            <input id="storyAudioFileInput" name="storyAudioFileInput" className="input-file" type="file"></input>
                          </div>
                        </div>

                        <div className="control-group">
                          <label className="control-label" htmlFor="newStoryButton"></label>
                          <div className="controls">
                            <button type="button" name="newStoryButton" className="btn btn-primary" onClick={this._onGoClicked}>Create New Story</button>
                          </div>
                        </div>
                    </fieldset>
                </form>
            );
        },

        _onGoClicked: function()
        {
            // ;
            var newStory =
            {
                StoryTitle: $(this.getDOMNode()).find("input[name='storyTitleInput']").val(),
                StoryDescription: $(this.getDOMNode()).find("textarea[name='storyDescriptionInput']").val(),
                StoryCoordinates:
                {
                    Latitude: $(this.getDOMNode()).find("input[name='storyLatitudeInput']").val(),
                    Longitude: $(this.getDOMNode()).find("input[name='storyLongitudeInput']").val()
                }
            };

            ACTIONS.addStory(newStory);
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
            storiesStore.setChannel(providerId, channelId);
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

