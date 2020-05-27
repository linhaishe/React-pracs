import * as types from "../actions/actionTypes";
import initialState from "./initialState";

//this function will determine whether the action type ends in success by using sub string
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  //this is called when api calls begin
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
    //if the type ends in success,we will decrement the number of apicallsinprogress
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }
  return state;
}

//an action can be handled by mutiple reducers
// We're now handling the same action type in multiple reducers. For instance, load courses success will be handled by our course reducer, as well as our API status reducer. So remember, each reducer is simply a slice of state, so a given action may impact multiple reducers, and a given reducer will typically work with multiple actions. So there's a many to many relationship here. And this is why it's useful to keep your reducers and actions each in separate folders. Some people try to group actions and reducers together in feature folders, but I don't recommend it. Why? Because each action may be handled by multiple reducers. Actions and reducers shouldn't typically be tied to a single feature or portion of the app, so avoid placing them in feature folders.
//Doing so is a sign that you don't need to put that state in Redux at all.
