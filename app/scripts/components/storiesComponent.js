/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react");
var Reflux = require("reflux");
var L = require("leaflet");

var ACTIONS_Stories = require("../actions/storiesActions");
var StoriesList = require("./storiesList");
var StoryEditor = require("./storyEditorComponent");

var storiesStore = require("../stores/storiesStore");

var StoriesComponent = React.createClass(
{
    getInitialState: function()
    {
        return { stories: []  }
    },

    componentWillMount: function()
    {
        this.unsubscribe = [];

        this.unsubscribe.push(storiesStore.listen(this._updateStateFromStore));

        ACTIONS_Stories.loadStories({ providerId: this.props.params.providerId, channelId: this.props.params.channelId });
    },

    componentWillReceiveProps: function(nextProps)
    {
        ACTIONS_Stories.loadStories({ providerId: nextProps.params.providerId, channelId: nextProps.params.channelId });
    },

    componentWillUnmount: function()
    {
        this.unsubscribe.forEach(function(fn) { fn(); });
    },

    _updateStateFromStore: function(storeState)
    {
        if(storeState.valid || storeState.status === "inprogress" || storeState.status === "ok")
        {
            this.setState({ stories: storeState.data.stories, storeStatus: storeState.status });
        }
    },

    render: function()
    {
        var components = "";

        if(this.props.action === "edit")
        {
            var selectedStory = _(this.state.stories).find({ StoryId: parseInt(this.props.params.storyId, 10) });
            components =
            (
                <div>
                    <div className="col-md-8">
                        <h3>Edit Story</h3>
                        <StoryEditor story={selectedStory} providerId={this.props.params.providerId} channelId={this.props.params.channelId} status={this.state.storeStatus} />
                    </div>
                </div>
            );
        }
        else if(this.props.action === "new")
        {
            components =
            (
                <div>
                    <div className="col-md-8">
                        <h3>Create New Story</h3>
                        <StoryEditor story={null} />
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <StoriesList stories={this.state.stories} providerId={this.props.params.providerId} channelId={this.props.params.channelId} />
                    </div>
                    {components}
                </div>
            </div>
        );
    }
});

module.exports = StoriesComponent;
