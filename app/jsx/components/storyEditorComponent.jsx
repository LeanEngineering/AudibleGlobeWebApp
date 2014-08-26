/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/storiesActions",

    "stores/storiesStore",

    "leaflet"
],
function (_, Backbone, React, Reflux, ACTIONS_Stories, storiesStore, L)
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
            	<div className="storyEditorComponentContainer">
	                <form className="form-horizontal">
	                    <fieldset>
	                        <div className="control-group">
	                          <label className="control-label" htmlFor="storyTitleInput">Story Title</label>
	                          <div className="controls">
	                            <input id="storyTitleInput" name="storyTitleInput" type="text" placeholder="Story Title" className="input-xlarge" required="" valueLink={this.linkState("StoryTitle")}></input>
	                          </div>
	                        </div>

	                        <div className="control-group">
	                          <label className="control-label" htmlFor="storyDescriptionInput">Story Description</label>
	                          <div className="controls">
	                            <textarea id="storyDescriptionInput" name="storyDescriptionInput" valueLink={this.linkState("StoryDescription")}></textarea>
	                          </div>
	                        </div>

	                        <div className="control-group">
	                          <label className="control-label" htmlFor="storyLatitudeInput">Latitude</label>
	                          <div className="controls">
	                            <input id="storyLatitudeInput" name="storyLatitudeInput" type="text" placeholder="Lat" className="input-medium" required="" valueLink={this.linkState("Latitude")}></input>
	                          </div>
	                        </div>

	                        <div className="control-group">
	                          <label className="control-label" htmlFor="storyLongitudeInput">Longitude</label>
	                          <div className="controls">
	                            <input id="storyLongitudeInput" name="storyLongitudeInput" type="text" placeholder="Lon" className="input-medi/*um" required="" valueLink={this.linkState("Longitude")}></input>
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
	                            <button type="button" name="newStoryButton" className="btn btn-primary" onClick={this._onGoClicked}>Save</button>
	                          </div>
	                        </div>
	                    </fieldset>
	                </form>
	                <div className="storyEditorMapContainer">
	                </div>
                </div>
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
