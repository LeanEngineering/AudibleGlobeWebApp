/** @jsx React.DOM */
define(
[
    "reflux"
],
function (Reflux)
{
    var actionNames =
    [
        "getProviders",
        "addProvider",

        "getChannels",
        "updateChannel",
        "addChannel",
        "deleteChannel",

        "getStories",
        "updateStory",
        "addStory",
        "deleteStory"
    ];

    var actions = {};

    actionNames.forEach(function(action) { actions[action] = Reflux.createAction(); });

    return actions;
});
