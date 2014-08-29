/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react");
var Reflux = require("reflux");
var L = require("leaflet");

var ACTIONS_Stories = require("../actions/storiesActions");
var storiesStore = require("../stores/storiesStore");

var StoriesExplorer = React.createClass(
{
    getInitialState: function()
    {
        return { lat: null, lon: null, radius: 100, stories: [] }
    },

    componentWillMount: function()
    {
        storiesStore.listen(this._updateStateFromStore);

        navigator.geolocation.getCurrentPosition(function(position)
        {
            ACTIONS_Stories.exploreStories({ lat: position.coords.latitude, lon: position.coords.longitude });
        }, function(error)
        {
            console.log(error);
        });
    },

    componentDidMount: function()
    {
        this._map = L.map(this.getDOMNode());

        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        {
            attribution: "",
            maxZoom: 18
        }).addTo(this._map);

        this._map.on("dragend", function(e)
        {
            var mapCenter = this._map.getCenter();
            ACTIONS_Stories.exploreStories({ lat: mapCenter.lat, lon: mapCenter.lng });
        }.bind(this));
    },

    _updateStateFromStore: function(data)
    {
        this.setState(
        {
            stories: data.stories,
            lat: data.latLon.lat,
            lon: data.latLon.lon
        });
    },

    _createMarkersForStories: function(stories)
    {
        _.each(this._markers, function(marker) { });

        this._markers = _.map(stories, function(story)
        {
            return L.marker([ story.Latitude, story.Longitude ]).addTo(this._map);
        }.bind(this));
    },

	render: function()
	{
        if(this._map)
        {
            this._map.setView([ this.state.lat, this.state.lon ], this._map.getZoom() || 13);
            this._createMarkersForStories(this.state.stories);
        }

		return (
            <div className="exploreStoriesMapContainer"></div>
        );
	}
});

module.exports = StoriesExplorer;
