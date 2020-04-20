/*
包含n个reducer函数模块
个人理解：reducer表示一个setState的流程处理函数
*/

import { INCREMENT, DECREMENT } from "./action-types";

export function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.data;
    case DECREMENT:
      return state - action.data;
    default:
      return state;
  }
}

//未引入常量的使用方法
// export function counter(state = 0, action) {
//   switch (action.type) {
//     case "INCREMENT":
//       return state + action.data;
//     case "DECREMENT":
//       return state - action.data;
//     default:
//       return state;
//   }
// }
