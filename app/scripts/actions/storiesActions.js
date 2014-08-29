/** @jsx React.DOM */
define(
[
    "reflux"
],
function (Reflux)
{
    var actionNames =
    [
        "exploreStories",
        "exploreStories_Api_Success",
        "exploreStories_Api_Failure",
        
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

