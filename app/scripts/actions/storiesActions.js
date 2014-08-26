/** @jsx React.DOM */
define(
[
    "reflux"
],
function (Reflux)
{
    var actionNames =
    [
        "loadStories",
        "loadStories_Api_Success",
        "loadStories_Api_Failure",

        "updateStory",
        "updateStory_Api_Success",
        "updateStory_Api_Failure",

        "addStory",
        "deleteStory",
        "updateStory"
    ];

    return Reflux.createActions(actionNames);
});

