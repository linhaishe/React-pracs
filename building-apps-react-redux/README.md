# Starter Kit for [Building Applications in React and Redux](http://www.pluralsight.com/author/cory-house) on Pluralsight

## Get Started

1. **Install [Node 8](https://nodejs.org)** or newer. Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)(https://github.com/coryhouse/pluralsight-redux-starter/archive/master.zip)
2. **Navigate to this project's root directory on the command line.**
3. **Install Node Packages.** - `npm install`
4. **Install [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)** in Chrome.
5. Having issues? See below.

## Having Issues? Try these things first:

1. Run `npm install` - If you forget to do this, you'll get an error when you try to start the app later.
2. Don't run the project from a symbolic link. It will cause issues with file watches.
3. Delete any .eslintrc in your user directory and disable any ESLint plugin / custom rules within your editor since these will conflict with the ESLint rules defined in the course.
4. On Windows? Open your console as an administrator. This will assure the console has the necessary rights to perform installs.
5. Ensure you do not have NODE_ENV=production in your env variables as it will not install the devDependencies. To check run this on the command line: `set NODE_ENV`. If it comes back as production, you need to clear this env variable.
6. Nothing above work? Delete your node_modules folder and re-run npm install.

### Production Dependencies

| **Dependency**   | **Use**                                              |
| ---------------- | ---------------------------------------------------- |
| bootstrap        | CSS Framework                                        |
| immer            | Helper for working with immutable data               |
| prop-types       | Declare types for props passed into React components |
| react            | React library                                        |
| react-dom        | React library for DOM rendering                      |
| react-redux      | Connects React components to Redux                   |
| react-router-dom | React library for routing                            |
| react-toastify   | Display messages to the user                         |
| redux            | Library for unidirectional data flows                |
| redux-thunk      | Async redux library                                  |
| reselect         | Memoize selectors for performance                    |

### Development Dependencies

| **Dependency**                  | **Use**                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| @babel/core                     | Transpiles modern JavaScript so it runs cross-browser            |
| babel-eslint                    | Lint modern JavaScript via ESLint                                |
| babel-loader                    | Add Babel support to Webpack                                     |
| babel-preset-react-app          | Babel preset for working in React. Used by create-react-app too. |
| css-loader                      | Read CSS files via Webpack                                       |
| cssnano                         | Minify CSS                                                       |
| enzyme                          | Simplified JavaScript Testing utilities for React                |
| enzyme-adapter-react-16         | Configure Enzyme to work with React 16                           |
| eslint                          | Lints JavaScript                                                 |
| eslint-loader                   | Run ESLint via Webpack                                           |
| eslint-plugin-import            | Advanced linting of ES6 imports                                  |
| eslint-plugin-react             | Adds additional React-related rules to ESLint                    |
| fetch-mock                      | Mock fetch calls                                                 |
| html-webpack-plugin             | Generate HTML file via webpack                                   |
| http-server                     | Lightweight HTTP server to serve the production build locally    |
| jest                            | Automated testing framework                                      |
| json-server                     | Quickly create mock API that simulates create, update, delete    |
| mini-css-extract-plugin         | Extract imported CSS to a separate file via Webpack              |
| node-fetch                      | Make HTTP calls via fetch using Node - Used by fetch-mock        |
| npm-run-all                     | Display results of multiple commands on single command line      |
| postcss-loader                  | Post-process CSS via Webpack                                     |
| react-test-renderer             | Render React components for testing                              |
| react-testing-library           | Test React components                                            |
| redux-immutable-state-invariant | Warn when Redux state is mutated                                 |
| redux-mock-store                | Mock Redux store for testing                                     |
| rimraf                          | Delete files and folders                                         |
| style-loader                    | Insert imported CSS into app via Webpack                         |
| webpack                         | Bundler with plugin ecosystem and integrated dev server          |
| webpack-bundle-analyzer         | Generate report of what's in the app's production bundle         |
| webpack-cli                     | Run Webpack via the command line                                 |
| webpack-dev-server              | Serve app via Webpack                                            |

# 03-notes

Webpack is configured via a JavaScript object, and typically the config file is called webpack.config.js, and it's placed in the project root.

use the CommonJS syntax here since we're working in Node.Node still lacks support for ES modules,

```
   "babel":{
     "preset":[
       "babel=preset-react-app"
     ]

 }
}
```

Babel can be configured via a .babelrc file, but I prefer configuring it via package.json.

This single preset will tell Babel to transpile our JSX, and it will also allow us to safely use a long list of modern JavaScript features, including object spread, class properties, dynamic imports, and much more.

Now, this is the same Babel preset that's used by create‑react‑app, so you can dig into their preset if you're curious about all the details on how this configures Babel. In short, just understand that this one preset means that we can use modern JavaScript and a number of experimental features too, but our code will run in all recent browsers because Babel will convert it into a form that all recent browsers can understand.

```
"start": "webpack-dev-server --config webpack.config.dev.js --port 3000"
```

This key that we declare will determine how we call it on the command line. What we want to call is webpack‑dev‑server, and we're going to tell it where to find our configuration, which is the webpack.config.dev.js that we created in a previous clip. Finally, I'm going to configure it to run on port 3000.

```
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:import/errors",
      "plugin:import/warnings"
    ],
```

this enables many recommended rules

```
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
```

these environments have global variables. this tells eslint to ignore those globals

```
    "env": {
      "browser": true,
      "node": true,
      "es6": true,
      "jest": true
    },
```

overriding default rules.Then, under rules, I override a few of the recommended defaults. I'm going to use the debugger keyword and console.log frequently in this course, so this will avoid annoying ESLint warnings. Unlike errors, warnings just display a message instead of blocking progress via a build error.

```
    "rules": {
      "no-debugger": "off",
      "no-console": "off",
      "no-unused-vars": "warn",
      "react/prop-types": "warn"
    },
```

this setting is required by eslint‑plugin‑react. We're telling it to detect the version of React that we're using. Otherwise, it will throw a React version not specified error.

```
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "root": true
  }
}
```

this assures only this eslint config applies to this project.this final setting declares that this is the root ESLint config for this project. This way, if you're already using ESLint and you have ESLint config in your user folder, it won't apply to this project. So this setting will avoid my linting rules conflicting with yours.

```
"root": true
```

dev environment complete

- transpile:babel
- bundle:webpack
- lint:eslint
- webserver:webpack
- generating:index.html,webpack
- loading changes on save : webpack
- one command via npm script

# react component approaches

## two goals

- react component creation approaches
- container vs presentatinonal components 容器组件和展示组件

## four ways to create components

- create class
- es class
- function
- arrow function

```
var HelloWorld = React.createClass({
  render:function(){
    return(
      <h1>hello world</h1>
    )
  }
})
```

```
class HelloWorld extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <h1>hello world</h1>
    )
  }
}
```

```
function HelloWorld(props){
  return(
    <h1>hello world</h1>
  )
}
```

```
const HelloWorld =(props) => <h1>hello world</h1>
```

## functionnal components benefits

pics in desktop

## container vs presentation components

pics in desktop

## common folder

keep components that aren't tied to a specific page in a folder called common. So let's create a common folder under components.

like navigator

# 09-notes

在输入框中不能输入文字，是因为 our method is inheriting the 'this' context of the caller,which in the case is the change handler,we need to bind the this context to our instance

`onChange={this.handleChange.bind(this)}`

this isnt ideal slice a new fucntion is allocated on every render

`this.handleChange = this.handleChange.bind(this)`
now the function is only bound once

```
  constructor(props) {
    super(props);

    this.state = {
      course: {
        title: "",
      },
    };
  }
```

```
  state = {
    course: {
      title: "",
    },
  };
```

```
<input type="submit" value="Save" />
```

不建议将 onsubmit 功能放在此 value 附近，that's not recommended for accessibility and usability reasons. Why? Well, because users should be able to submit a form by hitting the Enter key. With this onSubmit handler up here, the inner key will also submit our form.

by attaching an onsubmit handler to the form , both the submit button and the enter key will submit the form

the left and right-hand side match = object shorthand syntax

`this.setState({ course });`
`this.setState({ course:course });`

```
default:
  return state;
```

if the reducdr receives an action that it doesnot care about,it should return the unchange state

Provider is a higher‑order component that provides your Redux store data to child components.

```
import { Provider as ReduxProvider } from "react-redux";

  <ReduxProvider sotre={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,

```

```

function mapStateToProps(state, ownProps) {
return {
courses: state.courses,
};
}

function mapDispatchToProps() {}
```

mapStateToProps function determaines what state in passed is passed to our components via props

`courses: state.courses`
be specific,request only the data your component needs,if you expose the entire Redux store, then the component will rerender when any data changes in the Redux store, and that's not good.

`ownProps`
This parameter lets us access props that are being attached to this component. That's why it's called ownProps because it's a reference to the component's ownProps.

`mapDispatchToProps`
This argument lets us decide what actions we want to expose on our component. This is an optional parameter,

when we omit mapDispatchToProps.our components gets a dispatch prop injected automatically

```
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(courseActions.createCourse(this.state.course));
    //alert(this.state.course.title);
  };

```

you have to dispatch an action,if you just call an action creator it wont do anything ,action creators just return an object,you need to wrap it in dispatch function

options for when to load courses

1. when app loads(wasteful)
2. when course page is loaded(efficient)

```
  componentDidMount() {
    this.props.actions.loadCourses().catch((error) => {
      alert("loading courses failed" + error);
    });
  }
```

这里为什么是 actions?

here:

```
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

```

```
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";

const {courses,authors,actions} = this.props

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      actions: bindActionCreators(courseActions, dispatch),
    },
  };
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  // createCourse: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
};
```

if we declare mapDispatchtoprops as an object instead,each property will automatically be bound to disptch.handy.

```
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";

const {courses,authors,loadCourses,loadAuthors} = this.props

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
};

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

```

```
import {loadCourses} from "../../redux/actions/courseActions";
import {loadAuthors} from "../../redux/actions/authorActions";

const {courses,authors,loadCourses,loadAuthors} = this.props

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
};

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

```

```
<Route path="/course/:slug" component={ManageCoursesPage} />
<Route path="/course/" component={ManageCoursesPage} />
```

since only one route in switch can match ,we need to declare this more specific route first,the shorter course url would match our slug road wuold never load

two problems:

1. edit course 页面时候，编辑课程，不能 redirect(fixed)
2. courses 页面时 ，loading 功能加载失败,i need to refresh
3. 多次刷新页面会出现，loading courses failedTypeError: Failed to fetch

async/await

```
  handleDeleteCourse = async course => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };


```

# 13-notes

testing technoligies

- testing frameworks
- helper libraries
  test react component
- jest
- enzyme
- react testing library

## 第二节，可以把各个 test 软件的对比做笔记记录

`"test":"jest --watch"`
jest will re-run test when we hit save

```
 "jest": {
    "setupFiles": [
      "./tools/testSetup.js"
    ],
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tools/fileMock.js",
      "\\.(css|less)$": "<rootDir>/tools/styleMock.js"
    }
  },
```

it means dont bother typing this. just grap it from the course exercise files
This tells Jest to ignore imports for various file types like images, videos, sounds, and styles. So although webpack can handle these, this config tells Jest to ignore these imports

```
    "setupFiles": [
      "./tools/testSetup.js"
    ],
```

jest will run any items that we declare under the setup files array

Snapshots store a record of a component's output. So snapshots can be useful for documenting expected output and regression testing protection.

the value of snapshot tests is they point out any time that your React components rendering changes. So this can protect you from accidental changes.

name snapshots well,so other developers are clear what the expected output is

with shallow:

- no dom is created
- no child components are rendered

with mount:

- dom is created in memory via jsdom
- child components are rendered

summary:
shallow:fast lightweight,test one component in isolation
mount:more realistic render component and child(test the final dom use fefs or test interaction with child components)

React Testing Library is a compelling alternative to Enzyme. It's unique because it encourages you to write tests based on what your user sees. This tends to lead to tests that are less brittle than Enzyme's tests, and it also helps encourage writing accessible React components.

Now unlike Enzyme, React Testing Library doesn't distinguish between shallow and mount. Components are always mounted.

This is because React Testing Library has the philosophy that you should focus on what the end user sees so the component that you test and its children are rendered.

I also like that unlike Enzyme, I don't have to explicitly call expect to make an assertion. By making my query, the assertion is automatic.

### testing connected components

- test markup for ui comps
- test behavior(Given a click, scroll, drag, change,)

Remember, markup belongs in presentation components. So ideally, the only JSX in a container component is a reference to a child component.

### Testing Action Creators

goal: assert it,return the expected object

### testing thunks

mock two things:

- store (reduc-mock-store)
- http calls (fetch-mock)

### Testing Reducers
