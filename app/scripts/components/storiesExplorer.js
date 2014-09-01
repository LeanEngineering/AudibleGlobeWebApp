/** @jsx React.DOM */

var $ = require("jquery");
var _ = require("lodash");
var React = require("react");
var Reflux = require("reflux");
var L = require("leaflet");

var ACTIONS_Stories = require("../actions/storiesActions");
var storiesStore = require("../stores/storiesStore");

var StoriesExplorerList = React.createClass(
{
    render: function()
    {
        return (
            <div>
                <h3>Nearby Stories</h3>
                <ul>
                </ul>
            </div>
        );
    }
});

var StoriesExplorer = React.createClass(
{
    getInitialState: function()
    {
        return { lat: null, lon: null, radius: 100, stories: [] }
    },

    componentWillMount: function()
    {
        L.Icon.Default.imagePath = "../node_modules/leaflet/dist/images";

        storiesStore.listen(this._updateStateFromStore);
    },

    componentDidMount: function()
    {
        this._map = L.map($(this.getDOMNode()).find(".exploreStoriesMapContainer")[0]);

        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        {
            attribution: "",
            maxZoom: 18
        }).addTo(this._map);

        this._map.on("dragend", _.debounce(function(e)
        {
            var mapCenter = this._map.getCenter();
            ACTIONS_Stories.exploreStories({ lat: mapCenter.lat, lon: mapCenter.lng });
        }.bind(this), 100));

        this._map.on("locationfound", this._onLocationFound);
        this._map.on("locationerror", alert);

        this._map.locate({ setView: true, maxZoom: 16 });
    },

    _updateStateFromStore: function(storeState)
    {
        this.setState(
        {
            stories: storeState.data.stories,
            lat: storeState.data.latLon.lat,
            lon: storeState.data.latLon.lon
        });
    },

    _onLocationFound: function(e)
    {
        ACTIONS_Stories.exploreStories({ lat: e.latlng.lat, lon: e.latlng.lng });

        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(this._map).bindPopup("You are within " + radius + " meters from this point").openPopup();
        L.circle(e.latlng, radius).addTo(this._map);
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
            <div className="storiesExplorerContainer fullHeightContainer">
                <div className="col-md-10 exploreStoriesMapContainer fullHeightContainer" />
                <div className="col-md-2 exploreStoriesListContainer fullHeightContainer">
                    <StoriesExplorerList />
                </div>
            </div>
        );
	}
});

module.exports = StoriesExplorer;
