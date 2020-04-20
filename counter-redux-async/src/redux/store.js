//引入中间件
import { createStore, applyMiddleware } from "redux";
//引入thunk
import thunk from "redux-thunk";
//引入reducers
import { counter } from "./reducers";

const store = createStore(counter, applyMiddleware(thunk));
//作用：应用上异步的中间件

//会得到一个初始状态state=0，内部会第一次调用
//关联reducers,接收更新的状态
//console.log(store,store.getState());

//将store传入app组件，更新状态的值传给app

//初始化渲染要做一次，才能监听。

export default store;
