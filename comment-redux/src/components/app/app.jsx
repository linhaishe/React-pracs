import React, { Component } from "react";
import CommentAdd from "../comment-add/comment-add";
import CommentList from "../comment-list/comment-list";

export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     comments: [
  //       { username: "tom", content: "react is good!" },
  //       { username: "jack", content: "react is so hard!" }
  //     ]
  //   };
  // }
  //给组件对象添加state属性，默认的原始值是null,组件对象是this.state中的this
  state = {
    comments: [
      { username: "tom", content: "react is good!" },
      { username: "jack", content: "react is so hard!" }
    ]
  };
  //数据在哪个组件，更新数据的行为就应该定义在在哪个组件
  //这个函数自己不用，放在app.js内
  addComment = comment => {
    const { comments } = this.state;
    comments.unshift(comment);
    this.setState({ comments });
  };

  //delete comment
  deleteComment = index => {
    const { comments } = this.state;

    //根据元素下标进行删除

    comments.splice(index, 1);

    this.setState({ comments });
    
  };

  render() {
    const { comments } = this.state;
    return (
      <div>
        <header className="site-header jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h1>请发表对React的评论</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <CommentAdd addComment={this.addComment} />
          <CommentList comments={comments} deleteComment={this.deleteComment} />
        </div>
      </div>
    );
  }
}
