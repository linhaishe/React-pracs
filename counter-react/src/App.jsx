import React, { Component } from "react";

export default class App extends Component {
  state = {
    count: 0,
  };

  increment = () => {
    //1.得到选择增加数量
    const number = this.numSelect.value * 1;

    //2.得到原本的数据
    const count = this.state.count;

    //3.更新状态

    this.setState({ count: count + number });
  };
  decrement = () => {
    //1.得到选择增加数量
    const number = this.numSelect.value * 1;

    //2.得到原本的数据
    const count = this.state.count;

    //3.更新状态

    this.setState({ count: count - number });
  };
  incrementIfOdd = () => {
    //1.得到选择增加数量
    const number = this.numSelect.value * 1;

    //2.得到原本的数据
    const count = this.state.count;

    //3.满足条件更新状态,如果state数据为奇数则进行运算
    if (count % 2 === 1) {
      this.setState({ count: count + number });
    }
  };
  incrementIfAsync = () => {
    //1.得到选择增加数量
    const number = this.numSelect.value * 1;

    //2.得到原本的数据
    const count = this.state.count;

    //3.更新状态
    setTimeout(() => {
      this.setState({ count: count + number });
    }, 1000);
  };

  render() {
    const { count } = this.state;
    return (
      <div>
        <p>click {count} times</p>
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
