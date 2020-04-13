import React from "react";
import { NavLink } from "react-router-dom";

//用组件包装nav-link

export default function MyNavLink(props) {
  // 将外部传入的所有属性传递给navlink，不用在定义prop-types
  return <NavLink {...props} activeClassName="activeClass" />;
}
