区分 ui 组件和 container 组件
这对这个 comment app ,所有的数据都放在 app 中管理，接着把数据和行为操作传递个各个组件。
则需要将 app.jsx 转移到 containers 文件夹中

1. 状态交由 redux 管理，则从 props 中获得参数
2. 指定 proptypes,确定传输类型
3. 使用 connect(),将 ui 组件和容器组件进行链接
