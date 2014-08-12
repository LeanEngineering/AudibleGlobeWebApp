/** @jsx React.DOM */
define(
[
    "reflux"
],
function (Reflux)
{
    return {
        getProviders: Reflux.createAction(),
        addProvider: Reflux.createAction()
    }
});
