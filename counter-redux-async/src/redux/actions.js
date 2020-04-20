/*
action creator模块
 */
import { INCREMENT, DECREMENT } from "./action-types";
//incrementCreator
export const increment = (number) => ({ type: INCREMENT, data: number });
export const decrement = (number) => ({ type: DECREMENT, data: number });

//同步的action返回一个对象
//异步action creator(返回一个函数)

//异步action
//函数的嵌套，返回的是一个函数，在函数中进行异步代码
// export const incrementAsync = (number) => {
//   return (dispatch) => {
//     //异步的代码
//     setTimeout(() => {
//       //1秒之后才去分发一个同步的action
//       dispatch(increment(number));
//     }, 1000);
//   };
// };

export const incrementAsync = (number) => (dispatch) => {
  //异步的代码
  setTimeout(() => {
    //1秒之后才去分发一个同步的action
    dispatch(increment(number));
  }, 1000);
};
