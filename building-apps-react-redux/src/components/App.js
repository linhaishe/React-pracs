import React, { Component } from "react";
import HomePage from "./home/HomePage";
import { Route, Switch } from "react-router-dom";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage"; // eslint-disable-line import/no-named-as-default
//eslint is making sure we want to import the default export(since the named export has the same name)
//在后面加个注释可解决问题
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/course/:slug" component={ManageCoursePage} />
          <Route path="/course/" component={ManageCoursePage} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    );
  }
}
