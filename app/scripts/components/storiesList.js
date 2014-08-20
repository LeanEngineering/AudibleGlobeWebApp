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
                React.DOM.div(null, 
                    React.DOM.h2(null, "Stories"),
                    React.DOM.ul(null, 
                        stories
                    )
                )
            )
        },

        /* Private Helpers */

        _createStoriesDom: function(story)
        {
            var storyLink = window.location + "/stories/" + story.StoryId;
            return React.DOM.li( {key:story.StoryId}, React.DOM.a( {href:storyLink}, story.StoryTitle),React.DOM.span( {className:"glyphicon glyphicon-remove", onClick:this._onDeleteStory.bind(this, story.StoryId)}))
        },

        _onDeleteStory: function(storyId)
        {
            ACTIONS.deleteStory(storyId);
        }
    });
});
