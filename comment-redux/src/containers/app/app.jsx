import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CommentAdd from "../../components/comment-add/comment-add";
import CommentList from "../../components/comment-list/comment-list";
import { addComment, deleteComment } from "../../redux/actions";
class App extends Component {
  //state存储的内容在store.js中，则此处不在多写

  // state = {
  //   // comments: [
  //   //   { username: "tom", content: "react is good!" },
  //   //   { username: "jack", content: "react is so hard!" }
  //   // ]
  //   comments: [],
  // };

  //异步操作在action.js中写，这里删除
  // componentDidMount() {
  //   setTimeout(() => {
  //     const comments = [
  //       { username: "tom", content: "react is good!" },
  //       { username: "jack", content: "react is so hard!" },
  //     ];
  //     this.setState({ comments });
  //   }, 1000);
  // }

  //定义的函数会在action-types中书写，此处删除

  // addComment = (comment) => {
  //   const { comments } = this.state;
  //   comments.unshift(comment);
  //   this.setState({ comments });
  // };

  // //delete comment
  // deleteComment = (index) => {
  //   const { comments } = this.state;

  //   //根据元素下标进行删除

  //   comments.splice(index, 1);

  //   this.setState({ comments });
  // };

  static propTypes = {
    comments: PropTypes.array.isRequired,
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
  };

  render() {
    //状态交由redux管理，取状态需从redux中获取
    // const { comments } = this.state;
    const { comments, addComment, deleteComment } = this.props;

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
          {/* <CommentAdd addComment={this.addComment} />
          <CommentList comments={comments} deleteComment={this.deleteComment} /> */}
          <CommentAdd addComment={addComment} />
          <CommentList comments={comments} deleteComment={deleteComment} />
        </div>
      </div>
    );
  }
}

export default connect(
  //第一个参数是函数，写匿名函数即可，固定有一个参数state,返回的是一个对象，对象内有一个自己设置的属性名。
  //第一种写法：state就是一个comments数组
  (state) => ({ comments: state }),
  { addComment, deleteComment }
)(App);
