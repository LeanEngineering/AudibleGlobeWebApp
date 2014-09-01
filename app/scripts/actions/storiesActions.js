var Reflux = require("reflux");

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
    "addStory_Api_Success",
    "addStory_Api_Failure",
    
    "deleteStory",
    "updateStory"
];

module.exports = Reflux.createActions(actionNames);
