//这样的写法像JS，因为React webpack了方法，允许这样使用
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom";
//named import for react dom,create a const called render that references react-dom's render function
//equivalent to
// import ReactDOM from "react-dom";
// const render = ReactDOM.render;

// import HomePage from "./components/HomePage";
//import AboutPage from "./components/AboutPage";

import App from "./components/App";

render(<App />, document.getElementById("root"));
