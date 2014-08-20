/** @jsx React.DOM */
define(
[
    "underscore",
    "backbone",
    "react",
    "reflux",

    "actions/actions"
],
function (_, Backbone, React, Reflux, ACTIONS)
{
    return React.createClass(
    {
        render: function()
        {
            var stories = _.map(this.props.stories, this._createStoriesDom);

            return (
                <div>
                    <h2>Stories for Channel {this.props.channelId}</h2>
                    <div>
                        {stories}
                    </div>
                </div>
            )
        },

        /* Private Helpers */

        _createStoriesDom: function(story)
        {
            var storyLink = window.location + "/stories/" + story.StoryId;
            return <li key={story.StoryId}><a href={storyLink}>{story.StoryTitle}</a><span className="glyphicon glyphicon-remove" onClick={this._onDeleteStory.bind(this, story.StoryId)}></span></li>
        },

        _onDeleteStory: function(storyId)
        {
            ACTIONS.deleteStory(storyId);
        }
    });
});
