/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react");
var Reflux = require("reflux");

var ACTIONS_Stories = require("../actions/storiesActions");
var storiesStore = require("../stores/storiesStore");

var StoryForm = React.createClass(
{
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function()
    {
        return {
            StoryId: null,
            StoryTitle: "",
            StoryDescription: "",
            StoryChannelId: null,
            Latitude: null,
            Longitude: null
        }
    },

    componentWillReceiveProps: function(nextProps)
    {
        if(this.props.status !== "error" && nextProps.status === "error")
        {
            this.setState(this._saving);
        }
        else
        {
            this.setState(nextProps.story);
        }
    },

    render: function()
    {
        var buttonText = this.props.status === "inprogress" ? "Saving..." : "Save";
        var errorMessage = this.props.status === "error" ? "Error saving story. Please try again." : "";

        return (
            <form className="form-horizontal">
                <fieldset className="">
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
                      <label className="control-label" htmlFor="newStoryButton">{errorMessage}</label>
                      <div className="controls">
                        <button type="button" name="newStoryButton" className="btn btn-primary" onClick={this._onGoClicked}>{buttonText}</button>
                      </div>
                    </div>
                </fieldset>
            </form>
        );
    },

    _onGoClicked: function()
    {
        if(!this.state.StoryId)
        {
            this._saving = _.merge({}, this.state);
            ACTIONS_Stories.addStory({ providerId: this.props.providerId, channelId: this.props.channelId, newStory: this.state });
        }
        else
        {
            ACTIONS_Stories.updateStory({ providerId: this.props.providerId, channelId: this.props.channelId, story: this.state });
        }
    }
});

var Map = React.createClass(
{
    componentDidMount: function()
    {
        L.Icon.Default.imagePath = "../node_modules/leaflet/dist/images";

        this.map = L.map(this.getDOMNode());

        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        {
            attribution: "",
            maxZoom: 18
        }).addTo(this.map);

        this.marker = L.marker([ 40, 10 ]).addTo(this.map);

        this.map.on("click", this._onMapClicked);
    },

    componentWillReceiveProps: function(nextProps)
    {
        if(nextProps && nextProps.lat && nextProps.lon)
        {
            this.map.setView([ nextProps.lat, nextProps.lon ], this.map.getZoom() || 13 );
            this.marker.setLatLng(L.latLng(nextProps.lat, nextProps.lon));
        }
    },

    _onMapClicked: function(e)
    {
        var lat = e.latlng.lat;
        var lon = e.latlng.lng;

        this.props.onLatLonChanged({ lat: lat, lon: lon });
    },

    getMapCenter: function()
    {
        return this._map.getCenter();
    },

    render: function()
    {
        return <div className="storyEditorMapContainer"></div>;
    }
});

var StoryEditor = React.createClass(
{
	getInitialState: function()
	{
		return {
            story:
            {
    			StoryTitle: "",
    			StoryDescription: "",
    			StoryChannelId: this.props.channelId,
    			Latitude: 10.0,
    			Longitude: 100.0
            }
		}
	},

	componentWillReceiveProps: function(nextProps)
	{
		if(nextProps.story)
		{
            this.state.story = nextProps.story;
		}
	},

    _onLatLonChanged: function(latLon)
    {
        var newState = _.merge(this.state, { story: { Latitude: latLon.lat, Longitude: latLon.lon } });
        this.setState(newState);
    },

    render: function()
    {
        return (
        	<div className="storyEditorComponentContainer fullHeightContainer row">
                <div className="col-md-6 storyEditorFormContainer">
	                <StoryForm story={this.state.story} status={this.props.status} providerId={this.props.providerId} channelId={this.props.channelId} />
                </div>
                <div className="col-md-6 fullHeightContainer" >
                    <Map lat={this.state.story.Latitude} lon={this.state.story.Longitude} onLatLonChanged={this._onLatLonChanged} />
                </div>
            </div>
        );
    }
});

module.exports = StoryEditor;
