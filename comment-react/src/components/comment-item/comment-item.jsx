import React, { Component } from "react";
import PropTypes from "prop-types";
//引入文件和第三方引入空格区分

import "./commentItem.css";

export default class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
  };

  handleClick = () => {
    const { comment, deleteComment, index } = this.props;
    //提示
    if (window.confirm(`确定删除${comment.username}的评论吗`)) {
      //确定后删除
      deleteComment(index);
    }
  };
  render() {
    const { comment } = this.props;
    return (
      <li className="list-group-item">
        <div className="handle">
          <a href="javascript:;" onClick={this.handleClick}>
            删除
          </a>
        </div>
        <p className="user">
          <span>{comment.username}</span>
          <span>说:</span>
        </p>
        <p className="centence">{comment.content}</p>
      </li>
    );
  }
}
