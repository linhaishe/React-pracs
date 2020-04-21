import { ADD_COMMENT, DELETE_COMMENT, RECEIVE_COMMENTS } from "./action-types";

//同步添加评论
//注意函数接收的参数，看函数被调用的时候有没有被传参数
//确定传入的参数可以去看函数在被调用的时候被传入的参数
export const addComment = (comment) => ({ type: ADD_COMMENT, data: comment });

//同步删除评论
export const deleteComment = (index) => ({
  type: DELETE_COMMENT,
  data: index,
});

const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  data: comments,
});
export const getComments = () => {
  return (dispatch) => {
    setTimeout(() => {
      const comments = [
        {
          username: "Tom",
          content: "ReactJS好难啊!",
          id: Date.now(),
        },
        {
          username: "JACK",
          content: "ReactJS还不错!",
          id: Date.now() + 1,
        },
      ];
      dispatch(receiveComments(comments));
    }, 1000);
  };
};
