//redux only has one store

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialState) {
  //add support for redux dev tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
    //Redux middleware is a way to enhance Redux with extra functionality.

    //reduxImmutableStateInvariant: will warn us if we accidentally mutate redux state

    //So composeEnhancers calls applyMiddleware and reduxImmutableStateInvariant is a piece of middleware that we're using. And now we'll be able to interact with our Redux store using the Redux dev tools in the browser.
  );
}
