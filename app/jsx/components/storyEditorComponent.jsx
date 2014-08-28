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
function (_, Backbone, React, Reflux, ACTIONS_Stories, storiesStore)
{
    var Map = React.createClass(
    {
        componentDidMount: function()
        {
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
                this.map.setView([ nextProps.lat, nextProps.lon ], 13);
                this.marker.setLatLng(L.latLng(nextProps.lat, nextProps.lon));
            }
        },

        _onMapClicked: function(e)
        {
            var lat = e.latlng.lat;
            var lon = e.latlng.lng;

            this.props.onLatLonChanged({ lat: lat, lon: lon });
        },

        render: function()
        {
            return <div className="mapContainer"></div>;
        }
    });

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

    	componentWillReceiveProps: function(nextProps)
    	{
    		if(nextProps.story)
    		{
                this.state = nextProps.story;
    		}
    	},

        _onLatLonChanged: function(latLon)
        {
            this.setState({ Latitude: latLon.lat, Longitude: latLon.lon });
        },

        render: function()
        {
            var buttonText = this.props.status === "inprogress" ? "Saving..." : "Save";

            return (
            	<div className="storyEditorComponentContainer">
                    <div className="col-md-2">
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
    	                            <button type="button" name="newStoryButton" className="btn btn-primary" onClick={this._onGoClicked}>{buttonText}</button>
    	                          </div>
    	                        </div>
    	                    </fieldset>
    	                </form>
                    </div>
                    <div className="col-md-4">
                        <Map lat={this.state.Latitude} lon={this.state.Longitude} onLatLonChanged={this._onLatLonChanged} />
                    </div>
                </div>
            );
        },

        _onGoClicked: function()
        {
            if(this.state.StoryId === null)
        	{
            	ACTIONS_Stories.addStory(this.state);
            }
            else
            {
            	ACTIONS_Stories.updateStory({ providerId: this.props.providerId, channelId: this.props.channelId, story: this.state });
            }
        }
    });
});
