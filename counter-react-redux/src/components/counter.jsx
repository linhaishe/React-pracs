import React, { Component } from "react";
import PropTypes from "prop-types";

//import * as actions from "../redux/actions";
//import { connect } from "react-redux";
//import { increment, decrement } from "../redux/actions";

//export default class App extends Component {
export default class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  };

  increment = () => {
    const number = this.numSelect.value * 1;
    console.log(number);
    //已经不依赖redux,可以直接从store中取数据，则不依赖reduX的api
    //this.props.store.dispatch(actions.increment(number));
    this.props.increment(number);
  };
  decrement = () => {
    const number = this.numSelect.value * 1;
    //this.props.store.dispatch(actions.decrement(number));
    this.props.decrement(number);
  };
  incrementIfOdd = () => {
    const number = this.numSelect.value * 1;
    //const count = this.props.store.getState();
    const { count } = this.props;

    if (count % 2 === 1) {
      //this.props.store.dispatch(actions.increment(number));
      this.props.increment(number);
    }
  };
  incrementIfAsync = () => {
    const number = this.numSelect.value * 1;

    setTimeout(() => {
      //this.props.store.dispatch(actions.increment(number));
      this.props.increment(number);
    }, 1000);
  };

  render() {
    //const count = this.props.store.getState();
    const { count } = this.props;

    //debugger;
    return (
      <div>
        <p>click {count} times</p>
        <div>
          <select ref={(select) => (this.numSelect = select)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.incrementIfOdd}>increment if odd</button>
          <button onClick={this.incrementIfAsync}>increment async</button>
        </div>
      </div>
    );
  }
}

//connect()是一个函数，函数执行以后返回的是一个函数，执行时候接收一个组件类，返回的是一个新的组件。

//在INDEX.JS中渲染的<APP/>组件，不是APP.JSX中的class App,而是connect()(App)返回的结果

//传入数据。
// const VisibleTodoList = connect(
//   mapStateToProps,
//   mapDispatchToProps(action creator / action )
// )(TodoList)

//count名字要和app中声明的属性名一致;
//{ increment, decrement }
//属性名:属性值，属性名要和声明的属性名要一致。即和increment: PropTypes.func.isRequired,中相对应
//属性值要和action声明的方法一致，实际上是action creator
//{ increment:increment, decrement:decrement }
//一致的名称实现编码简洁
