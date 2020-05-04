//this app component will decide which page to render
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";

import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./common/Header";
import CoursesPage from "./CoursesPage";
import PageNotFound from "./PageNotFound";
import ManageCoursePage from "./ManageCoursePage";

//window.location is built into all browsers
//App 只显示每个URL的正确页面
function App() {
  //   function getPage() {
  //     const route = window.location.pathname;
  //     if (route === "/about") return <AboutPage />;
  //     if (route === "/courses") return <CoursesPage />;

  //     return <HomePage />;
  //   }
  return (
    <div className="container-fluid">
      {/* <ToastContainer autoClose={3000} hideProgressBar /> */}
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />

        <Redirect from="/about-page" to="/about" />
        <Route component={PageNotFound} />
      </Switch>
      {/* return getPage()
      {getPage()} */}
    </div>
  );
}

export default App;
