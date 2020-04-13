import React from "react";
import { Link, Route } from "react-router-dom";
import MessageDetail from "./message-detail";

export default class Message extends React.Component {
  state = {
    //每一个数组的元素类型应该是对象
    messages: [
      // { id: 1, title: "Message001" },
      // { id: 3, title: "Message003" },
      // { id: 6, title: "Message006" }
    ],
  };

  componentDidMount() {
    // 模拟发送ajax请求异步获取数据
    setTimeout(() => {
      const data = [
        { id: 1, title: "Message001" },
        { id: 3, title: "Message003" },
        { id: 6, title: "Message006" },
      ];
      //获取数据后更新状态
      this.setState({
        messages: data,
      });
    }, 1000);
  }

  //history对象的Push方法

  ShowDetail = (id) => {
    this.props.history.push(`/home/message/${id}`);
  };

  ShowDetail2 = (id) => {
    this.props.history.replace(`/home/message/${id}`);
  };

  back = () => {
    this.props.history.goBack();
  };

  forward = () => {
    this.props.history.goForward();
  };

  reqPage = () => {
    //通过js进行页面跳转
    window.location = "http://www.baidu.com";
  };

  render() {
    //在matach数据下获取path参数
    const path = this.props.match.path;

    return (
      <div>
        <ul>
          {this.state.messages.map((m, index) => {
            return (
              <li key={index}>
                {/* <a href={`/home/message/messagedetail/${m.id}`}>{m.title}</a> */}
                {/* a 标签导致链接成为非路由链接，点击的时候会发送请求的 */}
                {/* 使用link或者其他的组件成为路由链接 */}
                <Link to={`${path}/${m.id}`}>{m.title}</Link>
                {/* &nbsp;&nbsp;&nbsp;
                事件回调函数，自动传递event参数，但是我们需要id数据，所以我们传递id数据给回调函数
                <button onClick={this.ShowDetail}>查看详情</button> */}
                <button onClick={() => this.ShowDetail(m.id)}>
                  查看详情(push)
                </button>
                &nbsp;
                <button onClick={() => this.ShowDetail2(m.id)}>
                  查看详情(replace)
                </button>
              </li>
            );
          })}
        </ul>
        <p>
          <button onClick={this.back}>返回</button>&nbsp;
          <button onClick={this.forward}>前进</button>&nbsp;
          <hr />
          <button onClick={this.reqPage}>页面跳转至百度</button>
        </p>
        <hr />
        {/* <Route path="/home/message/messagedetail/:id" component={MessageDetail}></Route> */}
        {/* :id,即是占位符，也是也个标识名称，是可以换名称的，尽量根据用法取名 */}
        <Route path={`${path}/:id`} component={MessageDetail}></Route>
      </div>
    );
  }
}
