import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <nav>
        <a href="/">Home</a> | <a href="/courses">Courses</a> |{" "}
        <a href="/about">About</a>
      </nav>
    );
  }
}
