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
                React.DOM.form( {className:"form-horizontal"}, 
                    React.DOM.fieldset(null, 
                        React.DOM.legend(null, "New Story"),

                        React.DOM.div( {className:"control-group"}, 
                          React.DOM.label( {className:"control-label", htmlFor:"storyTitleInput"}, "Story Title"),
                          React.DOM.div( {className:"controls"}, 
                            React.DOM.input( {id:"storyTitleInput", name:"storyTitleInput", type:"text", placeholder:"Story Title", className:"input-xlarge", required:""})

                          )
                        ),

                        React.DOM.div( {className:"control-group"}, 
                          React.DOM.label( {className:"control-label", htmlFor:"storyDescriptionInput"}, "Story Description"),
                          React.DOM.div( {className:"controls"}, 
                            React.DOM.textarea( {id:"storyDescriptionInput", name:"storyDescriptionInput", defaultValue:"Description..."})
                          )
                        ),

                        React.DOM.div( {className:"control-group"}, 
                          React.DOM.label( {className:"control-label", htmlFor:"storyLatitudeInput"}, "Latitude"),
                          React.DOM.div( {className:"controls"}, 
                            React.DOM.input( {id:"storyLatitudeInput", name:"storyLatitudeInput", type:"text", placeholder:"Lat", className:"input-medium", required:""})

                          )
                        ),

                        React.DOM.div( {className:"control-group"}, 
                          React.DOM.label( {className:"control-label", htmlFor:"storyLongitudeInput"}, "Longitude"),
                          React.DOM.div( {className:"controls"}, 
                            React.DOM.input( {id:"storyLongitudeInput", name:"storyLongitudeInput", type:"text", placeholder:"Lon", className:"input-medium", required:""})

                          )
                        ),

                        React.DOM.div( {className:"control-group"}, 
                          React.DOM.label( {className:"control-label", htmlFor:"storyAudioFileInput"}, "Audio File"),
                          React.DOM.div( {className:"controls"}, 
                            React.DOM.input( {id:"storyAudioFileInput", name:"storyAudioFileInput", className:"input-file", type:"file"})
                          )
                        ),

                        React.DOM.div( {className:"control-group"}, 
                          React.DOM.label( {className:"control-label", htmlFor:"newStoryButton"}),
                          React.DOM.div( {className:"controls"}, 
                            React.DOM.button( {type:"button", name:"newStoryButton", className:"btn btn-primary", onClick:this._onGoClicked}, "Create New Story")
                          )
                        )
                    )
                )
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

