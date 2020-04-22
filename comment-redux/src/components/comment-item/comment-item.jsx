import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//引入文件和第三方引入空格区分

import "./commentItem.css";
//import { comment, deleteComment, index } from "../../redux/actions";

export default class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    deleteComment: PropTypes.func.isRequired,
  };

  deleteComment = () => {
    const { comment, deleteComment, index } = this.props;
    //let username = this.props.comment.username;
    //提示
    if (window.confirm(`确定删除${comment.username}的评论吗`)) {
      //确定后删除
      deleteComment(index);
    }
  };
  render() {
    const {comment} = this.props;
    ////const username = this.props.comment.username;
    //const content = this.props.comment.content;

    return (
      <li className="list-group-item">
        <div className="handle">
          <a href="javascript:" onClick={this.deleteComment}>
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

// export default connect((state) => ({ comment: state }), { deleteComment })(
//   CommentItem
// );
