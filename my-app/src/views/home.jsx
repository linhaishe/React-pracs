import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MyNavLink from "../components/my-nav-link";
import News from "./news";
import Message from "./message";

export default function Home() {
  return (
    <div>
      <h2>Home组件内容</h2>
      <div>
        <ul className="nav nav-tabs">
          <li>
            <Router>
              <MyNavLink to="/home/news">News</MyNavLink>
            </Router>
          </li>
          <li>
            <Router>
              <MyNavLink to="/home/message">Message</MyNavLink>
            </Router>
          </li>
        </ul>
        <Router>
          <Switch>
            <Route path="/home/news" component={News} />
            <Route path="/home/message" component={Message} />
            <Redirect to="/home/news" />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
