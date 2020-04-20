redux 默认是不能异步处理的。
需要中间件进行异步处理的请求
组件中直接调用异步的函数进行更新
异步的代码移动到 action 文件中

`npm install --save redux`
`npm install --save redux-thunk`

`import {createStore, applyMiddleware} from 'redux' import thunk from 'redux-thunk' // 根据counter函数创建store对象 const store = createStore( counter, applyMiddleware(thunk) // 应用上异步中间件 )`
