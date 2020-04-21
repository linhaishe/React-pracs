//以要操作的数据来命名 操作评论，则用comments
import { ADD_COMMENT, DELETE_COMMENT } from "./action-types";

const initComments = [
  { username: "tom", content: "react is good!" },
  { username: "jack", content: "react" },
];

export function comments(state = initComments, action) {
  switch (action.type) {
    case ADD_COMMENT:
      //refs fcc reduxa part有这个用法的详解
      //禁止修改state!
      return [action.date, ...state];
    case DELETE_COMMENT:
      //留下index 不等于 action.data
      return state.filter((comment, index) => index !== action.data);
    default:
      return state;
  }
}
