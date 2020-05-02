# Building Applications with React and Flux

## Environment Setup

1. npx create-react-app ps-flux
2. install flux, react router and bootstrap
   - be sure the dependencies version we use are the same
   - npm install flux@3.1.3 react-router-dom@5.0.0 bootstrap@4.3.1
3. setting up an mock API(local mock api)
   使用 JSON server 设置模拟 API，提供请求和更改课程和作者数据的端点

   - npm install -D cross-env@5.2.0 npm-run-all@4.1.5 json-server@0.15.0
     meaning:
   - -D:为了 mock api 会安装更多的软件包，由于这些包都是开发工具，添加-D 标志，以便将他写入 package.json 是列在 dev 依赖项下。
   - cross-env 是一个用于社会环境变量的方便库
   - npm-run-all 将允许我们同时运行多个脚本
   - json-server 将提供我们的模拟数据

   BE SURE TO USE THE SAME VERSION!
   warning during install are common,but it should still work fine.
   advantages:

   - function: host a mock API that simulates making async calls to server
   - start before the API exists
   - independence
   - backup plan
   - ultra-fast
   - test slowness
   - aids testing
   - point the real api later

4. copy some files from exercise files

   - 将 tools 文件放入根目录下，和 src 文件夹同级
   - apiserver:will serve the api that we use in this course.this file uses express with json server to host a mock api and simulated database using a json file.json server provides a command line interface,but i am using the more advanced module config to add custom server-side validation down at the bottom of file
   - createmockdb:this script will recreate our mock data each time we start the app and write it to a sperate file called db.json.this file will be read and manipulated by our api server.
   - mockdb.js:contains the mock data.this data will populate our mock database.this data contains arrays of our courses,and also an array of authors,as well as the data structure for creating a new course.to put these scripts to use.具体如何运作已经在注释中写明，也可以在 json server docs 中进行深入了解

   it automatiacally supports changing data too,we can use get post put ...and it will write to db.json behind the secenes

   - db.json:our fake database,aviods us accidentally deleting all the data and having to start over,remember each time you start the application this db.json file will be regenerated.it will protect us in case we write a bug and accidently corrupt the data or delete it all.each time we start the app, mockdata.js is copied into db.json

5. create some scripts in package.json
   we want to recreate the mock database each time we start the app,by convention,this will run before start:api because it has the same name,but prefixed with "pre"

   - add "prestart:api": "node tools/createMockDb.js",
     this script will use node to call tools/apiServer.js
   - add "start:api": "node tools/apiServer.js",
   - for check out whether it running or not :type `npm run start:api` on command line

6. change start scripts in package.json
   - `"start": "react-scripts start"`,change into
   - `"start":"run-p start:dev start:api"`,
   - `"start:dev": "react-scripts start"`,

set it up to start the mock api each time that we start the app,rename the start script to start:dev.and create a new start script,

- run-p:(npm run all package,run parallel)it would allow us tp run both our app and our api at the same time.
- db.json 会在 port 3001 运行，app 会在 3000 运行(同时)

7.  add api files under the src directory

    - these files will make it easy to make calls to our mock api.
    - courseapi:contains the functions that will get courses save courses and delete courses
    - authorapi:...like above
    - apiutils:centrailzes the handling of our api reponses.using fetch to make api calls.fetch is built into modern browers so we can make http calls without installing an extra library.fetch has promise-based api,with the then function is called when the async call is complete

8.  add cross-dev into start:dev script

    - "start:dev": "cross-env REACT_APP_API_URL=http://localhost:3001 react-scripts start",
    - notice how referencing an environment variable for the base url,this is a package from npm that let us to set environment variables in a cross-platform friendly way.
    - the environment variables we want to set is REACT_APP_API_URL,and we set it to the url for our mock api which is local host 3001.
    - create-react-app looks for env vars that statr with react_app and allows us to replace their valiues in code
    - `const baseUrl = process.env.REACT_APP_API_URL + "/courses/";`
    - so our reference to process.env.react_app_api_url will be replace by create-react-app with the value of the environment variable that we just declared.

## 02-notes

### MVC

