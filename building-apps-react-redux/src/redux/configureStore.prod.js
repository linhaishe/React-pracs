import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

//use CommonJS so that we can dynamically import during build time. We're going to look at the node environment to determine whether to load the production configuration or the dev configuration. This pattern assures that our dev‑related store configuration code isn't included in our production bundle. Now you might be wondering where the node environment is configured.
