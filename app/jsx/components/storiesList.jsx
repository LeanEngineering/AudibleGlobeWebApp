/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/storiesActions"
],
function (_, Backbone, React, Reflux, ACTIONS_Stories)
{
    return React.createClass(
    {
        render: function()
        {
            var stories = _.map(this.props.stories, this._createStoriesDom);

            return (
                <div>
                    <h2>Stories</h2>
                    <ul>
                        {stories}
                    </ul>
                </div>
            )
        },

        /* Private Helpers */

        _createStoriesDom: function(story)
        {
            var storyLink = "#/providers/" + this.props.providerId + "/channels/" + this.props.channelId + "/stories/" + story.StoryId + "/edit";
            return <li key={story.StoryId}><a href={storyLink}>{story.StoryTitle}</a><span className="glyphicon glyphicon-remove" onClick={this._onDeleteStory.bind(this, story.StoryId)}></span></li>
        },

        _onDeleteStory: function(storyId)
        {
            ACTIONS_Stories.deleteStory(storyId);
        }
    });
});
