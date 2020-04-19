import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store";

// ReactDOM.render(
//   <React.StrictMode>
//     <App store={store} />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// 注册(订阅)监听, 一旦状态发生改变, 自动重新渲染

// store.subscribe(function () {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App store={store} />
//     </React.StrictMode>,
//     document.getElementById("root")
//   );
// });

//优化render

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();

store.subscribe(render);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
