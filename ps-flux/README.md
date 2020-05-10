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

## 08-notes : reactr outer

react 是一个小型的，专注的组件库，所以它对如何处理路由没有任何处理。对于小型应用程序，你可能不需要功能齐全的路由器，但随着应用程序的增长，可能希望将应用程序拆分为多个具有深度链接的页面。

BrowserRouter:使用 html5 历史记录 api，拥有干净的 url，没有哈希值 hashs,推荐的使用方法
MemoryRouter:thsi router keeps the history of your URL in memory,it doesnot read or write to the address bar,so this router can be useful for automated testing in non-browser environments like react native.

### key component

1. Router
   wrap app entry point
2. Route
   load this component for this URL
3. Link
   Anchors,no post back required,不会有数据请求

```
   <Route path="/" component={HomePage} />
   <Route path="/courses" component={CoursesPage} />
   <Route path="/about" component={AboutPage} />
```

会看到，homepage 会在每个子页面中出现，每个子页面都有渲染到 homepage.
因为 homepage route matches all three of the routes,noted taht we declared for the homepage just contain a slash,that's the path for the homepage,the other two path also have slash too

add exact props will fixed this issue.this says 'this route should only match if the url is exactly "/" '

```
   <Route path="/" exact component={HomePage} />
   <Route path="/courses" component={CoursesPage} />
   <Route path="/about" component={AboutPage} />
```

#### Link component

组件会创建锚点`<a></a>`,并允许您指定要连接到的路径，包括任何参数。
target URL /user/1
route with placeholder,占位符以冒号为前缀，冒号后面的名字可以随便取
Route : `<Route path='/user/:userId'>`
JSX : `<Link to="/user/1">Bobby Tables</Link>`
anchor:`<a href="user/1">Bobby Tables</a>`

clicks on the generated anchor will be handled by react router

#### NavLink component

此组件和 Link 组件的工作方式相同，但他接收名为 activeClassName 的额外 prop
`<NavLink to="/users" activeClassName="active">Users</NaveLink>`

### switch component

404 page
当声明的路由没有被找到的时候，我们需要将路径引导至专门设置的 404 page 页面，以便没有其他路线匹配时显示。

1. **a path no route will match all route**,use switch component aviod 404 page aways play
2. 404 route will only match if none of the other above matched,所以放在最后一行。如果前两个路由不匹配，则底部路由将最终匹配并显示 pageNotFound 组件
3. only one route inside switch will match,所以将 notpagefound 放在列表中的最后一条路由的位置上。

```
<switch>
<Route path="/" exact component={Home}/>
<Route path="/anout" component={About}/>
<Route component={PageNotFound}/>
</switch>
```

### Redirects

need to change the URL> use a redirect
`<Redirect to="/users" />`

1. 如果将其放在渲染中，组件将在它安装的那一刻重定向
2. 如果想在一些用户行为产生后进行重定向的话，可以使用

#### use state to redirect

使用 state 来保存一个布尔值，确定我们是否应该重定向到用户的页面
`{this.state.redirectToUsers && <Redirect to="users" />}`

from 是您要重定向的路径，to 是你要重定向到的路径
`<Reairect from="/old=path" to="/new-path"/>`

paramas and querystring parameters are automatically passed to the new route.

#### Programmatic redirect

in traditional approach
components loaded ny react router's route component recive history on props
`props.history.push('new/path')`

### URL parameters

向 URL 中传递参数，router 会自动将此数据 Tina 驾到 params 和 location 下的 props

```
//given a toute like this
<Route path="/course/:slug" component={Course}>

//and a url like this,查询字符串参数的值为3
myapp.com/course/clean-code?module=3

//props will be
function Course(props){
   props.match.params.slug;//clean-code
   //the qurey 包含一个对象，该对象具有与查询字符串中的简直对对应的键和值
   props.location.qurey;//{module:3}
   props.location.pathname;// /course/clean-code/?module=3
   //pathname contain all the path
}

```

create a new component called managecoursepage that display url parameters from react router

`{props.match.params.slug}`

since this page's route is loaded by react router,props.match.params will be populated by react router

### page transitions

