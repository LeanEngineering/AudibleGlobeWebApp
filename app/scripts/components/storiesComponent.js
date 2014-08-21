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
    {displayName: 'Map',
        componentDidMount: function()
        {
            L.Map(this.getDOMNode());
        },

        render: function()
        {
            return React.DOM.div(null)
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
                React.DOM.div(null, 
                    selectedStory ? "" : StoriesList( {stories:this.state.stories} ),
                    React.DOM.div( {className:"row"}, 
                        React.DOM.div( {className:"col-md-4"}, 
                            React.DOM.h3(null, selectedStory ? "Edit Story" : "New Story")
                        )
                    ),
                    React.DOM.div( {className:"row"}, 
                        React.DOM.div( {className:"col-md-2"}, 
                            StoryEditor( {story:selectedStory} )
                        ),
                        React.DOM.div( {className:"col-md-2"}, 
                            Map( {story:selectedStory, className:"col-md-2 storyMapContainer"} )
                        )
                    )
                )
            );
        }
    });
});

