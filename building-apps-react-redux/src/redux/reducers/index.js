import { combineReducers } from "redux";
import courses from "./courseReducer";
//相当于引入courseReducer，并命名为course,当courseReducer中有export default时候，import时的名字可以随便起名
import authors from "./authorReducer";
const rootReducer = combineReducers({
  //courses: courses,
  courses,
  authors,
});

export default rootReducer;
