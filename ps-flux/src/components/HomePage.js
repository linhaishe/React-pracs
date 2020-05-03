//导入一个名为React的npm包，并将设置为名为react的变量
import React from "react";
import { Link } from "react-router-dom";
//react component name begin with a capital letter
function HomePage() {
  return (
    <div className="jumbotron">
      <h1>pluralsight administration</h1>
      <p>react,flux,and react router for ultra-responsive web apps.</p>
      {/* <a href="/about">About</a> */}
      <Link to="about" className="btn btn-primary">
        About
      </Link>
    </div>
  );
}

export default HomePage;
