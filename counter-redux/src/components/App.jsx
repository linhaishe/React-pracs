import React, { Component } from "react";
//更新状态的操作交给redux,则不再写setState
//app接收store,接收store中最新的状态
//import { INCREMENT, DECREMENT } from "../redux/action-types";

//import { increment, decrement } from "../redux/actions";
//引入这个模块里面的所有子模块
//分别暴露
import * as actions from "../redux/actions";

export default class App extends Component {
  // state = {
  //   count: 0,
  // };

  increment = () => {
    //1.得到选择增加数量
    const number = this.numSelect.value * 1;
    //调用store的方法更新状态，因为状态的方法在Reducer里
    // this.props.store.dispatch({
    //   type: INCREMENT,
    //   data: number,
    // });
    console.log(number);

    this.props.store.dispatch(actions.increment(number));
  };
  decrement = () => {
    //1.得到选择增加数量
    const number = this.numSelect.value * 1;

    // this.props.store.dispatch({
    //   type: DECREMENT,
    //   data: number,
    // });
    this.props.store.dispatch(actions.decrement(number));
  };
  incrementIfOdd = () => {
    //1.得到选择增加数量
    const number = this.numSelect.value * 1;

    //2.得到原本的数据
    const count = this.props.store.getState();

    //3.满足条件更新状态,如果state数据为奇数则进行运算
    if (count % 2 === 1) {
      // this.props.store.dispatch({
      //   type: INCREMENT,
      //   data: number,
      // });
      this.props.store.dispatch(actions.increment(number));
    }
  };
  incrementIfAsync = () => {
    //1.得到选择增加数量
    const number = this.numSelect.value * 1;

    //3.更新状态
    setTimeout(() => {
      // this.props.store.dispatch({
      //   type: INCREMENT,
      //   data: number,
      // });
      this.props.store.dispatch(actions.increment(number));
    }, 1000);
  };

  render() {
    //通过redux 管理中的store获取state
    // 取值失败,要注意为什么取值失败35:00
    // const {count} = this.props.store.getState()
    // 取值成功
    const count = this.props.store.getState();
    //debugger;
    return (
      <div>
        <p>click {count} times</p>
        {/* count没有变化是因为没有进行监听实现数据变化后渲染,需要subscribe */}
        <div>
          {/* <select ref="numSelect"> */}
          {/* 有两种处理方法，受控组件和非受控组件，此处用非受控组件处理 */}
          {/* 受控组件未使用箭头函数指定函数对象，在获取非受控组件时则需要写this.refs中获取数据 */}
          {/* const num = this.refs.numSelect.value * 1; */}
          {/* 如果ref由箭头函数指定，则不需要从this.refs中获取数据 */}

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
