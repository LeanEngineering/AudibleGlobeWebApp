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

        "getStories",
        "updateStory",
        "addStory"
    ];

    var actions = {};

    actionNames.forEach(function(action) { actions[action] = Reflux.createAction(); });

    return actions;
});
