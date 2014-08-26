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
        "addStory",
        "deleteStory",
        "updateStory"
    ];

    return Reflux.createActions(actionNames);
});