当 isBlocking 为 true，提示组件将向用户显示我在此处指定的消息
isBlocking is a value and state , 当用户在表单中键入时我们可以将其设置为 true,并且当用户提交表单时我们设置为 false

```
<Prompt when={isBlocking}
message="Are you sure you want to navigate away?"
/>
```

## 09-forms

- validation
- redirects
- reusable inputs
- user notifications
- saving and population on load(节省负荷)

```
<Route path="/course/:slug" component={ManageCoursePage} />
<Route path="/course" component={ManageCoursePage} />

```

in switch , the more specific route should be listed first.新路线放在 slug 路线上方，则带有该段的路线将永远不会匹配

goal:create a separate component that holds the course form markup

#### controlled components

any <input> with a value set is a controlled components
it's means the value is controlled by react
element's value always matches the value of the assigned prop

you must declare a change handler for keystrokers to register,如果没有输入编写更改处理程序 write a change handler for your input，then any keystroke that you nake in the input field will be lost 那么您在输入字段中所做的任何功能都会立即丢失。
如果输入未设置 value 或将其设置为 null,则输入不受控制，因此输入将继续按照预期运行

file: CourseForm.js
todo:

1. declare change handler for each input
2. declare state

`handleTitleChange(event)`
event will be automatically passed by the browser

`value={props.course.authorId}` change into `value={props.course.authorId || ""}`

Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.

set authorid an empty string if it's passed in as null
组件初始化状态 weinull 时，使用 js 的逻辑运算渲染为空字符串

`course.title=event.target.title;`
dont treat state as immutable

ManageCourse.js

```
  function handleTitleChange(event) {
    //debugger; //查看event里的参数
    //course.title = event.target.title; //not advise
    //尽量不要改变state的状态，采用制作副本的形式进行处理
    // const updatedCourse = { ...course };
    // updatedCourse.title = event.target.title;
    const updatedCourse = { ...course, title: event.target.value };
    setCourse(updatedCourse);
    //复制课程对象并将副本上的title属性赋值为用户输入的数据

    //由于要处理多个input属性值，可以简化写法
  }
  //debugger;
}
```

这里不是解构，是 computed property,允许根据变量设置属性
`[event.target.title]: event.target.value`

```
  function handleChange({target}) {
   //{target}此解构是下面的简写参数
   //cosnt target = event.target
   //equal to
   //cosnt {target} = event
    const updatedCourse = {
      ...course,
      [target.name]: target.value,
    };
    setCourse(updatedCourse);
  }

```

```
  function handleChange({target}) {
    const updatedCourse =
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

```

### dupulication

1. keep label and input in stnc
2. set calssName
3. declare value

goal: create a reusable textinput component

exercise: create a reusable selet too

### 安装插件

**npm install react-toastify@5.1.1**

功能点：点击已有课程时，表单会自动填充

## 10-notes Flux

handle data flows throughout our app using flux

- actions: encapsluate events,封装事件
- stores: hold app state,保持应用状态
- dispatcher: central hub,中央枢纽

flux 是 facebook 的一个架构模式的名称，它具有单向数据流和集中式调度程序。

其他相同的架构模式,many flux implementations.
redux is most popular
fluxxor,deloream,nuclearjs,fluxible,redux,marty,flummox,reflux,alt
单向数据流动，但是只是意味着数据在一个方向上流动。

constants,创建常量文件方便数据处理

avoid nesting controller views,which can hurt performance,it ca cause multiple data updates and cause react's render method to get called multiple times.

recommand having a single top-level controller view per page or a single controller view for each major portion of the page.this means all child component simply receive data from the parent via props,it keeps them dumb and focused solely on presentation

so flux is a publish-subscribe model?

not quite

- differs in two ways:

1. every payload is dispatched to all regidtered callbacks.
2. callbacks can wait for other callbacks

## 11-notes flux demo

when should we load courses?

1. when needed
   缺点：需要检查是否每个需要课程数据的页面上加载了课程
2. when app loads
   如果你的应用程序在许多页面上使用相同的数据，那么最好在应用程序加载时加载数据，而不管页面如何

goal:

1. subscribe to flux store
2. if courses have not been loaded,call loadCourses function

problem:
the ManageCoursePage needs to assure the Flux store is populated before requesting a course by slug
