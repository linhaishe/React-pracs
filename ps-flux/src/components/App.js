//this app component will decide which page to render
import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./common/Header";
import CoursesPage from "./CoursesPage";

//window.location is built into all browsers
//App 只显示每个URL的正确页面
function App() {
  function getPage() {
    const route = window.location.pathname;
    if (route === "/about") return <AboutPage />;
    if (route === "/courses") return <CoursesPage />;

    return <HomePage />;
  }
  return (
    <div className="container-fluid">
      <Header />
      {/* return getPage() */}
      {getPage()}
    </div>
  );
}

export default App;
