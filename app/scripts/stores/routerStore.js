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


    return Reflux.createStore(
    {
        init: function()
        {
            new AppRouter({ controller: this });
            Backbone.history.start();
        }
    });
});
