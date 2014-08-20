/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/actions",

    "stores/storiesStore",

    "leaflet"
],
function (_, Backbone, React, Reflux, ACTIONS, storiesStore, L)
{
	return React.createClass(
    {
    	mixins: [React.addons.LinkedStateMixin],

    	getInitialState: function()
    	{
    		return {
	    			StoryTitle: "",
	    			StoryDescription: "",
	    			StoryChannelId: null,
	    			Latitude: null,
	    			Longitude: null
    		}
    	},

    	componentDidMount: function()
    	{
    		// L.map(this.getDOMNode()).setView([51.505, -0.09], 13);
    	},

    	componentWillReceiveProps: function(nextProps)
    	{
    		if(!nextProps.story)
    		{
    			return;
    		}

    		this.state = nextProps.story;
    	},

        render: function()
        {
            return (
            	React.DOM.div( {className:"storyEditorComponentContainer"}, 
	                React.DOM.form( {className:"form-horizontal"}, 
	                    React.DOM.fieldset(null, 
	                        React.DOM.div( {className:"control-group"}, 
	                          React.DOM.label( {className:"control-label", htmlFor:"storyTitleInput"}, "Story Title"),
	                          React.DOM.div( {className:"controls"}, 
	                            React.DOM.input( {id:"storyTitleInput", name:"storyTitleInput", type:"text", placeholder:"Story Title", className:"input-xlarge", required:"", valueLink:this.linkState("StoryTitle")})

	                          )
	                        ),

	                        React.DOM.div( {className:"control-group"}, 
	                          React.DOM.label( {className:"control-label", htmlFor:"storyDescriptionInput"}, "Story Description"),
	                          React.DOM.div( {className:"controls"}, 
	                            React.DOM.textarea( {id:"storyDescriptionInput", name:"storyDescriptionInput", valueLink:this.linkState("StoryDescription")})
	                          )
	                        ),

	                        React.DOM.div( {className:"control-group"}, 
	                          React.DOM.label( {className:"control-label", htmlFor:"storyLatitudeInput"}, "Latitude"),
	                          React.DOM.div( {className:"controls"}, 
	                            React.DOM.input( {id:"storyLatitudeInput", name:"storyLatitudeInput", type:"text", placeholder:"Lat", className:"input-medium", required:"", valueLink:this.linkState("Latitude")})

	                          )
	                        ),

	                        React.DOM.div( {className:"control-group"}, 
	                          React.DOM.label( {className:"control-label", htmlFor:"storyLongitudeInput"}, "Longitude"),
	                          React.DOM.div( {className:"controls"}, 
	                            React.DOM.input( {id:"storyLongitudeInput", name:"storyLongitudeInput", type:"text", placeholder:"Lon", className:"input-medi/*um", required:"", valueLink:this.linkState("Longitude")})

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
	                            React.DOM.button( {type:"button", name:"newStoryButton", className:"btn btn-primary", onClick:this._onGoClicked}, "Save")
	                          )
	                        )
	                    )
	                ),
	                React.DOM.div( {className:"storyEditorMapContainer"}
	                )
                )
            );
        },

        _onGoClicked: function()
        {
            if(this.state.StoryId === null)
        	{
            	ACTIONS.addStory(this.state);
            }
            else
            {
            	ACTIONS.updateStory(this.state);
            }
        }
    });
});
