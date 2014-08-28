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
    {displayName: 'StoryMap',
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
                    React.DOM.div(null, 
                        React.DOM.div( {className:"col-md-8"}, 
                            React.DOM.h3(null, "Edit Story"),
                            StoryEditor( {story:selectedStory, providerId:this.props.params.providerId, channelId:this.props.params.channelId, status:this.state.storeStatus} )
                        )
                    )
                );
            }
            else if(this.props.action === "new")
            {
                components =
                (
                    React.DOM.div(null, 
                        React.DOM.div( {className:"col-md-8"}, 
                            React.DOM.h3(null, "Create New Story"),
                            StoryEditor( {story:null} )
                        )
                    )
                );
            }

            return (
                React.DOM.div(null, 
                    React.DOM.div( {className:"row"}, 
                        React.DOM.div( {className:"col-md-2"}, 
                            StoriesList( {stories:this.state.stories, providerId:this.props.params.providerId, channelId:this.props.params.channelId} )
                        ),
                        components
                    )
                )
            );
        }
    });
});

