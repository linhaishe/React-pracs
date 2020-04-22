import React, { Component } from "react";
import CommentAdd from "../comment-add/comment-add";
import CommentList from "../comment-list/comment-list";

export default class App extends Component {
  state = {
    // comments: [
    //   { username: "tom", content: "react is good!" },
    //   { username: "jack", content: "react is so hard!" }
    // ]
    comments: [],
  };
//发请求，从后台获取数据，模拟发送异步AJAX请求
  componentDidMount() {
    setTimeout(() => {
      const comments = [
        { username: "tom", content: "react is good!" },
        { username: "jack", content: "react is so hard!" },
      ];
      this.setState({ comments });
    }, 1000);
  }

  addComment = (comment) => {
    const { comments } = this.state;
    comments.unshift(comment);
    this.setState({ comments });
  };

  //delete comment
  deleteComment = (index) => {
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
