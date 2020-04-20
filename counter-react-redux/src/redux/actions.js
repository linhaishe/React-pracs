/*
action creator模块
 */
import { INCREMENT, DECREMENT } from "./action-types";
//incrementCreator
export const increment = (number) => ({ type: INCREMENT, data: number });
export const decrement = (number) => ({ type: DECREMENT, data: number });
