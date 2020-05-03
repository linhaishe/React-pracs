import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Header extends Component {
  render() {
    const activeStyle = { color: "orange" };
    return (
      <nav>
        {/* <a href="/">Home</a> | <a href="/courses">Courses</a> |{" "}
        <a href="/about">About</a> */}
        <NavLink activeStyle={activeStyle} exact to="/">
          Home
        </NavLink>{" "}
        |{" "}
        <NavLink activeStyle={activeStyle} to="/courses">
          Courses
        </NavLink>{" "}
        |{" "}
        <NavLink activeStyle={activeStyle} to="/about">
          About
        </NavLink>
      </nav>
    );
  }
}
