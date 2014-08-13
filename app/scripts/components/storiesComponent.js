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
    {displayName: 'NewStoryInput',
        render: function()
        {
            return (
                React.DOM.div(null, 
                    React.DOM.h3(null, "Add New Story"),
                    React.DOM.label( {htmlFor:"newStoryInput"}, "Story Name"),
                    React.DOM.input( {name:"newStoryName", type:"text"}),
                    React.DOM.label( {htmlFor:"newStoryDescription"}, "Story Description"),
                    React.DOM.input( {name:"newStoryDescription", type:"text"}),
                    React.DOM.label( {htmlFor:"newStoryFile"}, "Audio File"),
                    React.DOM.input( {name:"newStoryFile", type:"file"}),
                    React.DOM.button( {onClick:this._onGoClicked}, "GO")
                )
            );
        },

        _onGoClicked: function()
        {
            // $(this.getDOMNode()).find("input").val());
            ACTIONS.addStory({});
        }
    });

    var StoryCounter = React.createClass(
    {displayName: 'StoryCounter',
        render: function()
        {
            return (
                React.DOM.span(null, "Number of Channels: ", this.props.stories.length)
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
                React.DOM.div(null, 
                    React.DOM.span(null, React.DOM.button( {onClick:this._onBackClicked}, "Back to all Channels")),
                    StoriesList( {stories:this.state.stories} ),
                    NewStoryInput(null ),
                    StoryCounter( {stories:this.state.stories} )
                )
            );
        },

        /* Private DOM Event Handlers */
        _onBackClicked: function()
        {
            window.history.back();
        }
    });
});

