/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/storiesActions",

    "components/storiesList",
    "components/storyEditorComponent",

    "stores/storiesStore",

    "leaflet"
],
function (_, Backbone, React, Reflux, ACTIONS_Stories, StoriesList, StoryEditor, storiesStore, L)
{
    var StoryMap = React.createClass(
    {
        componentWillMount: function()
        {
            // L.map(this.getDOMNode());
        },

        render: function()
        {
            return null;
        }
    });

    return React.createClass(
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
                        <div className="col-md-4">
                            <h3>Edit Story</h3>
                            <StoryEditor story={selectedStory} providerId={this.props.params.providerId} channelId={this.props.params.channelId} status={this.state.storeStatus} />
                        </div>
                        <div className="col-md-4">
                            <StoryMap story={selectedStory} />
                        </div>
                    </div>
                );
            }
            else if(this.props.action === "new")
            {
                components =
                (
                    <div>
                        <div className="col-md-4">
                            <h3>Create New Story</h3>
                            <StoryEditor story={null} />
                        </div>
                        <div className="col-md-4">
                            <StoryMap story={null} />
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
});

