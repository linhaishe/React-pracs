import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CommentAdd extends Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired
  };
  //先写状态，受控组件必须要有状态来接收数据
  state = {
    //数据名称最好一样,不能随便乱取名
    username: "",
    content: ""
  };
  // 使用箭头函数则不用写bind，因为它没有自己的this，它的this指向外围的组件对象
  handleSubmit = () => {
    //收集输入数据，并封装成comment对象
    const comment = this.state;
    //并更新数组/状态
    //数据在哪个组件，更新数据的行为就应该定义在在哪个组件
    //添加comment方法,组件在appjs内
    this.props.addComment(comment);
    //清除输入数据，只需要修改状态就可以
    this.setState({
      username: "",
      content: ""
    });
  };

  handleNameChange = event => {
    const username = event.target.value;
    this.setState({ username });
  };
  handleContentChange = event => {
    const content = event.target.value;
    this.setState({ content });
  };

  render() {
    const { username, content } = this.state;
    return (
      <div className="col-md-4">
        <form className="form-horizontal">
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              className="form-control"
              placeholder="用户名"
              value={username}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group">
            <label>评论内容</label>
            <textarea
              className="form-control"
              rows="6"
              placeholder="评论内容"
              value={content}
              onChange={this.handleContentChange}
            ></textarea>
          </div>
          {/* 动态属性和静态属性要区分开来，固定左右位置，形成规律 */}
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                type="button"
                className="btn btn-default pull-right"
                onClick={this.handleSubmit}
              >
                提交
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
