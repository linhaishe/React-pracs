// import React from "react";
// import { render } from "react-dom";

// function Hi() {
//   return (
//     <div>
//       <p>hi</p>
//     </div>
//   );
// }

// render(<Hi />, document.getElementById("app"));

import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();
//we've set up our store configuration, and now we need to update our app's entry point to instantiate our store.

//it can be useful to pass initial state into the store here if you are server rendering or initializing your redux store with data from localstorage

// Well, if you're wanting to re‑hydrate your store using some separate state that's passed down from the server or stored in local storage, then this would be a good place to do so.

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,

  document.getElementById("app")
);
