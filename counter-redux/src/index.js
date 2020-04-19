import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
//引入reducers
import { counter } from "./redux/reducers";

const store = createStore(counter);
//会得到一个初始状态state=0，内部会第一次调用
//关联reducers,接收更新的状态
//console.log(store,store.getState());

//将store传入app组件，更新状态的值传给app

//初始化渲染要做一次，才能监听。

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);

// 注册(订阅)监听, 一旦状态发生改变, 自动重新渲染

store.subscribe(function () {
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
