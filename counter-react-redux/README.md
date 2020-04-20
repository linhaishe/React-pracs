redux 耦合度太高，依赖性特别强。
这次的版本是用专门为react 做的插件，react-redux，是react的插件，不是redux的插件
简化在react里的redux代码

下载插件：
npm install --save react-redux

1.引入provider
import {Provider} from 'react-redux'
通过provider，让容器组件获取state对象，生成UI组件的参数

2.