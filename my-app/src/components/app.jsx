import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MyNavLink from "./my-nav-link";
import About from "../views/about";
import Home from "../views/home";

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/*导航路由链接*/}
              <Router>
                <MyNavLink className="list-group-item" to="/about">
                  About
                </MyNavLink>
                <MyNavLink className="list-group-item" to="/home">
                  Home
                </MyNavLink>
              </Router>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/*可切换的路由组件*/}
                {/* 用switch组件将路由组件进行控制，所以才需要将内容放进switch中
                只能显示其中一个，需要用switch包装起来进行调用转换 */}
                <Router>
                  <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/home" component={Home} />
                    {/* 自动定向，因为有两个路由，为了不让页面空白，选择自动选择路由显示 */}
                    <Redirect to="/about" />
                  </Switch>
                </Router>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
