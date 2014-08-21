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
        "deleteStory",
        "updateStory"
    ];

    return Reflux.createActions(actionNames);
});

