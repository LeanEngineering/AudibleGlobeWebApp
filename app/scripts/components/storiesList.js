/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react");
var Reflux = require("reflux");

var ACTIONS_Stories = require("../actions/storiesActions");

var StoriesList = React.createClass(
{
    render: function()
    {
        var stories = _.map(this.props.stories, this._createStoriesDom);

        return (
            <div className="storiesListContainer">
                <ul>
                    {stories}
                </ul>
            </div>
        )
    },

    _createStoriesDom: function(story)
    {
        var storyLink = "#/providers/" + this.props.providerId + "/channels/" + this.props.channelId + "/stories/" + story.StoryId + "/edit";
        return <li key={story.StoryId}><a href={storyLink}>{story.StoryTitle}</a></li>
    }
});

module.exports = StoriesList;