MVC model: stands for modle-view-controller,react can fullfil all three,react's state handles the midel,and flux procides an alternative place to store stae outside of react.components can contain just logic,end up our operating a lot like controllers that you're used to in MVC,this pattern called controller views.
other terms:smart/dumb components,container/presentation
controller views promote reuse and separation of concerns

## 03-notes

##separation of concerns 关注点分离##
js and html never separate,一种是标记语言，另一种是编程语言，但是要创建人和重要的程序，必须谨慎的使这两种技术保持同步。在服务端语言(java,c#)，我们拥有大量的强类型接口，这些接口是我们可以分开关注点，但是可以强制执行必须实现的通用接口。js and html 之间没有显式接口，您必须手动使这两种技术保持同步，否则应用程序会崩溃。

## 04-notes

### 4 ways to create components

- createClass
  this style is no longer popular

```
var HelloWorld = React.createClass(
   {
      render:function(){
         return(
            <h1>Hello world</h1>
         )
      }
   }
)

```

- ES class

```
class HelloWorld extends React.Component{
   constructor(props){
      super(props);
   }
   render(){
      return(
         <h1>Hello World</h1>
      )
   }
}

```

- Function

```
function HelloWorld(props){
   return(
      <h1>hello world</h1>
   )
}
```

- Arrow function
  can omit the return keyword here since the right-hand side is a single expression.var keywold should avoid using

```
const HelloWorld = (props) => <h1>Hello World</h1>
```

### class vs function components

1. 建议尽可能使用函数组件 function component 而不是类组件。
2. avoid `this` keyword
3. less transpiled code
   功能组件比类组件更小，并且在通过 babel 运行时产生的代码更少
4. high signal-to-noise ratio
   最大化信噪比
5. enhance code completion and intellisecse
6. bloated component are obivious
7. easy to test
8. performance
9. classes may be removed in the future

## 05-notes

### create our initial app structure

the js conbention is to use PascalCase for things thsty can be instantiated

react 假定 jsx 中以大写字母开头的任何元素都是 react 组件，并且 jsx 中以小写字母开头的任何元素都假定为 native html 元素

### render

要渲染应用程序，我们将使用 reactdom，react 支持向 react native 等其他目标呈现移动应用，但由于我们正在构建 web 应用，因此我们将使用 reactdom

index.js:入口文件，entry point for our app

create-react-app 配置首先查看此文件，然后查看此文件中的导入以确定构成我们应用程序的其他文件.create-react-app looks at index,=.js to determine what files are in your app

common files:这是我们将放置在整个应用程序中使用的任何常用组件的地方

## 06-notes

props,state,lifecycle methods and keys.

### props

data for a react component is held in two places,props and state.

- props short for properties, data passed from parent component
- look like html attribute
- immutable
- want to change? call a function provided by the parent

`this.props.username` in class component

```
function Avatar(props){
   return <img src={"images/" + props.username} />;
}

<Avatar username="cory">
<Avatar username={username}>

```

### state

`this.state.username` in class component
`state.username` in function component

- holds mutable state
- set via setState in class components or useState or useReducer Hooks

```
class Example extends Component {
   constructor(props){
      super(props);
      this.state={name:''};
   }
   onChange(event){
      this.setState({name:event.target.value});
   }

   render(){
      return <input onChange={this.onChange} value={this.state.name} />
   }
}
```

```
class Example extends Components{
   state = {name:""};

   onchange(event){
      this.setState({name:event.target.value})
   }

   render(){
      return <input onChange={this.onChange} value={this.state.name} />
   }
}

```

### lifecycle

these methods only exist on class components.for function components,use hooks

1. constructor : initialize state bind event methods

在安装组件之前调用构造函数，因此该函数是初始化状态和绑定事件方法的好地方。optional,can use class field to init state too.

2. render: runs when state or props change.can return jsx ,arrays,strings,bool,or null.

- in this function,you declare what your component outputs,this method is only required on class components.
- with function components,whatever you return is assumed to be what your components should render.(on function components ,whatever you return is rendered)
- should be pure function,shouldnt modify state or directly interact with the browser

3. componentDidMount
   组件安装后立即调用
   runs immediately after component is mounted,by the time this function is called,the component's DOM exists.it's handy spot to access the DOM,set up subscriptions,integrate with frameworks,set timers,make HTTP calls,setState

4. componentDidUpdate
   called after updates are flushed(刷新，强制刷新，冲洗) to the DOM.it's not called o ninitial render.
   组件更新被刷新到 DOM 上后，立即调用此函数，因此在初始渲染时不会调用。
   this function is allows you to operate on the DOM immediately after the component has been updated and re-rendered in the DOM.

5. componentWillUnmount
   runs before component is removed from DOM
   在从 DOM 写在组件之前运行，因此通过销毁在装入组件时创建的任何相关资源，订阅或 DOM 元素，这是一个清理的好地方。

   cleanup destroy related resources.

6. keys for dynamic children

add key to dynamuc child elements
在添加和删除子项时，react 使用该键来确保争取人的重新排序或者销毁子组件
id 不需要全局唯一，它只需要对你迭代的数组保持唯一即可
the kay is often the primary key from your database,the id only needs to be unique to the array.shouldnt change over time,shouldnt change when the page once loaded
一个常见的错误是使用一个计数器 counter 或 map 中的 index 来分配 key，因为当删除或重新排序时索引会发生变化。

```
function Courses(){
   return courses.map(course=>{
      return <div key={course.id}>{course.title}</div>
   })
}
```

## 07-notes

hooks components composition and protypes

hooks 与生命周期方法类似的角色，但是 hooks 仅适用于 function components

16.8,we can use functional components for almost everything via react hooks

### 3 commons hooks

1. useState:local state
2. useEffect:side effect，runs immediately after each render.allows you handle side effects that need to occur each time react renders.the combination of componentDidmount and componentDidUpdate,and componentWillunmount
3. ueseContext: access data in context

```
import React,{useState}from "react";
function Example(){
   const [email,setEmail]=useState("");
   //数组解构
   return (
      <input
      type="text"
      value={email}
      onChange={event => setEmail(event.target.value)}
      />
   )
}
```

`[count]`,the second parameter is called the dependency array,we need to specify the dependencies for our effect,the effect re-runs when any values listed in the dependency array change,if you forget this,the effect will run after every render.the dependency array is where we tell useEffect when it should re-run

you can run code on unmount by returning a function from useEffect

```
import React,{useState,useEffect}from "react";
function Example(){
   const [count,setCount] = useState(0);
   useEffect(()=>{
      document.title=`you clicked ${count} times`
   },[count]);

   return(
      <div>
      <p>you clicked {count} times</p>
      <button onClick={()=>setCount(count+1)}>Click me</button>
      </div>
   )
}
```

### components composition

seperate our logic from our markup using the controller views pattern

```
function ProfilePic(props){
   return <img src={"/image" + props.username + ".png"} />
}

function ProfileLink(props){
   return <a href={"/profiles/" + props.username>{props.username}</a>
}

function Avatar(props){
   return(
      <div>
      <ProfilePic username={props.username} />
      < ProfileLink username={props.username} />
      </div>
   )
}

```

### controller views

is a react component that has child components.a name of top level component,a controller views controls the data flows for its child components.it does this by setting props on its child components

creating separate components for logic and markup can make your components easier to maintain and reuse

### props validation via proptypes

### rules of hooks

benefits,share logic between components

only call in

- react function components
- custome hooks

must be declared at the top level

- dont wrap in if statement,loops,funcs
- bcs react tracks hook call order

### PropTypes

PropTypes allows you to document the data and funcs that your components accepts

PropTypes only run in developmemt version of react,wont run in production
the minified react version is for production

```
CoursePage.propTypes={
author:PropTypes.object.isRequired,
onSave:PropTypes.func.isRequired,
validate:PropTypes.func.isRequired,
errors:PropTypes.object,
hasErrors:PropTypes.func.isRequired,
}
```

### default props

default props can be declared below the component much like you declare PropTypes

```
CoursePage.defaultProps={
   errors:{}
}

```
