/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/actions",

    "components/storiesList",
    "components/storyEditorComponent",

    "stores/storiesStore",

    "leaflet"
],
function (_, Backbone, React, Reflux, ACTIONS, StoriesList, StoryEditor, storiesStore, L)
{
    var Map = React.createClass(
    {
        componentDidMount: function()
        {
            L.Map(this.getDOMNode());
        },

        render: function()
        {
            return <div></div>
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
            var selectedStory = _(this.state.stories).find({ StoryId: this.props.storyId });

            return (
                <div>
                    {selectedStory ? "" : <StoriesList stories={this.state.stories} />}
                    <div className="row">
                        <div className="col-md-4">
                            <h3>{selectedStory ? "Edit Story" : "New Story"}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <StoryEditor story={selectedStory} />
                        </div>
                        <div className="col-md-2">
                            <Map story={selectedStory} className="col-md-2 storyMapContainer" />
                        </div>
                    </div>
                </div>
            );
        }
    });
});

